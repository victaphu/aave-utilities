"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nativeToUSD = void 0;
const tslib_1 = require("tslib");
const bignumber_js_1 = (0, tslib_1.__importDefault)(require("bignumber.js"));
const constants_1 = require("../../constants");
function nativeToUSD({ amount, currencyDecimals, priceInMarketReferenceCurrency, marketRefCurrencyDecimals, marketRefPriceInUsd, }) {
    return amount
        .multipliedBy(priceInMarketReferenceCurrency)
        .multipliedBy(marketRefPriceInUsd)
        .dividedBy(new bignumber_js_1.default(1).shiftedBy(currencyDecimals + marketRefCurrencyDecimals + constants_1.USD_DECIMALS))
        .toString();
}
exports.nativeToUSD = nativeToUSD;
//# sourceMappingURL=native-to-usd.js.map