import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const aspectRatio = windowHeight/windowWidth
const devWidthOffset = (aspectRatio > 1.6)? 100 : 200
const devHeightOffset = (aspectRatio > 1.6)? 225 : 350

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
        width: windowWidth - devWidthOffset,
        alignSelf: "center",
        textAlign: "center",
        fontStyle: "italic",
    },
    saveCard: {
        borderWidth: 1,
        borderColor: 'black',
        flex: 0,
        margin: 'auto',
        backgroundColor: 'white',
        justifyContent: 'center',
        maxHeight: 125,
        minWidth: "75%",
        // marginVertical: 350,
        alignSelf: 'center',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {width: 5, height: 10},
                shadowOpacity: 0.6,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
                shadowColor: 'black'
            }
        })
    },
    saveCardTitleText: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "bold",
        minWidth: "100%",
        // textTransform: "capitalize",
    },
    saveCardActionsContainer: {
        position: "absolute",
        // top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        flex: 0,
    },
    saveCardActionButton: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        width: 75,
        marginHorizontal: 25,
        justifyContent: 'space-between',
        backgroundColor: '#005a81',
        maxHeight: 32,
    },
    promptInput: {
        borderWidth: 1,
        borderColor: "darkgray",
        borderRadius: 3,
        width: '75%',
        alignSelf: "center",
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
        marginTop: 5,
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignSelf: "center",
        minHeight: windowHeight - devHeightOffset,
        // minHeight: windowHeight - 225,
        // minHeight: 475,
        // maxHeight: 600,
    },
    colorDetailsLeft: {

    },
    colorDetailRowSection: {
        width: '25%',
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        flex: 1,
        // height: 50,
        // borderEndColor: 'blue',
        // borderEndWidth: 0.25,
    },
    colorDetailRowText: {
        textAlign: "center",
        fontSize: 10,
        fontWeight: 'bold',
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
