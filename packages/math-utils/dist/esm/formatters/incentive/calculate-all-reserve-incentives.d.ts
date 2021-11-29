import {
  ReserveCalculationData,
  ReserveIncentiveWithFeedsResponse,
} from './types';
export declare type ReserveIncentiveDict = Record<string, ReserveIncentives>;
interface ReserveIncentives {
  aIncentives: ReserveIncentive;
  vIncentives: ReserveIncentive;
  sIncentives: ReserveIncentive;
}
interface ReserveIncentive {
  incentiveAPR: string;
  rewardTokenAddress: string;
}
export interface CalculateAllReserveIncentivesRequest {
  reserveIncentives: ReserveIncentiveWithFeedsResponse[];
  reserves: ReserveCalculationData[];
}
export declare function calculateAllReserveIncentives({
  reserveIncentives,
  reserves,
}: CalculateAllReserveIncentivesRequest): ReserveIncentiveDict;
export {};
//# sourceMappingURL=calculate-all-reserve-incentives.d.ts.map
