import { Pool, Position } from "@uniswap/v3-sdk";
import { BigNumber } from "ethers/lib/ethers";

export type UniswapHook = [() => void] | UniswapHookState;

export type UniswapHookState = [
  () => Promise<void>,
  (amount?: BigNumber) => Promise<string | undefined>,
  (amount?: BigNumber) => Promise<string | undefined>
];

export type PoolAddress = string;

export type PoolState =
  | {
      immutables: Immutables;
      poolState: State;
      pool: Pool;
      position: Position;
    }
  | undefined;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

export type Immutables = {
  factory: string;
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  maxLiquidityPerTick: BigNumber;
};

export type State = {
  liquidity: BigNumber;
  sqrtPriceX96: BigNumber;
  tick: number;
  observationIndex: number;
  observationCardinality: number;
  observationCardinalityNext: number;
  feeProtocol: number;
  unlocked: boolean;
};

export type Swap = {
  sender: string;
  recipient: string;
  amount0: BigNumber;
  amount1: BigNumber;
  sqrtPriceX96: BigNumber;
  liquidity: BigNumber;
  tick: number;
};

export type Flash = {
  sender: string;
  recipient: string;
  amount0: BigNumber;
  amount1: BigNumber;
  paid0: BigNumber;
  paid1: BigNumber;
};

export type Mint = {
  sender: string;
  owner: string;
  tickLower: BigNumber;
  tickUpper: BigNumber;
  amount: BigNumber;
  amount0: BigNumber;
  amount1: BigNumber;
};

export type Collect = {
  owner: string;
  tickLower: BigNumber;
  tickUpper: BigNumber;
  amount0: BigNumber;
  amount1: BigNumber;
};

export type Burn = {
  owner: string;
  tickLower: BigNumber;
  tickUpper: BigNumber;
  amount: BigNumber;
  amount0: BigNumber;
  amount1: BigNumber;
};

export type IncreaseObservationCardinalityNext = {
  observationCardinalityNextOld: BigNumber;
  observationCardinalityNextNew: BigNumber;
};

export type SetProtocolFee = {
  feeProtocol0Old: BigNumber;
  feeProtocol1Old: BigNumber;
  feeProtocol0New: BigNumber;
  feeProtocol1New: BigNumber;
};

export type CollectProtocol = {
  sender: string;
  recipient: string;
  amount0: BigNumber;
  amount1: BigNumber;
};
