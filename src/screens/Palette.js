import React, {Fragment, useState} from "react"
import {ScrollView, Text, TouchableOpacity, View, Modal} from 'react-native'
import { globalStyles } from "../styles/Global";
import { paletteStyles} from "../styles/Palette";
import { getTextColorFromColor, hexToRGB, hexToHsl } from "../components/Palette"
import { useSelector, useDispatch } from 'react-redux'
import {setPaletteSection, setPickColor} from '../redux/DataSlice'
import * as RootNavigation from "../components/RootNavigation"
import {Button, Card, Title} from "react-native-paper";
import { toHsv } from "react-native-color-picker";
import Icon from 'react-native-vector-icons/FontAwesome5'
import CardContent from "react-native-paper/src/components/Card/CardContent";

function PaletteScreen({ navigation }) {
    const palette = useSelector((state) => state.data.palette)
    const paletteSection = useSelector((state) => state.data.paletteSection)
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);

    // console.log(palette)

    const roundHSV = (color) => {
        const hsv = toHsv(color)
        let hsvValues = Object.values(hsv)
        hsvValues.forEach((v, index) => {
            if (!Number.isInteger(v)) {
                hsvValues[index] = v.toFixed(2)
            }
        })
        return hsvValues.join(',')
    }

    const buildCard = () => {
        if (palette[paletteSection]){
            return (
                <Modal
                    presentationStyle='pageSheet'
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}>
                    <Card style={paletteStyles.card}>
                        <Card.Title
                            titleStyle={paletteStyles.titleText}
                            title={paletteSection}
                            subtitle={`Conversion information for ${paletteSection} palette associated with your primary selected color`}
                            subtitleStyle={paletteStyles.subtitle}
                            subtitleNumberOfLines={2}
                            // right={(props) =>
                            //     <Icon name="window-close" color={'red'} size={20} onPress={() => setModalVisible(!modalVisible)} />
                            // }
                        />
                        <Card.Content>
                            <View style={{width: '100%'}}>
                                <View style={paletteStyles.colorDetailsContainer}>
                                    {Object.keys(palette[paletteSection]).map((c, index) => {
                                        const hexColor = palette[paletteSection][c]
                                        return (
                                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                                <TouchableOpacity
                                                    key={index}
                                                    style={[paletteStyles.colorDetailRowSection, {backgroundColor: hexColor}]}
                                                    onLongPress={() => {
                                                        setModalVisible(!modalVisible);
                                                        dispatch(setPickColor(hexColor));
                                                        RootNavigation.navigate('Picker');
                                                    }}
                                                >
                                                </TouchableOpacity>
                                                <View key={100 + index} style={paletteStyles.colorDetailRowSection}>
                                                    <Text style={paletteStyles.colorDetailRowText}>HEX{'\n'} {hexColor}</Text>
                                                </View>
                                                <View key={200 + index} style={paletteStyles.colorDetailRowSection}>
                                                    <Text style={paletteStyles.colorDetailRowText}>RGB{'\n'} {hexToRGB(hexColor)}</Text>
                                                </View>
                                                <View key={300 + index} style={paletteStyles.colorDetailRowSection}>
                                                    <Text style={paletteStyles.colorDetailRowText}>HSL{'\n'} {hexToHsl(hexColor)}</Text>
                                                </View>
                                                <View key={400 + index} style={paletteStyles.colorDetailRowSection}>
                                                    <Text style={paletteStyles.colorDetailRowText}>HSV{'\n'} {roundHSV(hexColor)}</Text>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>

                        </Card.Content>
                        <Card.Actions style={paletteStyles.cardActionsContainer}>
                            <Button
                                mode={'outlined'}
                                buttonColor={palette.pickColor}
                                onPress={() => setModalVisible(!modalVisible)}
                                style={paletteStyles.cardActionButton}>
                                <Text style={globalStyles.primaryButtonText}>Close</Text>
                            </Button>
                        </Card.Actions>
                    </Card>
                </Modal>


            )
        }
    }

    const buildView = () => {
        /// clean up data object and remove unnecessary properties
        let { primary, hsl, hex, rgb, ...cleanData } = palette
        if (palette.primary === "#000000") {
            alert('primary is black')
        } else if (palette.primary === "#ffffff") {
            return(
                <Fragment key={999}>
                    <View style={paletteStyles.titleContainer}>
                        <Text style={paletteStyles.titleText}>
                            Shades &nbsp;
                            <Icon
                                name="list-alt"
                                color={'darkgray'}
                                size={18}
                                style={{fontStyle: 'italic'}}
                                onPress={() => { dispatch(setPaletteSection(key)); buildCard(key); setModalVisible(true)}} />
                        </Text>

                    </View>
                    <View style={paletteStyles.colorContainer}>
                        {Object.keys(cleanData['shades']).map((c, index) => {
                            const hexColor = cleanData['shades'][c]
                            const idxKey = `${index}`
                            return (
                                <TouchableOpacity
                                    key={idxKey}
                                    style={{flex: 1, backgroundColor: hexColor, width: 100 / cleanData['shades'].length}}
                                    onPress={() => { dispatch(setPaletteSection('shades')); buildCard('shades'); setModalVisible(true)}}
                                    onLongPress={() => {
                                        dispatch(setPickColor(hexColor));
                                        RootNavigation.navigate('Picker');
                                    }}
                                >
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </Fragment>

            )
        } else {
            alert('primary is: ' + cleanData.primary)
        }
        return (
            Object.keys(cleanData).map((key, idx) => {
                let paletteArray = []
                paletteArray = cleanData[key]
                return (
                    <Fragment key={idx}>
                        <View style={paletteStyles.titleContainer}>
                            <Text style={paletteStyles.titleText}>
                                {key} &nbsp;
                                <Icon
                                    name="list-alt"
                                    color={'darkgray'}
                                    size={18}
                                    style={{fontStyle: 'italic'}}
                                    onPress={() => { dispatch(setPaletteSection(key)); buildCard(key); setModalVisible(true)}} />
                            </Text>

                        </View>
                        <View style={paletteStyles.colorContainer}>
                        {Object.keys(cleanData[key]).map((c, index) => {
                            const hexColor = cleanData[key][c]
                            const idxKey = `${idx}${index}`
                            return (
                                <TouchableOpacity
                                    key={idxKey}
                                    style={{flex: 1, backgroundColor: hexColor, width: 100 / cleanData[key].length}}
                                    onPress={() => { dispatch(setPaletteSection(key)); buildCard(key); setModalVisible(true)}}
                                    onLongPress={() => {
                                        dispatch(setPickColor(hexColor));
                                        RootNavigation.navigate('Picker');
                                    }}
                                >
                                </TouchableOpacity>
                            )
                        })}
                        </View>
                    </Fragment>
                )
            })
        )
    }
    if (Object.keys(palette).length === 0) {
        return(
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={[globalStyles.headerText, {fontSize: 18, marginBottom: 20}]}>You have not selected a color from the Picker</Text>
                <Button style={{width: '50%', alignSelf: 'center', borderRadius: 10}} mode="contained" onPress={() => RootNavigation.navigate('Picker')}>Pick a Color</Button>
            </View>
            )
    } else {
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                {buildCard()}
                <View style={globalStyles.container}>
                    <View style={{flex: 1, maxHeight: 175}}>
                        <Text style={globalStyles.headerText}>Palette for
                            <Text style={{backgroundColor: palette.primary, color: getTextColorFromColor(palette.hsl)}}>{palette.primary}</Text>
                        </Text>
                        <Text style={globalStyles.subheaderText}>Touch a color palette to view its details</Text>
                        <Text style={globalStyles.subheaderText}>Long touch a color to load color in picker</Text>
                    </View>
                    {buildView()}
                </View>
            </ScrollView>
        )
    }


}

export default PaletteScreen

