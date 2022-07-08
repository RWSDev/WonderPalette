import React, {useState, memo} from "react"
import {Text, TouchableOpacity, View} from 'react-native'
import { globalStyles } from "../styles/Global";
import { useSelector, useDispatch } from 'react-redux'
import { List }from 'react-native-paper'
import { setPalette } from "../redux/DataSlice";
import * as RootNavigation from "../components/RootNavigation";
import {processColor} from "../components/Palette";

function SavedPalettesScreen({ navigation }) {
    const savedPalettes = useSelector((state) => state.data.savedPalettes)
    const dispatch = useDispatch()
    const [selectedPalette, setSelectedPalette] = useState({})

    const loadSavedPalette = async (newPalette) => {
        console.log(newPalette)
        procColor(newPalette.primary)
        // RootNavigation.navigate('Palette')
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
            <List.Section>
                {
                    Object.keys(savedPalettes).map(key => {
                        return(
                            Object.keys(savedPalettes[key]).map(name => {
                                const color = savedPalettes[key][name]
                                console.log(name)
                                console.log(color)
                                return (
                                    <TouchableOpacity key={name} onPress={() => { procColor(color); }}>
                                        <List.Item key={key} title={name} left={
                                            () => <View key={100 + key} style={{backgroundColor: color, height: 50, width: 50, borderRadius: 50}}></View>}
                                        />
                                    </TouchableOpacity>
                                )
                            })
                        )
                    })
                }
            </List.Section>
        </View>
    )
}

export default memo(SavedPalettesScreen)

