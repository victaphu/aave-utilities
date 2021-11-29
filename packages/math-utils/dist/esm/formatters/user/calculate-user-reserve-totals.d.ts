import BigNumber from 'bignumber.js';
import { UserReserveSummaryResponse } from './generate-user-reserve-summary';
interface UserReserveTotalsRequest {
  userReserves: UserReserveSummaryResponse[];
}
interface UserReserveTotalsResponse {
  totalLiquidityMarketReferenceCurrency: BigNumber;
  totalBorrowsMarketReferenceCurrency: BigNumber;
  totalCollateralMarketReferenceCurrency: BigNumber;
  currentLtv: BigNumber;
  currentLiquidationThreshold: BigNumber;
}
export declare function calculateUserReserveTotals({
  userReserves,
}: UserReserveTotalsRequest): UserReserveTotalsResponse;
export {};
//# sourceMappingURL=calculate-user-reserve-totals.d.ts.map
