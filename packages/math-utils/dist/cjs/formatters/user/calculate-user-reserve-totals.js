"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateUserReserveTotals = void 0;
const bignumber_1 = require("../../bignumber");
function calculateUserReserveTotals({ userReserves, }) {
    let totalLiquidityMarketReferenceCurrency = (0, bignumber_1.valueToZDBigNumber)('0');
    let totalCollateralMarketReferenceCurrency = (0, bignumber_1.valueToZDBigNumber)('0');
    let totalBorrowsMarketReferenceCurrency = (0, bignumber_1.valueToZDBigNumber)('0');
    let currentLtv = (0, bignumber_1.valueToBigNumber)('0');
    let currentLiquidationThreshold = (0, bignumber_1.valueToBigNumber)('0');
    userReserves.forEach(userReserveSummary => {
        totalLiquidityMarketReferenceCurrency =
            totalLiquidityMarketReferenceCurrency.plus(userReserveSummary.underlyingBalanceMarketReferenceCurrency);
        totalBorrowsMarketReferenceCurrency = totalBorrowsMarketReferenceCurrency
            .plus(userReserveSummary.variableBorrowsMarketReferenceCurrency)
            .plus(userReserveSummary.stableBorrowsMarketReferenceCurrency);
        if (userReserveSummary.userReserve.reserve.usageAsCollateralEnabled &&
            userReserveSummary.userReserve.usageAsCollateralEnabledOnUser) {
            totalCollateralMarketReferenceCurrency =
                totalCollateralMarketReferenceCurrency.plus(userReserveSummary.underlyingBalanceMarketReferenceCurrency);
            currentLtv = currentLtv.plus((0, bignumber_1.valueToBigNumber)(userReserveSummary.underlyingBalanceMarketReferenceCurrency).multipliedBy(userReserveSummary.userReserve.reserve.baseLTVasCollateral));
            currentLiquidationThreshold = currentLiquidationThreshold.plus((0, bignumber_1.valueToBigNumber)(userReserveSummary.underlyingBalanceMarketReferenceCurrency).multipliedBy(userReserveSummary.userReserve.reserve.reserveLiquidationThreshold));
        }
    });
    if (currentLtv.gt(0)) {
        currentLtv = (0, bignumber_1.valueToZDBigNumber)(currentLtv.div(totalCollateralMarketReferenceCurrency));
    }
    if (currentLiquidationThreshold.gt(0)) {
        currentLiquidationThreshold = (0, bignumber_1.valueToZDBigNumber)(currentLiquidationThreshold.div(totalCollateralMarketReferenceCurrency));
    }
    return {
        totalLiquidityMarketReferenceCurrency,
        totalBorrowsMarketReferenceCurrency,
        totalCollateralMarketReferenceCurrency,
        currentLtv,
        currentLiquidationThreshold,
    };
}
exports.calculateUserReserveTotals = calculateUserReserveTotals;
//# sourceMappingURL=calculate-user-reserve-totals.js.map