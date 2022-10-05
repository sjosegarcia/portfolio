import { Pool } from "@uniswap/v3-sdk/";
import { Token } from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { BigNumber } from "ethers/lib/ethers";
import { useEthers } from "./ethers.hook";
import { ethers } from "ethers";
import { abi as QuoterABI } from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { useState } from "react";

type UniswapHook = [() => Promise<void>];
type PoolAddress = string;
type PoolState =
  | {
      immutables: Immutables;
      pool?: Pool;
    }
  | undefined;

type Immutables = {
  factory: string;
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  maxLiquidityPerTick: BigNumber;
};

type State = {
  liquidity: BigNumber;
  sqrtPriceX96: BigNumber;
  tick: number;
  observationIndex: number;
  observationCardinality: number;
  observationCardinalityNext: number;
  feeProtocol: number;
  unlocked: boolean;
};

export const useUniswap = (poolAddress: PoolAddress): UniswapHook => {
  const ethersHook = useEthers();
  const ethersHookState = ethersHook.state;
  const web3Provider = ethersHookState.web3Provider;
  const [state, setState] = useState<PoolState>();

  const empty = (): Promise<void> => Promise.resolve();
  if (web3Provider === undefined) return [empty];

  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    web3Provider
  );

  const quoterContract = new ethers.Contract(
    "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
    QuoterABI,
    web3Provider
  );

  const poolImmutables = async (): Promise<Immutables> => {
    return {
      factory: await poolContract.factory(),
      token0: await poolContract.token0(),
      token1: await poolContract.token1(),
      fee: await poolContract.fee(),
      tickSpacing: await poolContract.tickSpacing(),
      maxLiquidityPerTick: await poolContract.maxLiquidityPerTick(),
    };
  };

  const poolState = async (): Promise<State> => {
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

  const priceIn = (amount: number) =>
    state?.pool?.token0
      ? ethers.utils.parseUnits(amount.toString(), state?.pool?.token0.decimals)
      : undefined;

  const priceOut = (quote: any) =>
    state?.pool?.token1
      ? ethers.utils.formatUnits(quote, state?.pool?.token1.decimals)
      : undefined;

  const priceInReverse = (amount: number) =>
    state?.pool?.token1
      ? ethers.utils.parseUnits(amount.toString(), state?.pool?.token1.decimals)
      : undefined;

  const priceOutReverse = (quote: any) =>
    state?.pool?.token0
      ? ethers.utils.formatUnits(quote, state?.pool?.token0.decimals)
      : undefined;

  const quoteIn = async (amount?: BigNumber) =>
    state?.immutables && amount
      ? await quoterContract.callStatic.quoteExactInputSingle(
          state.immutables.token0,
          state.immutables.token1,
          state.immutables.fee,
          amount,
          0
        )
      : undefined;

  const quoteOut = async (amount?: BigNumber) =>
    state?.immutables && amount
      ? await quoterContract.callStatic.quoteExactOutputSingle(
          state.immutables.token0,
          state.immutables.token1,
          state.immutables.fee,
          amount,
          0
        )
      : undefined;

  const quotePrice = async (amount: number) => {
    const input = priceIn(amount);
    const quoted = await quoteIn(input);
    return priceOut(quoted);
  };

  const quotePriceReverse = async (amount: number) => {
    const input = priceInReverse(amount);
    const quoted = await quoteOut(input);
    return priceOutReverse(quoted);
  };

  const priceCalculation = async (amount: number, reverse = false) => {
    if (!reverse) return await quotePrice(amount);
    return await quotePriceReverse(amount);
  };

  const swapPrice = async (amount: number, reverse?: boolean) =>
    state?.immutables ? await priceCalculation(amount, reverse) : undefined;

  const createPool = async (
    immutables: Immutables,
    state: State
  ): Promise<Pool | undefined> => {
    const tokenA = new Token(
      web3Provider?.network.chainId,
      immutables.token0,
      6,
      "USDC",
      "USD Coin"
    );
    const tokenB = new Token(
      web3Provider?.network.chainId,
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

  const performTest = async () => {
    const immutables = await poolImmutables();
    const state = await poolState();
    const pool = await createPool(immutables, state);
    setState({ immutables: immutables, pool: pool });
    console.log(await swapPrice(2));
  };

  return [performTest];
};

/*

  const liquidityExamples = async (sender: string, exampleType: number) => {
    const immutables = await getPoolImmutables();
    const state = await getPoolState();
    const DAI = new Token(1, immutables.token0, 18, "DAI", "Stablecoin");
    const USDC = new Token(1, immutables.token1, 18, "USDC", "USD Coin");
    const block = await web3Provider.getBlock(web3Provider.getBlockNumber());
    const deadline = block.timestamp + 200;

    // create a pool
    const DAI_USDC_POOL = new Pool(
      DAI,
      USDC,
      immutables.fee,
      state.sqrtPriceX96.toString(),
      state.liquidity.toString(),
      state.tick
    );

    // create a position with the pool
    // the position is in-range, specified by the lower and upper tick
    // in this example, we will set the liquidity parameter to a small percentage of the current liquidity
    const position = new Position({
      pool: DAI_USDC_POOL,
      liquidity: state.liquidity.div(5000).toString(),
      tickLower:
        nearestUsableTick(state.tick, immutables.tickSpacing) -
        immutables.tickSpacing * 2,
      tickUpper:
        nearestUsableTick(state.tick, immutables.tickSpacing) +
        immutables.tickSpacing * 2,
    });

    // Example 0: Setting up calldata for minting a Position
    if (exampleType === 0) {
      const { calldata, value } = NonfungiblePositionManager.addCallParameters(
        position,
        {
          slippageTolerance: new Percent(50, 10000),
          recipient: sender,
          deadline: deadline,
        }
      );
    }

    // Example 1: Setting up calldata for adding liquidity to Position
    if (exampleType === 1) {
      const { calldata, value } = NonfungiblePositionManager.addCallParameters(
        position,
        {
          slippageTolerance: new Percent(50, 10000),
          deadline: deadline,
          tokenId: 1,
        }
      );
    }

    // Example 2: Setting up calldata for removing liquidity from Position
    if (exampleType === 2) {
      const { calldata, value } =
        NonfungiblePositionManager.removeCallParameters(position, {
          tokenId: 1,
          liquidityPercentage: new Percent(1),
          slippageTolerance: new Percent(50, 10000),
          deadline: deadline,
          collectOptions: {
            expectedCurrencyOwed0: CurrencyAmount.fromRawAmount(DAI, 0),
            expectedCurrencyOwed1: CurrencyAmount.fromRawAmount(USDC, 0),
            recipient: sender,
          },
        });
    }
  }; 
  */
