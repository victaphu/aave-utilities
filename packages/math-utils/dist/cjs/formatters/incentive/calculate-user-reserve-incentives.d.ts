import BigNumber from 'bignumber.js';
import {
  ReserveIncentiveWithFeedsResponse,
  UserReserveCalculationData,
  UserReserveIncentiveDataHumanizedResponse,
} from './types';
export interface CalculateUserReserveIncentivesRequest {
  reserveIncentives: ReserveIncentiveWithFeedsResponse;
  userReserveIncentives: UserReserveIncentiveDataHumanizedResponse;
  currentTimestamp: number;
  userReserveData: UserReserveCalculationData;
}
export interface CalculateUserReserveIncentivesResponse {
  aIncentives: BigNumber;
  vIncentives: BigNumber;
  sIncentives: BigNumber;
}
export declare function calculateUserReserveIncentives({
  reserveIncentives,
  userReserveIncentives,
  currentTimestamp,
  userReserveData,
}: CalculateUserReserveIncentivesRequest): CalculateUserReserveIncentivesResponse;
//# sourceMappingURL=calculate-user-reserve-incentives.d.ts.map
