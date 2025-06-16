import { useEffect, useState } from 'react'
import walletBalance from '../json/wallet-balance-json';
import currenciesData from '../json/currencies-json';
import rateData from '../json/live-rates-json';

function CoinList({ getTotal }: any) {
    const [mergedData, setMergedData] = useState(null)
    const { wallet } = walletBalance;
    const { currencies } = currenciesData;
    const { tiers } = rateData;

    function mergeArraysByToken(array1: any, array2: any, key1: any, key2: any) {
        return array1.map((item1: object) => {
            const matchingItem = array2.find((item2: object) => item2[key2] === item1[key1]);
            return matchingItem ? { ...item1, ...matchingItem } : item1;
        });
    }

    function toFixed(num: number) {
        return parseFloat(num.toFixed(2))
    }

    function getTotalBalance(mergedData: any) {
        const totalPrice = mergedData.reduce((sum: number, data: any) => sum + data.amount * data.rates[0]?.rate, 0);
        console.log(totalPrice, 'totalPrice');
        getTotal(totalPrice);
    }

    useEffect(() => {
        const mergedCurrencyAndBalanceData = mergeArraysByToken(wallet, currencies, 'currency', 'symbol');
        const mergedData = mergeArraysByToken(mergedCurrencyAndBalanceData, tiers, 'currency', 'from_currency');
        console.log(mergedData);
        getTotalBalance(mergedData);
        setMergedData(mergedData);
    }, [])
    return (
        <>
            <ul>
                {
                    mergedData && mergedData.map((item: any) =>
                        <li key={item.currency}>
                            <div className="flex items-center flex-auto shadow-md">
                                <img className="logo" src={item.colorful_image_url}></img>
                                <div className="token flex-1">{item.name}</div>
                                <div className="amount flex-1">
                                    <p>{item.amount} {item.currency}</p>
                                    <p>{toFixed(item.amount * item.rates[0]?.rate)} {item.to_currency}</p>
                                </div>
                            </div>
                        </li>
                    )
                }
            </ul>
        </>
    )
}

export default CoinList
