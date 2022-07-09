import React, {useState, memo} from "react"
import {Text, TouchableOpacity, View, Alert, ScrollView} from 'react-native'
import { globalStyles } from "../styles/Global";
import { useSelector, useDispatch } from 'react-redux'
import { List }from 'react-native-paper'
import {loadSavedPalettes, setPalette} from "../redux/DataSlice";
import {processColor} from "../components/Palette";
import Icon from 'react-native-vector-icons/FontAwesome5'
import {deletePalette, getPalettes, savePalette} from "../components/SqliteDB";
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

function SavedPalettesScreen({ navigation }) {
    const savedPalettes = useSelector((state) => state.data.savedPalettes)
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    useFocusEffect(() => {
        if (!isFocused) {
            navigation.pop()
        }
    })


    const loadSavedPalette = async (newPalette) => {
        console.log(newPalette)
        procColor(newPalette.primary)
    }

    const loadPalettes = async() => {
        const palettes = await getPalettes()
        await dispatch(loadSavedPalettes(palettes))
        navigation.navigate('Saved Palettes')
        // RootNavigation.navigate('Saved Palettes')
    }

    const removeSavedPalette = async(palette) => {
        Alert.alert(
            "Confirm",
            "Are you sure you wish to permanently delete: " + palette.name,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Delete", onPress: async () => {
                        console.log("OK Pressed");
                        await deletePalette(palette.id);
                        await loadPalettes()
                    }
                }
            ]
        );
    }

    const procColor = async (color) => {
        if (color.length === 7) {
            console.log('setting palette')
            const colorData = await processColor(color);
            await dispatch(setPalette(colorData));
            navigation.goBack(color)
        }
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Wonder Palette</Text>
            <ScrollView>
                <List.Section>
                    {
                        Object.keys(savedPalettes).map(key => {
                            const palette = savedPalettes[key]
                            console.log('==================== palette is::::: ====================')
                            console.log(palette)
                            // const color = savedPalettes[key][name]
                            // console.log(name)
                            // console.log(color)
                            return (
                                <TouchableOpacity key={key} onPress={() => { procColor(palette.color); }}>
                                    <List.Item key={key} title={palette.name} left={
                                        () =>
                                            <View key={100 + key} style={{
                                                backgroundColor: palette.color,
                                                height: 50,
                                                width: 50,
                                                borderRadius: 50
                                            }} />
                                    }
                                               right={
                                                   () =>
                                                       <View style={{alignItems: 'center'}}>
                                                           <Icon
                                                               name="trash"
                                                               color="red"
                                                               size={22}
                                                               style={{top: 10, position: 'absolute', right: 10}}
                                                               onPress={() => {removeSavedPalette(palette)}}
                                                           />
                                                       </View>
                                               }
                                    />
                                </TouchableOpacity>
                            )
                        })
                    }
                </List.Section>
            </ScrollView>
        </View>
    )
}

export default memo(SavedPalettesScreen)

