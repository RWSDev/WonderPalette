import React from 'react';
import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/CssExports'

export const authStyles = StyleSheet.create({
  switchView: {
    position: "absolute",
    bottom: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  switchText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    paddingBottom: 15,
  },
  errorContainer: {
    paddingTop: 10,
    // borderWidth: 3,
    // borderColor: 'black',
    minHeight: 0,
    marginBottom: 25
  },
  errorMessage: {
    color: '#ff0000',
    fontStyle: "italic",
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
  infoText: {
    color: COLORS.primary,
    fontStyle: "italic",
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 12,
    fontWeight: "bold",
  }
});
