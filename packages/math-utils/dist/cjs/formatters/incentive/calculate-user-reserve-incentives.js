"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateUserReserveIncentives = void 0;
const tslib_1 = require("tslib");
const bignumber_js_1 = (0, tslib_1.__importDefault)(require("bignumber.js"));
const ray_math_1 = require("../../ray.math");
const calculate_accrued_incentives_1 = require("./calculate-accrued-incentives");
// Calculate user deposit and borrow incentives for an individual reserve asset
function calculateUserReserveIncentives({ reserveIncentives, userReserveIncentives, currentTimestamp, userReserveData, }) {
    const totalDeposits = (0, ray_math_1.rayDiv)(new bignumber_js_1.default(userReserveData.totalLiquidity), new bignumber_js_1.default(userReserveData.liquidityIndex));
    const aIncentivesRequest = {
        principalUserBalance: new bignumber_js_1.default(userReserveData.scaledATokenBalance),
        reserveIndex: new bignumber_js_1.default(reserveIncentives.aIncentiveData.tokenIncentivesIndex),
        userIndex: new bignumber_js_1.default(userReserveIncentives.aTokenIncentivesUserData.tokenIncentivesUserIndex),
        precision: reserveIncentives.aIncentiveData.precision,
        rewardTokenDecimals: reserveIncentives.aIncentiveData.rewardTokenDecimals,
        reserveIndexTimestamp: reserveIncentives.aIncentiveData.incentivesLastUpdateTimestamp,
        emissionPerSecond: new bignumber_js_1.default(reserveIncentives.aIncentiveData.emissionPerSecond),
        totalSupply: totalDeposits,
        currentTimestamp,
        emissionEndTimestamp: reserveIncentives.aIncentiveData.emissionEndTimestamp,
    };
    const vIncentivesRequest = {
        principalUserBalance: new bignumber_js_1.default(userReserveData.scaledVariableDebt),
        reserveIndex: new bignumber_js_1.default(reserveIncentives.vIncentiveData.tokenIncentivesIndex),
        userIndex: new bignumber_js_1.default(userReserveIncentives.vTokenIncentivesUserData.tokenIncentivesUserIndex),
        precision: reserveIncentives.vIncentiveData.precision,
        rewardTokenDecimals: reserveIncentives.vIncentiveData.rewardTokenDecimals,
        reserveIndexTimestamp: reserveIncentives.vIncentiveData.incentivesLastUpdateTimestamp,
        emissionPerSecond: new bignumber_js_1.default(reserveIncentives.vIncentiveData.emissionPerSecond),
        totalSupply: new bignumber_js_1.default(userReserveData.totalScaledVariableDebt),
        currentTimestamp,
        emissionEndTimestamp: reserveIncentives.vIncentiveData.emissionEndTimestamp,
    };
    const sIncentivesRequest = {
        principalUserBalance: new bignumber_js_1.default(userReserveData.principalStableDebt),
        reserveIndex: new bignumber_js_1.default(reserveIncentives.sIncentiveData.tokenIncentivesIndex),
        userIndex: new bignumber_js_1.default(userReserveIncentives.sTokenIncentivesUserData.tokenIncentivesUserIndex),
        precision: reserveIncentives.sIncentiveData.precision,
        rewardTokenDecimals: reserveIncentives.sIncentiveData.rewardTokenDecimals,
        reserveIndexTimestamp: reserveIncentives.sIncentiveData.incentivesLastUpdateTimestamp,
        emissionPerSecond: new bignumber_js_1.default(reserveIncentives.sIncentiveData.emissionPerSecond),
        totalSupply: new bignumber_js_1.default(userReserveData.totalPrincipalStableDebt),
        currentTimestamp,
        emissionEndTimestamp: reserveIncentives.sIncentiveData.emissionEndTimestamp,
    };
    const aIncentives = (0, calculate_accrued_incentives_1.calculateAccruedIncentives)(aIncentivesRequest);
    const vIncentives = (0, calculate_accrued_incentives_1.calculateAccruedIncentives)(vIncentivesRequest);
    const sIncentives = (0, calculate_accrued_incentives_1.calculateAccruedIncentives)(sIncentivesRequest);
    return { aIncentives, vIncentives, sIncentives };
}
exports.calculateUserReserveIncentives = calculateUserReserveIncentives;
//# sourceMappingURL=calculate-user-reserve-incentives.js.map