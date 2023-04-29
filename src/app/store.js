import { configureStore } from '@reduxjs/toolkit';
import {walletGBP} from "./Wallets/walletGBP";
import {walletEUR} from "./Wallets/walletEUR";
import {walletUSD} from "./Wallets/walletUSD";

export const store = configureStore({
  reducer: {
    GBP: walletGBP.reducer,
    EUR: walletEUR.reducer,
    USD: walletUSD.reducer,
  },
});
