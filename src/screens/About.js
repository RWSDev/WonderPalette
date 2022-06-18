import React from "react"
import { Text, View } from 'react-native'
import { globalStyles } from "../styles/Global";

function AboutScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
        <Text style={globalStyles.testText}>About!!!</Text>
    </View>
  )
}

export default AboutScreen

