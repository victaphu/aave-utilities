import BigNumber from 'bignumber.js';
import { BigNumberValue } from '../../bignumber';
import { UserReserveSummaryResponse } from './generate-user-reserve-summary';
export interface RawUserSummaryRequest {
  userReserves: UserReserveSummaryResponse[];
  marketRefPriceInUsd: BigNumberValue;
  marketRefCurrencyDecimals: number;
}
export interface RawUserSummaryResponse {
  totalLiquidityUSD: BigNumber;
  totalCollateralUSD: BigNumber;
  totalBorrowsUSD: BigNumber;
  totalLiquidityMarketReferenceCurrency: BigNumber;
  totalCollateralMarketReferenceCurrency: BigNumber;
  totalBorrowsMarketReferenceCurrency: BigNumber;
  availableBorrowsMarketReferenceCurrency: BigNumber;
  availableBorrowsUSD: BigNumber;
  currentLoanToValue: BigNumber;
  currentLiquidationThreshold: BigNumber;
  healthFactor: BigNumber;
}
export declare function generateRawUserSummary({
  userReserves,
  marketRefPriceInUsd,
  marketRefCurrencyDecimals,
}: RawUserSummaryRequest): RawUserSummaryResponse;
//# sourceMappingURL=generate-raw-user-summary.d.ts.map
