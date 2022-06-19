import React from "react"
import { Text, View } from 'react-native'
import { globalStyles } from "../styles/Global";

function PaletteScreen({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Palette!!!</Text>
        </View>
    )
}

export default PaletteScreen

