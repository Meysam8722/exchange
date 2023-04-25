import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    USD: 3000,
    EUR: 2500,
    GBP: 2000,
}

export const wallet = createSlice({
    name: 'GBPWallet',
    initialState,
    reducers: {
        increment: (state, action, currency) => {
            state[currency] += action.payload
        },
        decrement: (state, action, currency) => {
            state[currency] -= action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = wallet.actions

export default wallet.reducer