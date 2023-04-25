import React from 'react';
import {useState, useEffect} from 'react';
import './ExchangeStyles.css';

function ExchangeComponent() {

    const [walletGBP, setWalletGBP] = useState(2000)
    const [walletEUR, setWalletEUR] = useState(2500)
    const [walletUSD, setWalletUSD] = useState(3000)
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