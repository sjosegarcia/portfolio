import {
  nearestUsableTick,
  NonfungiblePositionManager,
  Pool,
  Position,
  Route,
  Trade,
} from "@uniswap/v3-sdk/";
import {
  CurrencyAmount,
  Fraction,
  Percent,
  Token,
  TradeType,
} from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { abi as IUniswapV3FactoryABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json";
import { BigNumber } from "ethers/lib/ethers";
import { ethers } from "ethers";
import { abi as QuoterABI } from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { useState } from "react";
import {
  AlphaRouter,
  SwapRoute,
  SwapToRatioRoute,
} from "@uniswap/smart-order-router";
import {
  PoolAddress,
  UniswapHook,
  PoolState,
  Immutables,
  State,
  Swap,
  Flash,
} from "../../types/uniswap.types";
import { useEthers } from "./ethers.hook";

export const useUniswap = (poolAddress: PoolAddress): UniswapHook => {
  const [state, setState] = useState<PoolState>();
  const V3_FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
  const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
  const V3_QUOTER_ADDRESS = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
  const web3Provider = useEthers().state.web3Provider;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  if (web3Provider === undefined) return [() => {}];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  if (web3Provider.network === undefined) return [() => {}];

  const factoryContract = new ethers.Contract(
    V3_FACTORY_ADDRESS,
    IUniswapV3FactoryABI,
    web3Provider
  );

  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    web3Provider
  );

  poolContract.on(
    "Flash",
    (sender, recipient, amount0, amount1, paid0, paid1) => {
      const flash: Flash = {
        sender: sender,
        recipient: recipient,
        amount0: amount0,
        amount1: amount1,
        paid0: paid0,
        paid1: paid1,
      };
      console.log(flash);
    }
  );

  poolContract.on(
    "Swap",
    (sender, recipient, amount0, amount1, sqrtPriceX96, liquidity, tick) => {
      const swap: Swap = {
        sender: sender,
        recipient: recipient,
        amount0: amount0,
        amount1: amount1,
        sqrtPriceX96: sqrtPriceX96,
        liquidity: liquidity,
        tick: tick,
      };
      // console.log(swap);
    }
  );

  const quoterContract = new ethers.Contract(
    V3_QUOTER_ADDRESS,
    QuoterABI,
    web3Provider
  );

  const getPoolImmutables = async (): Promise<Immutables> => {
    return {
      factory: await poolContract.factory(),
      token0: await poolContract.token0(),
      token1: await poolContract.token1(),
      fee: await poolContract.fee(),
      tickSpacing: await poolContract.tickSpacing(),
      maxLiquidityPerTick: await poolContract.maxLiquidityPerTick(),
    };
  };

  const getPoolState = async (): Promise<State> => {
    const slot = await poolContract.slot0();
    return {
      liquidity: await poolContract.liquidity(),
      sqrtPriceX96: slot[0],
      tick: slot[1],
      observationIndex: slot[2],
      observationCardinality: slot[3],
      observationCardinalityNext: slot[4],
      feeProtocol: slot[5],
      unlocked: slot[6],
    };
  };

  const priceOutWithData = (amount: number | string, token: Token) =>
    ethers.utils.parseUnits(amount.toString(), token.decimals);

  const priceOut = (amount: number) =>
    state?.pool ? priceOutWithData(amount, state?.pool.token0) : undefined;

  const priceInWithData = (quote: any, token: Token) =>
    ethers.utils.formatUnits(quote, token.decimals);

  const priceIn = (quote: any) =>
    state?.pool.token1 ? priceInWithData(quote, state?.pool.token1) : undefined;

  const saleInWithData = (amount: number, token: Token) =>
    ethers.utils.parseUnits(amount.toString(), token.decimals);

  const saleIn = (amount: number) =>
    state?.pool.token1 ? saleInWithData(amount, state?.pool.token1) : undefined;

  const saleOutWithData = (quote: any, token: Token) =>
    ethers.utils.formatUnits(quote, token.decimals);

  const saleOut = (quote: any) =>
    state?.pool.token0 ? saleOutWithData(quote, state?.pool.token0) : undefined;

  const quoteOutWithData = async (amount: number, pool: Pool) => {
    const input = priceOutWithData(amount, pool.token0);
    const quoted = await quoterContract.callStatic.quoteExactInputSingle(
      pool.token0.address,
      pool.token1.address,
      pool.fee,
      input,
      0
    );
    return priceInWithData(quoted, pool.token1);
  };

  const quoteOut = async (amount: number) =>
    state?.pool ? await quoteOutWithData(amount, state.pool) : undefined;

  const quoteInWithData = async (amount: number, pool: Pool) => {
    const output = saleInWithData(amount, pool.token1);
    const quoted = await quoterContract.callStatic.quoteExactOutputSingle(
      pool.token0.address,
      pool.token1.address,
      pool.fee,
      output,
      0
    );

    return saleOutWithData(quoted, pool.token0);
  };

  const quoteIn = async (amount: number) =>
    state?.pool ? await quoteInWithData(amount, state.pool) : undefined;

  const swapPriceWithData = async (
    amount: number,
    pool: Pool,
    reverse = false
  ) =>
    !reverse
      ? await quoteOutWithData(amount, pool)
      : await quoteInWithData(amount, pool);

  const swapPrice = async (amount: number, reverse = false) =>
    state?.pool
      ? !reverse
        ? await quoteOutWithData(amount, state.pool)
        : await quoteInWithData(amount, state.pool)
      : undefined;

  const createPool = () =>
    state?.immutables && state?.poolState
      ? createPoolWithData(state?.immutables, state?.poolState)
      : undefined;

  const createPoolWithData = (immutables: Immutables, state: State): Pool => {
    const chainId = web3Provider.network.chainId;
    const tokenA = new Token(chainId, immutables.token0, 6, "USDC", "USD Coin");
    const tokenB = new Token(
      chainId,
      immutables.token1,
      18,
      "WETH",
      "Wrapped Ether"
    );
    return new Pool(
      tokenA,
      tokenB,
      immutables.fee,
      state.sqrtPriceX96.toString(),
      state.liquidity.toString(),
      state.tick
    );
  };

  const createPosition = (liquidity: number) =>
    state?.immutables && state?.poolState && state?.pool
      ? createPositionWithData(
          state.pool,
          state.poolState,
          state.immutables,
          liquidity
        )
      : undefined;

  const createPositionWithData = (
    pool: Pool,
    state: State,
    immutables: Immutables,
    liquidity: number
  ) =>
    new Position({
      pool: pool,
      liquidity: liquidity,
      tickLower:
        nearestUsableTick(state.tick, immutables.tickSpacing) -
        immutables.tickSpacing * 2,
      tickUpper:
        nearestUsableTick(state.tick, immutables.tickSpacing) +
        immutables.tickSpacing * 2,
    });

  const mintLiquidity = async (position: Position) => {
    const block = await web3Provider.getBlock(web3Provider.getBlockNumber());
    const deadline = block.timestamp + 200;
    return NonfungiblePositionManager.addCallParameters(position, {
      slippageTolerance: new Percent(50, 10000),
      recipient: await web3Provider.getSigner().getAddress(),
      deadline: deadline,
    });
  };

  const addLiquidity = async (position: Position, tokenId: number) => {
    const block = await web3Provider.getBlock(web3Provider.getBlockNumber());
    const deadline = block.timestamp + 200;
    return NonfungiblePositionManager.addCallParameters(position, {
      slippageTolerance: new Percent(50, 10000),
      deadline: deadline,
      tokenId: tokenId,
    });
  };

  const removeLiquidity = async (
    position: Position,
    tokenId: number,
    token0: Token,
    token1: Token
  ) => {
    const block = await web3Provider.getBlock(web3Provider.getBlockNumber());
    const deadline = block.timestamp + 200;
    const sender = await web3Provider.getSigner().getAddress();
    return NonfungiblePositionManager.removeCallParameters(position, {
      tokenId: tokenId,
      liquidityPercentage: new Percent(1),
      slippageTolerance: new Percent(50, 10_000),
      deadline: deadline,
      collectOptions: {
        expectedCurrencyOwed0: CurrencyAmount.fromRawAmount(token0, 0),
        expectedCurrencyOwed1: CurrencyAmount.fromRawAmount(token1, 0),
        recipient: sender,
      },
    });
  };

  const router = new AlphaRouter({
    chainId: web3Provider.network.chainId,
    provider: web3Provider,
  });

  const createRoute = async (
    recipient: string,
    amount: number,
    pool: Pool,
    reverse = false
  ) =>
    (await router.route(
      CurrencyAmount.fromRawAmount(pool.token0, amount),
      pool.token1,
      reverse ? TradeType.EXACT_OUTPUT : TradeType.EXACT_INPUT,
      {
        recipient: recipient,
        slippageTolerance: new Percent(5, 100),
        deadline: Math.floor(Date.now() / 1000 + 1800),
      }
    )) ?? undefined;

  const routeToRatioResponse = async (
    tokenId: number,
    position: Position,
    token0: Token,
    token1: Token,
    token0Balance: number,
    token1Balance: number
  ) => {
    const address = await web3Provider.getSigner().getAddress();
    return await router.routeToRatio(
      CurrencyAmount.fromRawAmount(token0, token0Balance),
      CurrencyAmount.fromRawAmount(token1, token1Balance),
      position,
      {
        ratioErrorTolerance: new Fraction(1, 100),
        maxIterations: 6,
      },
      {
        swapOptions: {
          recipient: address,
          slippageTolerance: new Percent(5, 100),
          deadline: 100,
        },
        addLiquidityOptions: {
          tokenId: tokenId,
        },
      }
    );
  };

  const createTxn = (sender: string, route?: SwapRoute | SwapToRatioRoute) =>
    route && route.methodParameters
      ? {
          data: route.methodParameters.calldata,
          to: V3_SWAP_ROUTER_ADDRESS,
          value: BigNumber.from(route.methodParameters.value),
          from: sender,
          gasPrice: BigNumber.from(route.gasPriceWei),
        }
      : undefined;

  const submitSwapRoute = async (
    amount: number,
    pool: Pool,
    reverse = false
  ) => {
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    const route = await createRoute(address, amount, pool, reverse);
    const txn = createTxn(address, route);
    return txn ? await signer.sendTransaction(txn) : undefined;
  };

  const sumbit = async (amount: number, send = false, reverse = false) =>
    state?.pool && send
      ? await submitSwapRoute(amount, state.pool, reverse)
      : undefined;

  const performUncheckedTrade = async (
    amount: number,
    pools: Pool[],
    token0: Token,
    token1: Token,
    reverse = false
  ) => {
    const swapRoute = new Route(pools, token0, token1);
    const quote = await quoteInWithData(amount, pools[0]); // for now
    const price = priceOutWithData(quote, token0);
    return await Trade.createUncheckedTrade({
      route: swapRoute,
      inputAmount: CurrencyAmount.fromRawAmount(
        !reverse ? token0 : token1,
        amount
      ),
      outputAmount: CurrencyAmount.fromRawAmount(
        !reverse ? token1 : token0,
        price.toString()
      ),
      tradeType: TradeType.EXACT_INPUT,
    });
  };

  const uncheckedTrade = async (amount: number, reverse = false) =>
    state?.pool
      ? performUncheckedTrade(
          amount,
          [state.pool], // for now
          state.pool.token0,
          state.pool.token1,
          reverse
        )
      : undefined;

  const test = async () => {
    const immutables = await getPoolImmutables();
    const state = await getPoolState();
    const pool = createPoolWithData(immutables, state);
    const position = createPositionWithData(pool, state, immutables, 1);
    setState({
      immutables: immutables,
      poolState: state,
      pool: pool,
      position: position,
    });

    console.log(await swapPrice(1));
    console.log(await uncheckedTrade(1));
    console.log(await mintLiquidity(position));
    console.log(await addLiquidity(position, 1));
    console.log(await removeLiquidity(position, 1, pool.token0, pool.token1));
    console.log(
      await routeToRatioResponse(
        1,
        position,
        pool.token0,
        pool.token1,
        10000,
        0
      )
    );
  };

  return [test];
};
