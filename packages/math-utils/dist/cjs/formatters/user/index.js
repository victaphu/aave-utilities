"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUserSummary = void 0;
const bignumber_1 = require("../../bignumber");
const constants_1 = require("../../constants");
const format_user_reserve_1 = require("./format-user-reserve");
const generate_raw_user_summary_1 = require("./generate-raw-user-summary");
const generate_user_reserve_summary_1 = require("./generate-user-reserve-summary");
function formatUserSummary({ currentTimestamp, marketRefPriceInUsd, marketRefCurrencyDecimals, rawUserReserves, }) {
    const computedUserReserves = rawUserReserves.map(userReserve => (0, generate_user_reserve_summary_1.generateUserReserveSummary)({
        userReserve,
        marketRefPriceInUsd,
        marketRefCurrencyDecimals,
        currentTimestamp,
    }));
    const formattedUserReserves = computedUserReserves.map(computedUserReserve => (0, format_user_reserve_1.formatUserReserve)({
        reserve: computedUserReserve,
        marketRefCurrencyDecimals,
    }));
    const userData = (0, generate_raw_user_summary_1.generateRawUserSummary)({
        userReserves: computedUserReserves,
        marketRefPriceInUsd,
        marketRefCurrencyDecimals,
    });
    return {
        userReservesData: formattedUserReserves,
        totalLiquidityMarketReferenceCurrency: (0, bignumber_1.normalize)(userData.totalLiquidityMarketReferenceCurrency, marketRefCurrencyDecimals),
        totalLiquidityUSD: userData.totalLiquidityUSD.toString(),
        totalCollateralMarketReferenceCurrency: (0, bignumber_1.normalize)(userData.totalCollateralMarketReferenceCurrency, marketRefCurrencyDecimals),
        totalCollateralUSD: userData.totalCollateralUSD.toString(),
        totalBorrowsMarketReferenceCurrency: (0, bignumber_1.normalize)(userData.totalBorrowsMarketReferenceCurrency, marketRefCurrencyDecimals),
        totalBorrowsUSD: userData.totalBorrowsUSD.toString(),
        availableBorrowsMarketReferenceCurrency: (0, bignumber_1.normalize)(userData.availableBorrowsMarketReferenceCurrency, marketRefCurrencyDecimals),
        availableBorrowsUSD: userData.availableBorrowsUSD.toString(),
        currentLoanToValue: (0, bignumber_1.normalize)(userData.currentLoanToValue, constants_1.LTV_PRECISION),
        currentLiquidationThreshold: (0, bignumber_1.normalize)(userData.currentLiquidationThreshold, constants_1.LTV_PRECISION),
        healthFactor: userData.healthFactor.toFixed(),
    };
}
exports.formatUserSummary = formatUserSummary;
//# sourceMappingURL=index.js.map