import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import {GBPWalletSlice} from "./Wallets/GBPWallet";
import {EURWalletSlice} from "./Wallets/EURWallet";
import {USDWalletSlice} from "./Wallets/USDWallet";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    GBP: GBPWalletSlice,
    EUR: EURWalletSlice,
    USD: USDWalletSlice,
  },
});
