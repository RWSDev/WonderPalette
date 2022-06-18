/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Fragment } from "react";
import type {Node} from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import NavStack from "./src/screens/Nav";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

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
        <NavStack />
      </PaperProvider>
    </SafeAreaView>
  );
};

export default App;
