import BigNumber from 'bignumber.js';
import { BigNumberValue } from '../../bignumber';
import { RawUserReserveData } from './index';
export interface UserReserveSummaryRequest {
  userReserve: RawUserReserveData;
  marketRefPriceInUsd: BigNumberValue;
  marketRefCurrencyDecimals: number;
  currentTimestamp: number;
}
export interface UserReserveSummaryResponse {
  userReserve: RawUserReserveData;
  underlyingBalance: BigNumber;
  underlyingBalanceMarketReferenceCurrency: BigNumber;
  underlyingBalanceUSD: BigNumber;
  variableBorrows: BigNumber;
  variableBorrowsMarketReferenceCurrency: BigNumber;
  variableBorrowsUSD: BigNumber;
  stableBorrows: BigNumber;
  stableBorrowsMarketReferenceCurrency: BigNumber;
  stableBorrowsUSD: BigNumber;
  totalBorrows: BigNumber;
  totalBorrowsMarketReferenceCurrency: BigNumber;
  totalBorrowsUSD: BigNumber;
  totalLiquidity: BigNumber;
  totalStableDebt: BigNumber;
  totalVariableDebt: BigNumber;
}
export declare function generateUserReserveSummary({
  userReserve,
  marketRefPriceInUsd,
  marketRefCurrencyDecimals,
  currentTimestamp,
}: UserReserveSummaryRequest): UserReserveSummaryResponse;
//# sourceMappingURL=generate-user-reserve-summary.d.ts.map
