import BigNumber from 'bignumber.js';
import { BigNumberValue } from '../../bignumber';
interface NativeToUSD {
  amount: BigNumber;
  currencyDecimals: number;
  priceInMarketReferenceCurrency: BigNumberValue;
  marketRefCurrencyDecimals: number;
  marketRefPriceInUsd: BigNumberValue;
}
export declare function nativeToUSD({
  amount,
  currencyDecimals,
  priceInMarketReferenceCurrency,
  marketRefCurrencyDecimals,
  marketRefPriceInUsd,
}: NativeToUSD): string;
export {};
//# sourceMappingURL=native-to-usd.d.ts.map
