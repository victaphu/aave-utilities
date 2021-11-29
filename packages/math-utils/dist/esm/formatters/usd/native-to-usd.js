import BigNumber from 'bignumber.js';
import { USD_DECIMALS } from '../../constants';
export function nativeToUSD({ amount, currencyDecimals, priceInMarketReferenceCurrency, marketRefCurrencyDecimals, marketRefPriceInUsd, }) {
    return amount
        .multipliedBy(priceInMarketReferenceCurrency)
        .multipliedBy(marketRefPriceInUsd)
        .dividedBy(new BigNumber(1).shiftedBy(currencyDecimals + marketRefCurrencyDecimals + USD_DECIMALS))
        .toString();
}
//# sourceMappingURL=native-to-usd.js.map