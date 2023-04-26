import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 2000,
}

export const walletGBP = createSlice({
    name: 'GBPWallet',
    initialState,
    reducers: {
        incrementGBP: (state, action) => {
            state.value += action.payload
        },
        decrementGBP: (state, action) => {
            state.value -= action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { incrementGBP, decrementGBP } = walletGBP.actions

export default walletGBP.reducer