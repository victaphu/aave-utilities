"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAllUserIncentives = void 0;
const bignumber_js_1 = require("bignumber.js");
const bignumber_1 = require("../../bignumber");
const calculate_user_reserve_incentives_1 = require("./calculate-user-reserve-incentives");
function calculateAllUserIncentives({ reserveIncentives, userReserveIncentives, userReserves, currentTimestamp, }) {
    // calculate incentive per token
    const rewards = userReserveIncentives
        .map((userReserveIncentive) => {
        const reserve = reserveIncentives.find((reserve) => reserve.underlyingAsset === userReserveIncentive.underlyingAsset);
        const userReserve = userReserves.find((reserve) => reserve.underlyingAsset === userReserveIncentive.underlyingAsset);
        if (reserve) {
            let rewards = {
                aIncentives: (0, bignumber_1.valueToZDBigNumber)('0'),
                vIncentives: (0, bignumber_1.valueToZDBigNumber)('0'),
                sIncentives: (0, bignumber_1.valueToZDBigNumber)('0'),
            };
            if (userReserve) {
                rewards = (0, calculate_user_reserve_incentives_1.calculateUserReserveIncentives)({
                    reserveIncentives: reserve,
                    userReserveIncentives: userReserveIncentive,
                    userReserveData: userReserve,
                    currentTimestamp,
                });
            }
            return [
                {
                    tokenAddress: userReserveIncentive.aTokenIncentivesUserData.tokenAddress,
                    incentiveController: userReserveIncentive.aTokenIncentivesUserData
                        .incentiveControllerAddress,
                    rewardTokenAddress: userReserveIncentive.aTokenIncentivesUserData.rewardTokenAddress,
                    rewardTokenDecimals: userReserveIncentive.aTokenIncentivesUserData.rewardTokenDecimals,
                    accruedRewards: new bignumber_js_1.BigNumber(rewards.aIncentives),
                    unclaimedRewards: new bignumber_js_1.BigNumber(userReserveIncentive.aTokenIncentivesUserData.userUnclaimedRewards),
                },
                {
                    tokenAddress: userReserveIncentive.vTokenIncentivesUserData.tokenAddress,
                    incentiveController: userReserveIncentive.vTokenIncentivesUserData
                        .incentiveControllerAddress,
                    rewardTokenAddress: userReserveIncentive.vTokenIncentivesUserData.rewardTokenAddress,
                    rewardTokenDecimals: userReserveIncentive.vTokenIncentivesUserData.rewardTokenDecimals,
                    accruedRewards: new bignumber_js_1.BigNumber(rewards.vIncentives),
                    unclaimedRewards: new bignumber_js_1.BigNumber(userReserveIncentive.vTokenIncentivesUserData.userUnclaimedRewards),
                },
                {
                    tokenAddress: userReserveIncentive.sTokenIncentivesUserData.tokenAddress,
                    incentiveController: userReserveIncentive.sTokenIncentivesUserData
                        .incentiveControllerAddress,
                    rewardTokenAddress: userReserveIncentive.sTokenIncentivesUserData.rewardTokenAddress,
                    rewardTokenDecimals: userReserveIncentive.sTokenIncentivesUserData.rewardTokenDecimals,
                    accruedRewards: new bignumber_js_1.BigNumber(rewards.sIncentives),
                    unclaimedRewards: new bignumber_js_1.BigNumber(userReserveIncentive.sTokenIncentivesUserData.userUnclaimedRewards),
                },
            ];
        }
        return [];
    })
        .flat();
    // normalize incentives per controller
    return rewards.reduce((acc, reward) => {
        if (!acc[reward.incentiveController]) {
            acc[reward.incentiveController] = {
                assets: [],
                claimableRewards: reward.unclaimedRewards,
                rewardTokenAddress: reward.rewardTokenAddress,
                rewardTokenDecimals: reward.rewardTokenDecimals,
            };
        }
        if (reward.accruedRewards.gt(0)) {
            acc[reward.incentiveController].claimableRewards = acc[reward.incentiveController].claimableRewards.plus(reward.accruedRewards);
            acc[reward.incentiveController].assets.push(reward.tokenAddress);
        }
        return acc;
    }, {});
}
exports.calculateAllUserIncentives = calculateAllUserIncentives;
//# sourceMappingURL=calculate-all-user-incentives.js.map