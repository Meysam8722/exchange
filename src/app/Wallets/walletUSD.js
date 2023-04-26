import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 3000,
}

export const walletUSD = createSlice({
    name: 'GBPWallet',
    initialState,
    reducers: {
        incrementUSD: (state, action) => {
            state.value += action.payload
        },
        decrementUSD: (state, action) => {
            state.value -= action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { incrementUSD, decrementUSD } = walletUSD.actions

export default walletUSD.reducer