import React from "react";
import { Platform, StyleSheet } from "react-native";

export const navStyles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    marginTop: 40,
    maxHeight: 40,
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  containerStyle: {
    flex: 1,
    width: '100%',
    alignSelf: "center",
    backgroundColor: 'white'
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  headingStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40,
  },
});
