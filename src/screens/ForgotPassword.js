import React, { useContext, useEffect, useState } from "react";
import {View, ScrollView, Text} from 'react-native';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm, SetFocusOptions} from 'react-hook-form';
import {Button, Avatar} from 'react-native-paper';
import { Context as ApiContext } from '../api/ApiContext'
import { authStyles } from '../styles/Auth'
import { navStyles} from '../styles/Nav.js'
import { globalStyles} from "../styles/Global";
import { useIsFocused } from "@react-navigation/native";

export default function ForgotPasswordScreen({ navigation }) {

  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      errorMessage: ''
    },
    mode: 'onChange',
  });

  const isFocused = useIsFocused();
  useEffect(() => {}, [isFocused]);
  const { state, resetPassword } = useContext(ApiContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (state.screen === "EnterCode") {
      navigation.replace("EnterCode")
    }
  }, [state.screen]);

  const onSubmit = data => {
    console.log('form data', data);
    setEmail(data.email)
    resetPassword({ email: data.email })
  }

  const clearScreen = () => {
    state.screen = null
  }


  const displayErrors = () => {
    const errors = []
    if ( state.errorMessage !== null && Object.prototype.toString.call(state.errorMessage) === '[object Array]') {
      console.log('is array')
      state.errorMessage.forEach((err, index) => {
        errors.push(<Text key={index} style={authStyles.errorMessage}> { err.charAt(0).toUpperCase() + err.slice(1) } </Text>)
      })
      return errors
    } else if (state.errorMessage) {
      return <Text style={authStyles.errorMessage}>{ state.errorMessage.charAt(0).toUpperCase() + state.errorMessage.slice(1) }</Text>
    }
  }

  return (
    <View style={navStyles.containerStyle}>
      <View style={navStyles.avatarContainer}>
        <Avatar.Image size={200} style={navStyles.avatar} source={require('../images/avatar.png')} />
      </View>
      <ScrollView contentContainerStyle={navStyles.scrollViewStyle}>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: 'email',
              name: 'email',

              rules: {
                required: {
                  value: true,
                  message: 'Email is required',
                },
              },
              textInputProps: {
                label: 'Email',
                underlineColor: 'red',
              },
            },
          ]}
        />
        <View style={authStyles.errorContainer}>
          { displayErrors() }
        </View>
        <Text style={authStyles.infoText}>Please enter your email address and we will email you a code to reset your password.</Text>
        <Button
          raised
          theme={{ roundness: 5 }}
          mode={'contained'}
          style={globalStyles.button}
          onPress={handleSubmit(onSubmit)}>
          Reset
        </Button>
        <Button style={{marginTop: 15}} onPress={() => {clearScreen(); navigation.push('EnterCode')}}><Text style={{fontStyle: "italic"}}>I already have a code</Text></Button>
      </ScrollView>
    </View>
  );
}


