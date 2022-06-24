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
    borderWidth: 1,
    maxHeight: 32,
  },
  pickerButtonText: {
    fontSize: 10,
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
  }

})

