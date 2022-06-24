import React, { useContext, useState } from "react";
import { Platform, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import PickerScreen from "./Picker";
import AboutScreen from "./About";
import TopMenu from '../components/TopMenu'
import { menuStyles } from "../styles/Menu";
import SettingsScreen from "./Settings";
import PaletteScreen from "./Palette"
import {navigationRef} from "../components/RootNavigation"

// Root app pages
const Tab = createBottomTabNavigator()

function TabStack() {
  return (
      <Tab.Navigator  backBehaviour = "initialRoute"
          screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "#80b2ea",
              tabBarInactiveTintColor: 'gray',
              tabBarShowLabel: true,
              tabBarStyle: {
                  paddingVertical: Platform.OS === 'ios' ? 10 : 0,
                  height: 50,
                  backgroundColor: 'black'
              }
          }}>
          <Tab.Screen name='Picker' component={PickerScreen} options={{
              tabBarLabel: 'Picker',
              tabBarIcon: ({ color, size }) => (
                  <Icon name='eye-dropper' color={color} size={size} />
              )
          }} />
          <Tab.Screen name='Palette' component={PaletteScreen} options={{
              tabBarLabel: 'Palette',
              tabBarIcon: ({ color, size }) => (
                  <Icon name='palette' color={color} size={size} />
              )
          }} />
          <Tab.Screen name='About' component={AboutScreen} options={{
              tabBarLabel: 'About',
              tabBarIcon: ({ color, size }) => (
                  <Icon name='info' color={color} size={size} />
              )
          }} />
          <Tab.Screen name="Settings" component={SettingsScreen} options={{
              headerShown: true,
              tabBarButton: () => null,
              tabBarVisible: false,
          }} />
      </Tab.Navigator>
  )
}

const NavStack = props => {
    return (
      <NavigationContainer ref={navigationRef}>
        {/*<View style={menuStyles.container}><TopMenu /></View>*/}
        <TabStack />
      </NavigationContainer>
    )
}

export default NavStack
