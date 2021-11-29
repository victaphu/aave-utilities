export interface FormatReserveResponse {
  reserveFactor: string;
  baseLTVasCollateral: string;
  liquidityIndex: string;
  reserveLiquidationThreshold: string;
  reserveLiquidationBonus: string;
  variableBorrowIndex: string;
  availableLiquidity: string;
  supplyAPY: string;
  supplyAPR: string;
  variableBorrowAPY: string;
  variableBorrowAPR: string;
  stableBorrowAPY: string;
  stableBorrowAPR: string;
  totalPrincipalStableDebt: string;
  totalScaledVariableDebt: string;
  utilizationRate: string;
  totalStableDebt: string;
  totalVariableDebt: string;
  totalDebt: string;
  totalLiquidity: string;
}
export interface FormatReserveRequest {
  reserve: ReserveData;
  currentTimestamp: number;
}
export interface ReserveData {
  decimals: number;
  reserveFactor: string;
  baseLTVasCollateral: string;
  averageStableRate: string;
  stableDebtLastUpdateTimestamp: number;
  liquidityIndex: string;
  reserveLiquidationThreshold: string;
  reserveLiquidationBonus: string;
  variableBorrowIndex: string;
  variableBorrowRate: string;
  availableLiquidity: string;
  stableBorrowRate: string;
  liquidityRate: string;
  totalPrincipalStableDebt: string;
  totalScaledVariableDebt: string;
  lastUpdateTimestamp: number;
}
/**
 * @description computes additional fields and normalizes numbers into human readable decimals
 */
export declare function formatReserve({
  reserve,
  currentTimestamp,
}: FormatReserveRequest): FormatReserveResponse;
export declare type ReserveDataWithPrice = ReserveData & {
  priceInMarketReferenceCurrency: string;
};
export interface FormatReserveUSDRequest {
  reserve: ReserveDataWithPrice;
  currentTimestamp: number;
  marketRefPriceInUsd: string;
  marketRefCurrencyDecimals: number;
}
/**
 * @description computes additional fields and normalizes numbers into human readable decimals
 * In addition to that it also converts the numbers to USD
 */
export declare function formatReserveUSD({
  reserve,
  currentTimestamp,
  marketRefPriceInUsd,
  marketRefCurrencyDecimals,
}: FormatReserveUSDRequest): {
  totalLiquidityUSD: string;
  totalDebtUSD: string;
  totalVariableDebtUSD: string;
  totalStableDebtUSD: string;
  reserveFactor: string;
  baseLTVasCollateral: string;
  liquidityIndex: string;
  reserveLiquidationThreshold: string;
  reserveLiquidationBonus: string;
  variableBorrowIndex: string;
  availableLiquidity: string;
  supplyAPY: string;
  supplyAPR: string;
  variableBorrowAPY: string;
  variableBorrowAPR: string;
  stableBorrowAPY: string;
  stableBorrowAPR: string;
  totalPrincipalStableDebt: string;
  totalScaledVariableDebt: string;
  utilizationRate: string;
  totalStableDebt: string;
  totalVariableDebt: string;
  totalDebt: string;
  totalLiquidity: string;
};
//# sourceMappingURL=index.d.ts.map
