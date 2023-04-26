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
    const gbp = useSelector((state) => state.GBP.value)
    const eur = useSelector((state) => state.EUR.value)
    const usd = useSelector((state) => state.USD.value)
    let counter = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const [value, setValue] = useState('GBP')

    let wallet = {
        GBP: gbp,
        EUR: eur,
        USD: usd,
    }

    const MINUTE_MS = 5000;

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('salam');
        }, MINUTE_MS);
        console.log(gbp)
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [gbp])

    const getExchangeRate = async () => {
        await axios.get('https://openexchangerates.org/api/', )
    }

    const handleInput = (event) => {
        const validated = event.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/)
        if (validated) {
            setUserInput(event.target.value)
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSubmit = (event) => {
        alert('Your favorite flavor is: ' + value);
        event.preventDefault();
    }

    return (
        <div className="container">
            <div className="currency">
                <div>
                    <select value={value} onChange={handleChange}>
                        <option value="GBP">Grapefruit</option>
                        <option value="EUR">Lime</option>
                        <option value="USD">Coconut</option>
                    </select>
                </div>
                <input type="number" value={userInput} onInput={handleInput} />
            </div>
            <div className="currency currency--to">
                <div>
                    <select value={value} onChange={handleChange}>
                        <option value="GBP">Grapefruit</option>
                        <option value="EUR">Lime</option>
                        <option value="USD">Coconut</option>
                    </select>
                </div>
                <div>{userInput * 1000}</div>
            </div>
            <button onClick={() => dispatch(incrementGBP(1000))}>
                Exchange
            </button>
        </div>
    );
}
export default ExchangeComponent;