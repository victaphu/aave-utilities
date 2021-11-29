"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatReserveUSD = exports.formatReserve = void 0;
const bignumber_1 = require("../../bignumber");
const constants_1 = require("../../constants");
const index_1 = require("../../index");
const native_to_usd_1 = require("../usd/native-to-usd");
const calculate_reserve_debt_1 = require("./calculate-reserve-debt");
/**
 * @description accrues interest and adds computed fields
 */
function getComputedReserveFields({ reserve, currentTimestamp, }) {
    const { totalDebt, totalStableDebt, totalVariableDebt } = (0, calculate_reserve_debt_1.calculateReserveDebt)(reserve, currentTimestamp);
    const totalLiquidity = totalDebt.plus(reserve.availableLiquidity);
    const utilizationRate = totalLiquidity.eq(0)
        ? '0'
        : (0, bignumber_1.valueToBigNumber)(totalDebt).dividedBy(totalLiquidity).toFixed();
    // https://github.com/aave/protocol-v2/blob/baeb455fad42d3160d571bd8d3a795948b72dd85/contracts/protocol/lendingpool/LendingPoolConfigurator.sol#L284
    const reserveLiquidationBonus = (0, bignumber_1.normalize)((0, bignumber_1.valueToBigNumber)(reserve.reserveLiquidationBonus).minus(10 ** index_1.LTV_PRECISION), index_1.LTV_PRECISION);
    const supplyAPY = (0, index_1.rayPow)((0, bignumber_1.valueToZDBigNumber)(reserve.liquidityRate)
        .dividedBy(constants_1.SECONDS_PER_YEAR)
        .plus(index_1.RAY), constants_1.SECONDS_PER_YEAR).minus(index_1.RAY);
    const variableBorrowAPY = (0, index_1.rayPow)((0, bignumber_1.valueToZDBigNumber)(reserve.variableBorrowRate)
        .dividedBy(constants_1.SECONDS_PER_YEAR)
        .plus(index_1.RAY), constants_1.SECONDS_PER_YEAR).minus(index_1.RAY);
    const stableBorrowAPY = (0, index_1.rayPow)((0, bignumber_1.valueToZDBigNumber)(reserve.stableBorrowRate)
        .dividedBy(constants_1.SECONDS_PER_YEAR)
        .plus(index_1.RAY), constants_1.SECONDS_PER_YEAR).minus(index_1.RAY);
    return {
        totalDebt,
        totalStableDebt,
        totalVariableDebt,
        totalLiquidity,
        utilizationRate,
        reserveLiquidationBonus,
        supplyAPY,
        variableBorrowAPY,
        stableBorrowAPY,
    };
}
/**
 * @description normalizes reserve values & computed fields
 */
function formatEnhancedReserve({ reserve, }) {
    const normalizeWithReserve = (n) => (0, bignumber_1.normalize)(n, reserve.decimals);
    return {
        totalVariableDebt: normalizeWithReserve(reserve.totalVariableDebt),
        totalStableDebt: normalizeWithReserve(reserve.totalStableDebt),
        totalLiquidity: normalizeWithReserve(reserve.totalLiquidity),
        availableLiquidity: normalizeWithReserve(reserve.availableLiquidity),
        utilizationRate: reserve.utilizationRate,
        totalDebt: normalizeWithReserve(reserve.totalDebt),
        baseLTVasCollateral: (0, bignumber_1.normalize)(reserve.baseLTVasCollateral, index_1.LTV_PRECISION),
        reserveFactor: (0, bignumber_1.normalize)(reserve.reserveFactor, index_1.LTV_PRECISION),
        supplyAPY: (0, bignumber_1.normalize)(reserve.supplyAPY, constants_1.RAY_DECIMALS),
        supplyAPR: (0, bignumber_1.normalize)(reserve.liquidityRate, constants_1.RAY_DECIMALS),
        variableBorrowAPY: (0, bignumber_1.normalize)(reserve.variableBorrowAPY, constants_1.RAY_DECIMALS),
        variableBorrowAPR: (0, bignumber_1.normalize)(reserve.variableBorrowRate, constants_1.RAY_DECIMALS),
        stableBorrowAPY: (0, bignumber_1.normalize)(reserve.stableBorrowAPY, constants_1.RAY_DECIMALS),
        stableBorrowAPR: (0, bignumber_1.normalize)(reserve.stableBorrowRate, constants_1.RAY_DECIMALS),
        liquidityIndex: (0, bignumber_1.normalize)(reserve.liquidityIndex, constants_1.RAY_DECIMALS),
        reserveLiquidationThreshold: (0, bignumber_1.normalize)(reserve.reserveLiquidationThreshold, 4),
        reserveLiquidationBonus: reserve.reserveLiquidationBonus,
        totalScaledVariableDebt: normalizeWithReserve(reserve.totalScaledVariableDebt),
        totalPrincipalStableDebt: normalizeWithReserve(reserve.totalPrincipalStableDebt),
        variableBorrowIndex: (0, bignumber_1.normalize)(reserve.variableBorrowIndex, constants_1.RAY_DECIMALS),
    };
}
/**
 * @description computes additional fields and normalizes numbers into human readable decimals
 */
function formatReserve({ reserve, currentTimestamp, }) {
    const computedFields = getComputedReserveFields({
        reserve,
        currentTimestamp,
    });
    return formatEnhancedReserve({ reserve: Object.assign(Object.assign({}, reserve), computedFields) });
}
exports.formatReserve = formatReserve;
/**
 * @description computes additional fields and normalizes numbers into human readable decimals
 * In addition to that it also converts the numbers to USD
 */
function formatReserveUSD({ reserve, currentTimestamp, marketRefPriceInUsd, marketRefCurrencyDecimals, }) {
    const computedFields = getComputedReserveFields({
        reserve,
        currentTimestamp,
    });
    const formattedReserve = formatEnhancedReserve({
        reserve: Object.assign(Object.assign({}, reserve), computedFields),
    });
    return Object.assign(Object.assign({}, formattedReserve), { totalLiquidityUSD: (0, native_to_usd_1.nativeToUSD)({
            amount: computedFields.totalLiquidity,
            currencyDecimals: reserve.decimals,
            marketRefCurrencyDecimals,
            priceInMarketReferenceCurrency: reserve.priceInMarketReferenceCurrency,
            marketRefPriceInUsd,
        }), totalDebtUSD: (0, native_to_usd_1.nativeToUSD)({
            amount: computedFields.totalDebt,
            currencyDecimals: reserve.decimals,
            marketRefCurrencyDecimals,
            priceInMarketReferenceCurrency: reserve.priceInMarketReferenceCurrency,
            marketRefPriceInUsd,
        }), totalVariableDebtUSD: (0, native_to_usd_1.nativeToUSD)({
            amount: computedFields.totalVariableDebt,
            currencyDecimals: reserve.decimals,
            marketRefCurrencyDecimals,
            priceInMarketReferenceCurrency: reserve.priceInMarketReferenceCurrency,
            marketRefPriceInUsd,
        }), totalStableDebtUSD: (0, native_to_usd_1.nativeToUSD)({
            amount: computedFields.totalStableDebt,
            currencyDecimals: reserve.decimals,
            marketRefCurrencyDecimals,
            priceInMarketReferenceCurrency: reserve.priceInMarketReferenceCurrency,
            marketRefPriceInUsd,
        }) });
}
exports.formatReserveUSD = formatReserveUSD;
//# sourceMappingURL=index.js.map