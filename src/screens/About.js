import React from "react"
import {Image, Text, View} from 'react-native'
import { globalStyles } from "../styles/Global";
import packageJson from '../../package.json';

function AboutScreen({ navigation }) {
  return (
    <View style={[globalStyles.container, {flex: 1, height: "100%", width: '100%', backgroundColor: 'black'}]}>
        <Text style={[globalStyles.headerText, {color: 'white'}]}>Wonder Palette <Text style={{color: 'steelblue', fontSize: 15, lineHeight: 37}}>v{packageJson.version}</Text></Text>
        <Image source={require('../images/logo.png')} style={globalStyles.aboutLogo} />
        <Text style={globalStyles.disclaimer}>
            DISCLAIMER{'\n'}
            All the colorbooks and color names in this app are the property of their respective owners. This is not an official app or project for any book vendor, and neither they, nor DevGW, are liable for how it is used. This app and the corresponding color information is offered as-is, in order to help make these color books and color names more accessible for a wider variety of users and uses.
        </Text>
    </View>
  )
}

export default AboutScreen

