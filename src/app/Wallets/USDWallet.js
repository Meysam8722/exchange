import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const USDWalletSlice = createSlice({
    name: 'GBPWallet',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.value += action.payload
        },
        decrement: (state, action) => {
            state.value -= action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = USDWalletSlice.actions

export default USDWalletSlice.reducer