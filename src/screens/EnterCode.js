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

export default function EnterCodeScreen({ navigation }) {

  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      code: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    },
    mode: 'onChange',
  });

  const isFocused = useIsFocused();
  useEffect(() => {}, [isFocused]);
  const { state, resetPasswordWithToken } = useContext(ApiContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (state.screen === "Login") {
      navigation.replace("Login")
    }
  }, [state.screen]);

  const onSubmit = data => {
    console.log('form data', data);
    setEmail(data.email)
    resetPasswordWithToken({ code: data.code, password: data.password, confirmPassword: data.confirmPassword })
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
              type: 'text',
              name: 'code',

              rules: {
                required: {
                  value: true,
                  message: 'Code is required',
                },
              },
              textInputProps: {
                label: 'Code',
                underlineColor: 'red',
              },
            },
            {
              type: 'password',
              name: 'password',

              rules: {
                required: {
                  value: true,
                  message: 'Password is required',
                },
              },
              textInputProps: {
                label: 'New Password',
                underlineColor: 'red',
              },
            },
            {
              type: 'password',
              name: 'confirmPassword',

              rules: {
                required: {
                  value: true,
                  message: 'Confirm Password is required',
                },
              },
              textInputProps: {
                label: 'Confirm New Password',
                underlineColor: 'red',
              },
            },
          ]}
        />
        <View style={authStyles.errorContainer}>
          { displayErrors() }
        </View>
        <Button
          raised
          theme={{ roundness: 5 }}
          mode={'contained'}
          style={globalStyles.button}
          onPress={handleSubmit(onSubmit)}>
          Reset
        </Button>
      </ScrollView>
    </View>
  );
}


