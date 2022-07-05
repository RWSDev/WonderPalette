import React from "react";
import { Platform, StyleSheet } from "react-native";

export const paletteStyles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        maxHeight: 25,
        marginTop: 10,
    },
    titleText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    colorContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        minHeight: 75,
    },
    complimentary: {
        flex: 1
    },
    splitComplimentary: {
        flex: 1
    },
    analogous: {
        flex: 1
    },
    square: {
        flex: 1
    },
    triadic: {
        flex: 1
    },
    tetradic: {
        flex: 1
    },
    tints: {
        flex: 1
    },
    shades: {
        flex: 1
    },
    card: {
        // top: 50,
        paddingTop: 20,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: 'white',
        minHeight: '100%',
        maxHeight: '100%',
        paddingBottom: 60,
        position: "relative",
        // overflow:"scroll"
    },
    cardActionsContainer: {
        position: "absolute",
        // top: 0,
        left: 0,
        right: 0,
        bottom: -45,
        justifyContent: "center",
        alignItems: "center",
        flex: 0,
    },
    cardActionButton: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        width: 125,
        backgroundColor: '#005a81',
        maxHeight: 32,
    },
    subtitle: {
        paddingTop: 3,
        color: '#005a81',
        fontSize: 10,
        width: '75%',
        alignSelf: "center",
        textAlign: "center",
        fontStyle: "italic",
    },
    legend: {
        paddingTop: 3,
        color: 'gray',
        fontWeight: "bold",
        fontSize: 8,
        width: '75%',
        paddingBottom: 2,
        alignSelf: "center",
        textAlign: "center",
        fontStyle: "italic",
    },
    colorDetailsContainer: {
        marginTop: 20,
        width: '100%',
        flex: 1,
        // paddingTop: 20,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignSelf: "center",
        // height: "100%",
        minHeight: 600,
        maxHeight: 425,
    },
    colorDetailsLeft: {

    },
    colorDetailRowSection: {
        width: '25%',
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        flex: 1,
    },
    colorDetailRowText: {
        textAlign: "center",
        fontSize: 8,
    },
    circle: {
        width: 50,
        height: 50,
        transform: [{ rotate: "45deg" }],
        borderWidth: 1,
        borderColor: 'darkgray',
        // shadowColor: 'red',
        // shadowRadius: 20,
        borderRadius: 100,
        // elevation: 20,
        marginTop: 20,
    },
    diamond: {
        width: 55,
        height: 55,
        transform: [{ rotate: "45deg" }],
        borderWidth: 1,
        borderColor: 'darkgray',
        shadowColor: 'red',
        shadowRadius: 20,
        borderRadius: 0,
        // elevation: 20,
        alignSelf: "center",
        marginBottom: 'auto',
    },
});
