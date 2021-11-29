import { UserReserveSummaryResponse } from './generate-user-reserve-summary';
import { ComputedUserReserve } from './index';
export interface FormatUserReserveRequest {
  reserve: UserReserveSummaryResponse;
  marketRefCurrencyDecimals: number;
}
export interface FormatUserReserveResponse {
  reserve: ComputedUserReserve;
}
export declare function formatUserReserve({
  reserve: _reserve,
  marketRefCurrencyDecimals,
}: FormatUserReserveRequest): ComputedUserReserve;
//# sourceMappingURL=format-user-reserve.d.ts.map
