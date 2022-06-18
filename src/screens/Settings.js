import React from "react"
import { Text, View } from 'react-native'
import { globalStyles } from "../styles/Global";

function SettingsScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
        <Text style={globalStyles.testText}>Settings!!!</Text>
    </View>
  )
}

export default SettingsScreen

