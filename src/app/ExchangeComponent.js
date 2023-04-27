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


    const gbp = useSelector((state) => state.GBP.value)
    const eur = useSelector((state) => state.EUR.value)
    const usd = useSelector((state) => state.USD.value)
    let counter = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const [userInput, setUserInput] = useState(0)
    const [exchangeRate, setExchangeRate] = useState(1)
    const [output, setOutput] = useState(0)
    const [fromCurrency, setFromCurrency] = useState('GBP')
    const [toCurrency, setToCurrency] = useState('GBP')
    const [fromCurrencies, setFromCurrencies] = useState(['GBP', 'EUR', 'USD'])
    const [toCurrencies, setToCurrencies] = useState(['GBP', 'EUR', 'USD'])
    const [wrongInput, setWrongInput] = useState(false)

    let wallet = {
        'GBP': gbp,
        'EUR': eur,
        'USD': usd,
    }

    let myHeaders = new Headers();
    myHeaders.append("apikey", "GqtkFGXsFQ97XXM482FrbovFAgobz0Ep");

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
                setOutput(exchangeRate * userInput)
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

    const handleExchange = () => {
        if(userInput > wallet[fromCurrency]) {
            setWrongInput(true)
            alert('Your input exceeded your budget!')
            return
        }
        switch (fromCurrency) {
            case 'GBP':
                dispatch(decrementGBP(userInput))
                break;
            case 'EUR':
                dispatch(decrementEUR(userInput))
                break;
            case 'USD':
                dispatch(decrementUSD(userInput))
                break;
            default:
                break;
        }
        switch (toCurrency) {
            case 'GBP':
                dispatch(incrementGBP(output))
                break;
            case 'EUR':
                dispatch(incrementEUR(output))
                break;
            case 'USD':
                dispatch(incrementUSD(output))
                break;
            default:
                break;
        }
    }

    return (
        <div className="container">
            <div className="currency">
                <div className="from-currency">
                    <select value={fromCurrency} onChange={handleFromChange}>
                        {fromCurrencies.map((item) =>
                            <option value={item} key={item}>{item}</option>
                        )}
                    </select>
                    <span>{wallet[fromCurrency]}</span>
                </div>
                <input type="number" value={userInput} onInput={handleInput} />
            </div>
            <button onClick={() => getExchangeRate()}>fetch</button>
            <div className="currency currency--to">
                <div className="to-currency">
                    <select value={toCurrency} onChange={handleToChange}>
                        {toCurrencies.map((item) =>
                            <option value={item} key={item}>{item}</option>
                        )}
                    </select>
                    <span>{wallet[toCurrency]}</span>
                </div>
                <span>{output}</span>
            </div>
            <button onClick={() => handleExchange()}>
                Exchange
            </button>
        </div>
    );
}
export default ExchangeComponent;