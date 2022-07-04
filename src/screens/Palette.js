import React, {Fragment, useEffect, useState} from "react"
import {ScrollView, Text, TouchableOpacity, View, Modal} from 'react-native'
import { globalStyles } from "../styles/Global";
import { paletteStyles} from "../styles/Palette";
import { getTextColorFromColor, hexToRGB, hexToHsl } from "../components/Palette"
import { useSelector, useDispatch } from 'react-redux'
import {setPaletteSection, setPickColor, setSectionColorNames, setBookHexColor } from '../redux/DataSlice'
import * as RootNavigation from "../components/RootNavigation"
import {Button, Card, Title} from "react-native-paper";
import { toHsv } from "react-native-color-picker";
import Icon from 'react-native-vector-icons/FontAwesome5'
import CardContent from "react-native-paper/src/components/Card/CardContent";
import {getColorBooksForColorQuery, getColorNamesQuery} from "../components/SqliteDB";


function PaletteScreen({ navigation }) {
    const palette = useSelector((state) => state.data.palette)
    const paletteSection = useSelector((state) => state.data.paletteSection)
    const sectionColorNames = useSelector((state) => state.data.sectionColorNames)
    const bookHexColor = useSelector((state) => state.data.bookHexColor)
    const pickColor = useSelector((state) => state.data.pickColor)
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    const [bookModalVisible, setBookModalVisible] = useState(false);
    const [colorBooks, setColorBooks] = useState([])
    const [colorNames, setColorNames] = useState(null)

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

    const getColorNames = () => {
        console.log('==================== palette ====================')
        console.log(palette)
        const { primary, hsl, hex, rgb, ...cleanData } = palette
        console.log('==================== cleanData ====================')
        console.log(cleanData)
        Object.keys(cleanData).map((section, index) => {
            Object.keys(cleanData[section]).map(idx => {
                useEffect(() => {
                    (async () => {
                        try {
                            let clrNames = []
                            clrNames = await getColorNamesQuery(cleanData[section][idx])
                            if (clrNames !== null) {
                                await dispatch(setSectionColorNames({secName: section, hexColor: cleanData[section][idx], colors: clrNames }))
                            }
                            await console.log('==================== section color names ====================')
                            await console.log(sectionColorNames)
                        } catch (e) {
                            console.log('======== error ==========')
                            console.log(e)
                        }
                    })();
                },[navigation.isFocused()])
            })
        })
    }
    getColorNames()

    const bookButtonPressed = async (hexColor) => {
        await setColorBooks( await getColorBooksForColorQuery(hexColor) )
        await dispatch(setBookHexColor(hexColor));
        await buildBook(hexColor);
    }

    const joinColorsForText = (colors, hexColor) => {
        console.log('==================== colors ====================')
        console.log(colors)
        if (colors) {
            colors = [...new Set(colors)]
        }
        const tmphsl = hexToHsl(hexColor).split(', ')
        const hsl = {
            h: parseInt(tmphsl[0]),
            s: parseInt(tmphsl[1]),
            l: parseInt(tmphsl[2])
        }
        if (colors) {
            let idx = null
            return (
                <Fragment>
                    <Icon
                        name="paint-roller"
                        color={getTextColorFromColor(hsl)}
                        size={22}
                        style={{top: 10, position: 'absolute'}}
                        onPress={() => { bookButtonPressed(hexColor); setModalVisible(false); setBookModalVisible(true); }} />
                </Fragment>
            )
        } else {
            return null
        }
    }

    const buildBook = () => {
        console.log(colorBooks)
        return (
            <Modal
                presentationStyle='pageSheet'
                animationType="fade"
                transparent={false}
                visible={bookModalVisible}
                onRequestClose={() => {
                    setBookModalVisible(!bookModalVisible);
                }}>
                <Card style={paletteStyles.card}>
                    <Card.Title
                        titleStyle={paletteStyles.titleText}
                        title={bookHexColor}
                        subtitle={`Conversion information for ${paletteSection} palette associated with your primary selected color`}
                        subtitleStyle={paletteStyles.subtitle}
                        subtitleNumberOfLines={2}
                    />
                    <Card.Content>
                        <View style={{ flex: 1, width: '100%'}}>
                            <View style={paletteStyles.colorDetailsContainer}>
                                <View style={[paletteStyles.circle, { flex: 0, alignSelf: 'center', backgroundColor: bookHexColor, height: 125, width: 125}]}>
                                </View>
                                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-evenly', maxHeight: 50}}>
                                    <View style={{alignSelf: 'flex-start', width: '50%'}}>
                                        <Text style={{fontWeight: 'bold'}}>Source / Brand</Text>
                                    </View>
                                    <View style={{alignSelf: 'flex-end', width: '50%'}}>
                                        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Color Name</Text>
                                    </View>
                                </View>
                                    { Object.values(colorBooks).map((book, index) => {
                                        console.log('book::::: ')
                                        return (
                                            <View key={index} style={{borderBottomColor: 'lightgray', borderBottomWidth: 1, flex: 0, flexDirection: 'row', justifyContent: 'space-evenly', maxHeight: 50}}>
                                                <View style={{alignSelf: 'flex-start', width: '45%'}}>
                                                    <Text style={{textAlign: 'left', fontSize: 12}}>{book.color_brand}</Text>
                                                </View>
                                                <View style={{alignSelf: 'flex-end', width: '45%'}}>
                                                    <Text style={{textAlign: 'center', fontSize: 12}}>{book.color_name}</Text>
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
                            onPress={() => { setBookModalVisible(!bookModalVisible); setModalVisible(true);}}
                            style={paletteStyles.cardActionButton}>
                            <Text style={globalStyles.primaryButtonText}>Close</Text>
                        </Button>
                    </Card.Actions>
                </Card>
            </Modal>


        )    }

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
                            subtitle={
                                <View>
                                    <Text style={paletteStyles.subtitle}>Conversion information for {paletteSection} palette based on your selected color</Text>
                                    <View style={{borderBottomColor: 'gray', borderBottomWidth: 1, paddingTop: 2}}></View>
                                    <Text style={paletteStyles.legend}><Icon name={'paint-roller'} size={12} />
                                        : Click to see brands and names for color
                                    </Text>
                                    <View style={{borderTopColor: 'gray', borderTopWidth: 1}}></View>
                                </View>
                            }
                            subtitleStyle={paletteStyles.subtitle}
                            subtitleNumberOfLines={1}
                        />
                        <Card.Content>
                            <View style={{width: '100%'}}>
                                <View style={paletteStyles.colorDetailsContainer}>
                                    {Object.keys(palette[paletteSection]).map((c, index) => {
                                        const hexColor = palette[paletteSection][c]
                                        return (
                                            <View key={index} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'stretch' }}>

                                                <TouchableOpacity
                                                    key={50 + index}
                                                    style={[paletteStyles.colorDetailRowSection]}
                                                    onLongPress={async () => {
                                                        setModalVisible(!modalVisible);
                                                        await dispatch(setPickColor(hexColor));
                                                        RootNavigation.navigate('Picker');
                                                    }}
                                                >
                                                    <View style={[paletteStyles.diamond, {backgroundColor: hexColor}]}>
                                                    </View>
                                                    { joinColorsForText(sectionColorNames[paletteSection][hexColor], hexColor) }
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
            return(
                <Fragment key={999}>
                    <View style={paletteStyles.titleContainer}>
                        <Text style={paletteStyles.titleText}>
                            Tints &nbsp;
                            <Icon
                                name="list-alt"
                                color={'darkgray'}
                                size={18}
                                style={{fontStyle: 'italic'}}
                                onPress={() => { dispatch(setPaletteSection(key)); buildCard(key); setModalVisible(true)}} />
                        </Text>

                    </View>
                    <View style={paletteStyles.colorContainer}>
                        {Object.keys(cleanData['tints']).map((c, index) => {
                            const hexColor = cleanData['tints'][c]
                            const idxKey = `${index}`
                            return (
                                <TouchableOpacity
                                    key={idxKey}
                                    style={{flex: 1, width: 100 / cleanData['tints'].length}}
                                    onPress={() => { dispatch(setPaletteSection('tints')); buildCard('tints'); setModalVisible(true)}}
                                    onLongPress={() => {
                                        dispatch(setPickColor(hexColor));
                                        RootNavigation.navigate('Picker');
                                    }}
                                >
                                    <View style={[paletteStyles.circle, { flex: 0, alignSelf: 'center', backgroundColor: hexColor}]}>
                                    </View>

                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </Fragment>

            )
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
                                    style={{flex: 1, width: 100 / cleanData['shades'].length}}
                                    onPress={() => { dispatch(setPaletteSection('shades')); buildCard('shades'); setModalVisible(true)}}
                                    onLongPress={() => {
                                        dispatch(setPickColor(hexColor));
                                        RootNavigation.navigate('Picker');
                                    }}
                                >
                                    <View style={[paletteStyles.circle, { flex: 0, alignSelf: 'center', backgroundColor: hexColor}]}>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </Fragment>

            )
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
                                    style={{flex: 0, width: 100 / cleanData[key].length}}
                                    onPress={() => { dispatch(setPaletteSection(key)); buildCard(key); setModalVisible(true)}}
                                    onLongPress={() => {
                                        dispatch(setPickColor(hexColor));
                                        RootNavigation.navigate('Picker');
                                    }}
                                >
                                    <View style={[paletteStyles.circle, { height: 75, width: 75, flex: 0, alignSelf: 'center', backgroundColor: hexColor}]}>
                                    </View>
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
                {buildBook()}
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

