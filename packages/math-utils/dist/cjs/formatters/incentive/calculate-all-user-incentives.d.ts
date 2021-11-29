import { BigNumber } from 'bignumber.js';
import {
  ReserveIncentiveWithFeedsResponse,
  UserReserveCalculationData,
  UserReserveIncentiveDataHumanizedResponse,
} from './types';
export declare type UserIncentiveDict = Record<string, UserIncentiveData>;
interface UserIncentiveData {
  rewardTokenAddress: string;
  rewardTokenDecimals: number;
  claimableRewards: BigNumber;
  assets: string[];
}
export interface CalculateAllUserIncentivesRequest {
  reserveIncentives: ReserveIncentiveWithFeedsResponse[];
  userReserveIncentives: UserReserveIncentiveDataHumanizedResponse[];
  userReserves: UserReserveCalculationData[];
  currentTimestamp: number;
}
export declare function calculateAllUserIncentives({
  reserveIncentives,
  userReserveIncentives,
  userReserves,
  currentTimestamp,
}: CalculateAllUserIncentivesRequest): UserIncentiveDict;
export {};
//# sourceMappingURL=calculate-all-user-incentives.d.ts.map
