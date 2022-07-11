import React from "react";
import { Platform, StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: 'white',
    zIndex: 1
  },
  headerText: {
    paddingTop: 25,
    color: '#000000',
    fontSize: 24,
    textAlign: "center"
  },
  subheaderText: {
    paddingTop: 3,
    color: '#005a81',
    fontSize: 10,
    textAlign: "center",
    fontStyle: "italic",
  },
  inputContainer: {
    flex: 1,
    // maxHeight: 175,
    width: '90%',
    alignSelf: "center",
    // marginBottom: 75,
  },
  pickerButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    maxHeight: 75,
    width: '75%',
    alignSelf: "center",
    // marginBottom: 75,
  },
  pickerButton: {
    borderRadius: 10,
    width: 125,
    backgroundColor: 'lightgray',
    borderWidth: 2,
    maxHeight: 32,
  },
  pickerButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: "capitalize",
  },
  primaryButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    width: 125,
    backgroundColor: '#005a81',
    maxHeight: 32,
  },
  primaryButtonText: {
    fontSize: 10,
    color: 'white',
    textTransform: "capitalize",
  },
  aboutLogo: {
    flex: 0,
    marginTop: 25,
    aspectRatio: 1,
    width: '80%',
    alignSelf: "center",
    height: undefined,
  },
  disclaimer: {
    color: 'white',
    textAlign: "center",
    fontSize: 12,
    marginTop: 50,
  }

})

