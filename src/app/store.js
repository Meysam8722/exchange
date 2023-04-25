import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import {wallet} from "./Wallets/wallet";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    wallet: wallet,
  },
});
