"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRawUserSummary = void 0;
const pool_math_1 = require("../../pool-math");
const calculate_user_reserve_totals_1 = require("./calculate-user-reserve-totals");
function convertToUsd(value, marketRefPriceInUsd, marketRefCurrencyDecimals) {
    return value
        .multipliedBy(marketRefPriceInUsd)
        .shiftedBy(marketRefCurrencyDecimals * -1);
}
function generateRawUserSummary({ userReserves, marketRefPriceInUsd, marketRefCurrencyDecimals, }) {
    const { totalLiquidityMarketReferenceCurrency, totalBorrowsMarketReferenceCurrency, totalCollateralMarketReferenceCurrency, currentLtv, currentLiquidationThreshold, } = (0, calculate_user_reserve_totals_1.calculateUserReserveTotals)({ userReserves });
    const availableBorrowsMarketReferenceCurrency = (0, pool_math_1.calculateAvailableBorrowsMarketReferenceCurrency)({
        collateralBalanceMarketReferenceCurrency: totalCollateralMarketReferenceCurrency,
        borrowBalanceMarketReferenceCurrency: totalBorrowsMarketReferenceCurrency,
        currentLtv,
    });
    return {
        totalLiquidityUSD: convertToUsd(totalLiquidityMarketReferenceCurrency, marketRefPriceInUsd, marketRefCurrencyDecimals),
        totalCollateralUSD: convertToUsd(totalCollateralMarketReferenceCurrency, marketRefPriceInUsd, marketRefCurrencyDecimals),
        totalBorrowsUSD: convertToUsd(totalBorrowsMarketReferenceCurrency, marketRefPriceInUsd, marketRefCurrencyDecimals),
        totalLiquidityMarketReferenceCurrency,
        totalCollateralMarketReferenceCurrency,
        totalBorrowsMarketReferenceCurrency,
        availableBorrowsMarketReferenceCurrency,
        availableBorrowsUSD: convertToUsd(availableBorrowsMarketReferenceCurrency, marketRefPriceInUsd, marketRefCurrencyDecimals),
        currentLoanToValue: currentLtv,
        currentLiquidationThreshold,
        healthFactor: (0, pool_math_1.calculateHealthFactorFromBalances)({
            collateralBalanceMarketReferenceCurrency: totalCollateralMarketReferenceCurrency,
            borrowBalanceMarketReferenceCurrency: totalBorrowsMarketReferenceCurrency,
            currentLiquidationThreshold,
        }),
    };
}
exports.generateRawUserSummary = generateRawUserSummary;
//# sourceMappingURL=generate-raw-user-summary.js.map