import React from 'react';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {decrement, increment} from "./Wallets/wallet";
import './ExchangeStyles.css';

function ExchangeComponent() {

    const gbp = useSelector((state) => state.GBP)
    const eur = useSelector((state) => state.EUR)
    const usd = useSelector((state) => state.USD)
    const dispatch = useDispatch()

    const [value, setValue] = useState('GBP')

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
                <form onSubmit={handleSubmit}>
                    <select value={value} onChange={handleChange}>
                        <option value="GBP">Grapefruit</option>
                        <option value="EUR">Lime</option>
                        <option value="USD">Coconut</option>
                    </select>
                </form>
            </div>
            <div className="currency currency--to">
                <form onSubmit={handleSubmit}>
                    <select value={value} onChange={handleChange}>
                        <option value="GBP">Grapefruit</option>
                        <option value="EUR">Lime</option>
                        <option value="USD">Coconut</option>
                    </select>
                </form>
            </div>
            <input type="submit" value="Submit" />
        </div>
    );
}
export default ExchangeComponent;