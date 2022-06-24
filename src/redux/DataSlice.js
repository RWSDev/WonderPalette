import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    palette: {},
    pickColor: '#0046ff',
    paletteSection: '',
}

export const DataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPalette: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

            // store data for later retrieval
            console.log('palette set')
            state.palette = action.payload
        },
        setPickColor: (state, action) => {
            state.pickColor = action.payload
        },
        setPaletteSection: (state, action) => {
            state.paletteSection = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setPalette, setPickColor, setPaletteSection } = DataSlice.actions

export default DataSlice.reducer
