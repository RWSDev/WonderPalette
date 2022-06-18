import React, { useContext, useEffect } from "react";
import { Text, View } from 'react-native'
import { globalStyles } from "../styles/Global";

function HomeScreen({ navigation }) {

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.testText}>Welcome</Text>
    </View>
  )
}

export default HomeScreen
