import { ReserveIncentiveWithFeedsResponse } from './types';
export interface CalculateReserveIncentivesRequest {
  reserveIncentiveData: ReserveIncentiveWithFeedsResponse;
  aRewardTokenPriceInMarketReferenceCurrency: string;
  vRewardTokenPriceInMarketReferenceCurrency: string;
  sRewardTokenPriceInMarketReferenceCurrency: string;
  totalLiquidity: string;
  totalVariableDebt: string;
  totalStableDebt: string;
  decimals: number;
  priceInMarketReferenceCurrency: string;
}
interface ReserveIncentiveResponse {
  incentiveAPR: string;
  rewardTokenAddress: string;
}
export interface CalculateReserveIncentivesResponse {
  underlyingAsset: string;
  aIncentivesData: ReserveIncentiveResponse;
  vIncentivesData: ReserveIncentiveResponse;
  sIncentivesData: ReserveIncentiveResponse;
}
export declare function calculateReserveIncentives({
  reserveIncentiveData,
  aRewardTokenPriceInMarketReferenceCurrency,
  vRewardTokenPriceInMarketReferenceCurrency,
  sRewardTokenPriceInMarketReferenceCurrency,
  totalLiquidity,
  totalVariableDebt,
  totalStableDebt,
  decimals,
  priceInMarketReferenceCurrency,
}: CalculateReserveIncentivesRequest): CalculateReserveIncentivesResponse;
export {};
//# sourceMappingURL=calculate-reserve-incentives.d.ts.map
