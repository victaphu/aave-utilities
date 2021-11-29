import BigNumber from 'bignumber.js';
export interface SuppliesRequest {
  reserve: ReserveSupplyData;
  currentTimestamp: number;
}
export interface SuppliesResponse {
  totalVariableDebt: BigNumber;
  totalStableDebt: BigNumber;
  totalLiquidity: BigNumber;
}
interface ReserveSupplyData {
  totalScaledVariableDebt: string;
  variableBorrowIndex: string;
  variableBorrowRate: string;
  totalPrincipalStableDebt: string;
  averageStableRate: string;
  availableLiquidity: string;
  stableDebtLastUpdateTimestamp: number;
  lastUpdateTimestamp: number;
}
export declare function calculateSupplies({
  reserve,
  currentTimestamp,
}: SuppliesRequest): SuppliesResponse;
export {};
//# sourceMappingURL=calculate-supplies.d.ts.map
