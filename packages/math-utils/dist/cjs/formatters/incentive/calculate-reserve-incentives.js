"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateReserveIncentives = void 0;
const calculate_incentive_apr_1 = require("./calculate-incentive-apr");
// Calculate deposit, variableBorrow, and stableBorrow incentives APR for a reserve asset
function calculateReserveIncentives({ reserveIncentiveData, aRewardTokenPriceInMarketReferenceCurrency, vRewardTokenPriceInMarketReferenceCurrency, sRewardTokenPriceInMarketReferenceCurrency, totalLiquidity, totalVariableDebt, totalStableDebt, decimals, priceInMarketReferenceCurrency, }) {
    const aIncentivesAPR = (0, calculate_incentive_apr_1.calculateIncentiveAPR)({
        emissionPerSecond: reserveIncentiveData.aIncentiveData.emissionPerSecond,
        rewardTokenPriceInMarketReferenceCurrency: aRewardTokenPriceInMarketReferenceCurrency,
        priceInMarketReferenceCurrency,
        totalTokenSupply: totalLiquidity,
        decimals,
        rewardTokenDecimals: reserveIncentiveData.aIncentiveData.rewardTokenDecimals,
    });
    const vIncentivesAPR = (0, calculate_incentive_apr_1.calculateIncentiveAPR)({
        emissionPerSecond: reserveIncentiveData.vIncentiveData.emissionPerSecond,
        rewardTokenPriceInMarketReferenceCurrency: vRewardTokenPriceInMarketReferenceCurrency,
        priceInMarketReferenceCurrency,
        totalTokenSupply: totalVariableDebt,
        decimals,
        rewardTokenDecimals: reserveIncentiveData.aIncentiveData.rewardTokenDecimals,
    });
    const sIncentivesAPR = (0, calculate_incentive_apr_1.calculateIncentiveAPR)({
        emissionPerSecond: reserveIncentiveData.sIncentiveData.emissionPerSecond,
        rewardTokenPriceInMarketReferenceCurrency: sRewardTokenPriceInMarketReferenceCurrency,
        priceInMarketReferenceCurrency,
        totalTokenSupply: totalStableDebt,
        decimals,
        rewardTokenDecimals: reserveIncentiveData.aIncentiveData.rewardTokenDecimals,
    });
    return {
        underlyingAsset: reserveIncentiveData.underlyingAsset,
        aIncentivesData: {
            incentiveAPR: aIncentivesAPR,
            rewardTokenAddress: reserveIncentiveData.aIncentiveData.rewardTokenAddress,
        },
        vIncentivesData: {
            incentiveAPR: vIncentivesAPR,
            rewardTokenAddress: reserveIncentiveData.vIncentiveData.rewardTokenAddress,
        },
        sIncentivesData: {
            incentiveAPR: sIncentivesAPR,
            rewardTokenAddress: reserveIncentiveData.sIncentiveData.rewardTokenAddress,
        },
    };
}
exports.calculateReserveIncentives = calculateReserveIncentives;
//# sourceMappingURL=calculate-reserve-incentives.js.map