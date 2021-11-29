"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserReserveSummary = void 0;
const pool_math_1 = require("../../pool-math");
const calculate_supplies_1 = require("./calculate-supplies");
function generateUserReserveSummary({ userReserve, marketRefPriceInUsd, marketRefCurrencyDecimals, currentTimestamp, }) {
    const poolReserve = userReserve.reserve;
    const { priceInMarketReferenceCurrency, decimals } = poolReserve;
    const underlyingBalance = (0, pool_math_1.getLinearBalance)({
        balance: userReserve.scaledATokenBalance,
        index: poolReserve.liquidityIndex,
        rate: poolReserve.liquidityRate,
        lastUpdateTimestamp: poolReserve.lastUpdateTimestamp,
        currentTimestamp,
    });
    const { marketReferenceCurrencyBalance: underlyingBalanceMarketReferenceCurrency, usdBalance: underlyingBalanceUSD, } = (0, pool_math_1.getMarketReferenceCurrencyAndUsdBalance)({
        balance: underlyingBalance,
        priceInMarketReferenceCurrency,
        marketRefCurrencyDecimals,
        decimals,
        marketRefPriceInUsd,
    });
    const variableBorrows = (0, pool_math_1.getCompoundedBalance)({
        principalBalance: userReserve.scaledVariableDebt,
        reserveIndex: poolReserve.variableBorrowIndex,
        reserveRate: poolReserve.variableBorrowRate,
        lastUpdateTimestamp: poolReserve.lastUpdateTimestamp,
        currentTimestamp,
    });
    const { marketReferenceCurrencyBalance: variableBorrowsMarketReferenceCurrency, usdBalance: variableBorrowsUSD, } = (0, pool_math_1.getMarketReferenceCurrencyAndUsdBalance)({
        balance: variableBorrows,
        priceInMarketReferenceCurrency,
        marketRefCurrencyDecimals,
        decimals,
        marketRefPriceInUsd,
    });
    const stableBorrows = (0, pool_math_1.getCompoundedStableBalance)({
        principalBalance: userReserve.principalStableDebt,
        userStableRate: poolReserve.stableBorrowRate,
        lastUpdateTimestamp: userReserve.stableBorrowLastUpdateTimestamp,
        currentTimestamp,
    });
    const { marketReferenceCurrencyBalance: stableBorrowsMarketReferenceCurrency, usdBalance: stableBorrowsUSD, } = (0, pool_math_1.getMarketReferenceCurrencyAndUsdBalance)({
        balance: stableBorrows,
        priceInMarketReferenceCurrency,
        marketRefCurrencyDecimals,
        decimals,
        marketRefPriceInUsd,
    });
    const { totalLiquidity, totalStableDebt, totalVariableDebt } = (0, calculate_supplies_1.calculateSupplies)({
        reserve: {
            totalScaledVariableDebt: poolReserve.totalScaledVariableDebt,
            variableBorrowIndex: poolReserve.variableBorrowIndex,
            variableBorrowRate: poolReserve.variableBorrowRate,
            totalPrincipalStableDebt: poolReserve.totalPrincipalStableDebt,
            averageStableRate: poolReserve.averageStableRate,
            availableLiquidity: poolReserve.availableLiquidity,
            stableDebtLastUpdateTimestamp: poolReserve.stableDebtLastUpdateTimestamp,
            lastUpdateTimestamp: poolReserve.lastUpdateTimestamp,
        },
        currentTimestamp,
    });
    return {
        userReserve,
        underlyingBalance,
        underlyingBalanceMarketReferenceCurrency,
        underlyingBalanceUSD,
        variableBorrows,
        variableBorrowsMarketReferenceCurrency,
        variableBorrowsUSD,
        stableBorrows,
        stableBorrowsMarketReferenceCurrency,
        stableBorrowsUSD,
        totalBorrows: variableBorrows.plus(stableBorrows),
        totalBorrowsMarketReferenceCurrency: variableBorrowsMarketReferenceCurrency.plus(stableBorrowsMarketReferenceCurrency),
        totalBorrowsUSD: variableBorrowsUSD.plus(stableBorrowsUSD),
        totalLiquidity,
        totalStableDebt,
        totalVariableDebt,
    };
}
exports.generateUserReserveSummary = generateUserReserveSummary;
//# sourceMappingURL=generate-user-reserve-summary.js.map