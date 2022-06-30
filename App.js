/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import type {Node} from 'react';
import { SafeAreaView } from 'react-native';
import NavStack from "./src/screens/Nav";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { store } from './src/redux/Store'
import { Provider } from 'react-redux'
import SQLite from 'react-native-sqlite-storage';
// Add this code on your app.js
SQLite.DEBUG(false);
global.db = SQLite.openDatabase({
      name: 'WonderPaletteDB.sqlite',
      createFromLocation: 1,
    },
    () => successToOpenDb(),
    () => failToOpenDb(),
)
const successToOpenDb = () => {
  // console.log('db successfully opened')
}
const failToOpenDb = () => {
  console.log('failed to open db')
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'steelblue',
    accent: '#03dac6',
    background: 'white',
    surface: 'green',
    error: 'red',
    onSurface: 'yellow',
    backdrop: 'gold',
    placeholder: 'darkgray'
  },
};
const App: () => Node = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <NavStack />
        </Provider>
      </PaperProvider>
    </SafeAreaView>
  );
};

export default App;
