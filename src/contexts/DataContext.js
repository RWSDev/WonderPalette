import React from "react";
import CreateDataContext from "./CreateDataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const dataReducer = (state, action) => {
    switch (action.type) {
        case 'add_error': {
            return { ...state, errorMessage: action.payload };
        }
        case 'clear_error': {
            return { ...state, errorMessage: null }
        }
        case 'set_data': {
            // storeData(action.payload)
            return { ...state, data: action.payload }
        }
        default: {
            return state;
        }
    }
};

const storeData = async (value) => {
    try {
        console.log('storing data....');
        const jsonValue = JSON.stringify(value);
        console.log(jsonValue);
        await AsyncStorage.setItem('@data', jsonValue)
    } catch (e) {
        // saving error
        console.log('error storing data: ');
        console.log(e);
    }
}

const saveData = (dispatch) => {
    console.log('save data hit ')
    return async ({ data }) => {
        console.log('in return')
        await dispatch({ type: 'set_data', payload: data})
        console.log('trying')
    }
}

const getData = async (dispatch) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@data')
        data = jsonValue != null ? JSON.parse(jsonValue) : null
        if (data) {
            console.log('data found');
            console.log(data);
            await dispatch({type : 'set_data', payload : data});
            return true;
        }
        else {
            console.log('no data');
            return false;
        }
    } catch (e) {
        // error reading value
        console.log('error getting data');
        console.log(e);
    }
}


const clearErrors = (dispatch) => {
    dispatch({ type: 'add_error', payload: null})
}


export const { Provider, Context } = CreateDataContext(
    dataReducer,
    { saveData },
    { },
);
