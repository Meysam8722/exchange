import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import {walletGBP} from "./Wallets/walletGBP";
import {walletEUR} from "./Wallets/walletEUR";
import {walletUSD} from "./Wallets/walletUSD";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    GBP: walletGBP.reducer,
    EUR: walletEUR.reducer,
    USD: walletUSD.reducer,
  },
});
