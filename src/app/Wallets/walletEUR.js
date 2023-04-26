import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 2500,
}

export const walletEUR = createSlice({
    name: 'GBPWallet',
    initialState,
    reducers: {
        incrementEUR: (state, action) => {
            state.value += action.payload
        },
        decrementEUR: (state, action) => {
            state.value -= action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { incrementEUR, decrementEUR } = walletEUR.actions

export default walletEUR.reducer