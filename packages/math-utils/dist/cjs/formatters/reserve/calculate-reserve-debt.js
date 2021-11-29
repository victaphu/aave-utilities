"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateReserveDebt = void 0;
const ray_math_1 = require("../../ray.math");
const calculate_compounded_interest_1 = require("../compounded-interest/calculate-compounded-interest");
function calculateReserveDebt(reserveDebt, currentTimestamp) {
    const timestamp = currentTimestamp;
    const totalVariableDebt = getTotalVariableDebt(reserveDebt, timestamp);
    const totalStableDebt = getTotalStableDebt(reserveDebt, timestamp);
    return {
        totalVariableDebt,
        totalStableDebt,
        totalDebt: totalVariableDebt.plus(totalStableDebt),
    };
}
exports.calculateReserveDebt = calculateReserveDebt;
function getTotalVariableDebt(reserveDebt, currentTimestamp) {
    return (0, ray_math_1.rayMul)((0, ray_math_1.rayMul)(reserveDebt.totalScaledVariableDebt, reserveDebt.variableBorrowIndex), (0, calculate_compounded_interest_1.calculateCompoundedInterest)({
        rate: reserveDebt.variableBorrowRate,
        currentTimestamp,
        lastUpdateTimestamp: reserveDebt.lastUpdateTimestamp,
    }));
}
function getTotalStableDebt(reserveDebt, currentTimestamp) {
    return (0, ray_math_1.rayMul)(reserveDebt.totalPrincipalStableDebt, (0, calculate_compounded_interest_1.calculateCompoundedInterest)({
        rate: reserveDebt.averageStableRate,
        currentTimestamp,
        lastUpdateTimestamp: reserveDebt.stableDebtLastUpdateTimestamp,
    }));
}
//# sourceMappingURL=calculate-reserve-debt.js.map