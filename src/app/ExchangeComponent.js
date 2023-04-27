import React from 'react';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {decrementGBP, incrementGBP} from "./Wallets/walletGBP";
import {incrementEUR, decrementEUR} from "./Wallets/walletEUR";
import {incrementUSD, decrementUSD} from "./Wallets/walletUSD";
import {increment, decrement} from "../features/counter/counterSlice";
import axios from "axios";
import './ExchangeStyles.css';

function ExchangeComponent() {

    const [userInput, setUserInput] = useState(0)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [output, setOutput] = useState(0)
    const gbp = useSelector((state) => state.GBP.value)
    const eur = useSelector((state) => state.EUR.value)
    const usd = useSelector((state) => state.USD.value)
    let counter = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const [fromCurrency, setFromCurrency] = useState('GBP')
    const [toCurrency, setToCurrency] = useState('GBP')
    const [fromCurrencies, setFromCurrencies] = useState(['GBP', 'EUR', 'USD'])
    const [toCurrencies, setToCurrencies] = useState(['GBP', 'EUR', 'USD'])

    let wallet = {
        GBP: gbp,
        EUR: eur,
        USD: usd,
    }

    let myHeaders = new Headers();
    myHeaders.append("apikey", "ngmk0WtVMcEePnU6QNOALv6sZODbVYL5");

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    const MINUTE_MS = 5000;

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log('salam');
            // getExchangeRate()
        }, MINUTE_MS);
        getExchangeRate()
        return () => clearInterval(interval);
// This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [gbp, fromCurrency, toCurrency, exchangeRate])

    const getExchangeRate = () => {
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${userInput}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(JSON.parse(result).info.rate)
                setExchangeRate(JSON.parse(result).info.rate)
                console.log(exchangeRate)
            })
            .catch(error => console.log('error', error));
    }

    const handleInput = (event) => {
        const validated = event.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/)
        if (validated) {
            setUserInput(event.target.value)
        }
        setOutput(exchangeRate * event.target.value)
    }

    const handleFromChange = (event) => {
        setFromCurrency(event.target.value)
        let copyOfToCurrencies = toCurrencies
        copyOfToCurrencies.filter((item) => item !== fromCurrency)
        setToCurrencies(copyOfToCurrencies)
    }

    const handleToChange = (event) => {
        setToCurrency(event.target.value)
        let copyOfFromCurrencies = fromCurrencies
        copyOfFromCurrencies.filter((item) => item !== toCurrency)
        setFromCurrencies(copyOfFromCurrencies)
    }

    return (
        <div className="container">
            <div className="currency">
                <div>
                    <select value={fromCurrency} onChange={handleFromChange}>
                        {fromCurrencies.map((item) =>
                            <option value={item} key={item}>{item}</option>
                        )}
                    </select>
                </div>
                <input type="number" value={userInput} onInput={handleInput} />
            </div>
            <button onClick={() => getExchangeRate()}>fetch</button>
            <div className="currency currency--to">
                <div>
                    <select value={toCurrency} onChange={handleToChange}>
                        {toCurrencies.map((item) =>
                            <option value={item} key={item}>{item}</option>
                        )}
                    </select>
                </div>
                <span>{output}</span>
            </div>
            <button onClick={() => dispatch(incrementGBP(1000))}>
                Exchange
            </button>
        </div>
    );
}
export default ExchangeComponent;