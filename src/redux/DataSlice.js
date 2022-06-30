import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    palette: {},
    pickColor: '#0000ff',
    paletteSection: '',
    sectionColorNames: {
        complimentary: {},
        split: {},
        analogous: {},
        triadic: {},
        tetradic: {},
        square: {},
        tints: {},
        shades: {},
    },
    bookHexColor: '#000000',
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
        clearSectionColorNames: (state, action) => {
            return {
                ...state,
                sectionColorNames: {
                    complimentary: {},
                    split: {},
                    analogous: {},
                    triadic: {},
                    tetradic: {},
                    square: {},
                    tints: {},
                    shades: {},
                },
            }
        },
        setSectionColorNames: (state, action) => {
            // console.log('============ REDUX ==============')
            const hexColor = action.payload.hexColor
            const section = action.payload.secName
            const colors = action.payload.colors

            switch(action.payload.secName) {
                case 'complimentary': return {
                    ...state,
                    sectionColorNames : {
                        ...state.sectionColorNames,
                        complimentary: {
                            ...state.sectionColorNames.complimentary,
                            [hexColor]: colors
                        }
                    }
                }
                case 'split': return {
                    ...state,
                    sectionColorNames : {
                        ...state.sectionColorNames,
                        split: {
                            ...state.sectionColorNames.split,
                            [hexColor]: colors
                        }
                    }
                }
                case 'analogous': return {
                    ...state,
                    sectionColorNames : {
                        ...state.sectionColorNames,
                        analogous: {
                            ...state.sectionColorNames.analogous,
                            [hexColor]: colors
                        }
                    }
                }
                case 'triadic': return {
                    ...state,
                    sectionColorNames : {
                        ...state.sectionColorNames,
                        triadic: {
                            ...state.sectionColorNames.triadic,
                            [hexColor]: colors
                        }
                    }
                }
                case 'tetradic': return {
                    ...state,
                    sectionColorNames : {
                        ...state.sectionColorNames,
                        tetradic: {
                            ...state.sectionColorNames.tetradic,
                            [hexColor]: colors
                        }
                    }
                }
                case 'square': return {
                    ...state,
                    sectionColorNames : {
                        ...state.sectionColorNames,
                        square: {
                            ...state.sectionColorNames.square,
                            [hexColor]: colors
                        }
                    }
                }
                case 'tints': return {
                    ...state,
                    sectionColorNames : {
                        ...state.sectionColorNames,
                        tints: {
                            ...state.sectionColorNames.tints,
                            [hexColor]: colors
                        }
                    }
                }
                case 'shades': return {
                    ...state,
                    sectionColorNames : {
                        ...state.sectionColorNames,
                        shades: {
                            ...state.sectionColorNames.shades,
                            [hexColor]: colors
                        }
                    }
                }
            }
        },
        setPickColor: (state, action) => {
            state.pickColor = action.payload
        },
        setPaletteSection: (state, action) => {
            state.paletteSection = action.payload
        },
        setBookHexColor: (state, action) => {
            state.bookHexColor = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setPalette, setPickColor, setPaletteSection, setSectionColorNames, setBookHexColor } = DataSlice.actions

export default DataSlice.reducer
