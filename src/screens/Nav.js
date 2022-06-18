import React, { useContext, useState } from "react";
import { Platform, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import HomeScreen from "./Home";
import AboutScreen from "./About";
import TopMenu from '../components/TopMenu'
import { menuStyles } from "../styles/Menu";
import SettingsScreen from "./Settings";
import {navigationRef} from "../components/RootNavigation"

const STANDALONE = true

// Auth pages
const AuthStack = createNativeStackNavigator()

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: true}} />
      <AuthStack.Screen name="EnterCode" component={EnterCodeScreen} options={{headerShown: true}} />
    </AuthStack.Navigator>
  )
}

// Root app pages
const Tab = createBottomTabNavigator()

function TabStack() {
  return (
    <Tab.Navigator
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
      <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Icon name='home' color={color} size={size} />
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
        <View style={menuStyles.container}><TopMenu /></View>
        <TabStack />
      </NavigationContainer>
    )
}

export default NavStack
