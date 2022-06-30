import React, { useContext, useEffect, useState } from "react";
import {View, ScrollView, Text} from 'react-native';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {Button, Avatar} from 'react-native-paper';
import { Context as ApiContext } from '../api/ApiContext'
import { authStyles } from '../styles/Auth'
import { navStyles } from '../styles/Nav'
import { globalStyles } from "../styles/Global";
import { useIsFocused } from "@react-navigation/native";

export default function SignupScreen({ navigation }) {
  const isFocused = useIsFocused();
  useEffect(() => {}, [isFocused]);
  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: '',

    },
    mode: 'onChange',
  });


  const { state, signup } = useContext(ApiContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = data => {
    console.log('form data', data);
    setEmail(data.email)
    setPassword(data.password)
    signup({ email: data.email, password: data.password })
  }

  const displayErrors = () => {
    const errors = []
    if (state.errorMessage !== null && Object.prototype.toString.call(state.errorMessage) === '[object Array]') {
      console.log('is array')
      state.errorMessage.forEach((err, index) => {
        errors.push(<Text key={index} style={authStyles.errorMessage}> {err.charAt(0).toUpperCase() + err.slice(1)} </Text>)
      })
      console.log(state.errorMessage)
      return errors
    } else if (state.errorMessage) {
      return <Text style={authStyles.errorMessage}>{state.errorMessage}</Text>
    }
  }

  const clearErrors = () => {
    console.log('clearing errors!!!!')
    state.errorMessage = ''
  }

  return (
    <View style={navStyles.containerStyle}>
      <View style={navStyles.avatarContainer}>
        <Avatar.Image size={200} style={navStyles.avatar} source={require('../images/avatar.png')} />
      </View>
      <ScrollView contentContainerStyle={navStyles.scrollViewStyle}>
        <Text style={navStyles.headingStyle}>Create an Account</Text>
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
                label: 'Password',
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
          Submit
        </Button>
        <View style={authStyles.switchView}>
          <Text style={authStyles.switchText}>Already have an account?</Text>
          <Button
            raised
            theme={{ roundness: 5 }}
            mode={'contained'}
            style={globalStyles.button}
            onPress={() => { navigation.goBack(); clearErrors() }}>
            Sign In
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

