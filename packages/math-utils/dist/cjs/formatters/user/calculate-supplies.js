"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSupplies = void 0;
const pool_math_1 = require("../../pool-math");
const ray_math_1 = require("../../ray.math");
function calculateSupplies({ reserve, currentTimestamp, }) {
    const { totalVariableDebt, totalStableDebt } = calculateReserveDebtSuppliesRaw({
        reserve,
        currentTimestamp,
    });
    const totalDebt = totalVariableDebt.plus(totalStableDebt);
    const totalLiquidity = totalDebt.plus(reserve.availableLiquidity);
    return {
        totalVariableDebt,
        totalStableDebt,
        totalLiquidity,
    };
}
exports.calculateSupplies = calculateSupplies;
/**
 * Calculates the debt accrued to a given point in time.
 * @param reserve
 * @param currentTimestamp unix timestamp which must be higher than reserve.lastUpdateTimestamp
 */
function calculateReserveDebtSuppliesRaw({ reserve, currentTimestamp, }) {
    const totalVariableDebt = (0, ray_math_1.rayMul)((0, ray_math_1.rayMul)(reserve.totalScaledVariableDebt, reserve.variableBorrowIndex), (0, pool_math_1.calculateCompoundedInterest)({
        rate: reserve.variableBorrowRate,
        currentTimestamp,
        lastUpdateTimestamp: reserve.lastUpdateTimestamp,
    }));
    const totalStableDebt = (0, ray_math_1.rayMul)(reserve.totalPrincipalStableDebt, (0, pool_math_1.calculateCompoundedInterest)({
        rate: reserve.averageStableRate,
        currentTimestamp,
        lastUpdateTimestamp: reserve.stableDebtLastUpdateTimestamp,
    }));
    return { totalVariableDebt, totalStableDebt };
}
//# sourceMappingURL=calculate-supplies.js.map