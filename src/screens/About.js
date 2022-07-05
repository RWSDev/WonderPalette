import React from "react"
import { Text, View } from 'react-native'
import { globalStyles } from "../styles/Global";
import packageJson from '../../package.json';

function AboutScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
        <Text style={globalStyles.headerText}>Wonder Palette <Text style={{color: 'steelblue', fontSize: 15, lineHeight: 37}}>v{packageJson.version}</Text></Text>
    </View>
  )
}

export default AboutScreen

