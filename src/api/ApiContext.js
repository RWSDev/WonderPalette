import CreateDataContext from "../contexts/CreateDataContext";
import Api from './Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error': {
      return { ...state, errorMessage: action.payload };
    }
    case 'clear_error': {
      return { ...state, errorMessage: null }
    }
    case 'doStoreCredentials': {
      console.log('doing store creds....');
      credentials: action.payload;
      storeCredentials(credentials);
      // whenLoggedIn();
      return { ...state, credentials: action.payload, isLoggedIn: true };
    }
    case 'set_credentials': {
      console.log('setting credentials....');
      return { ...state, credentials: action.payload, isLoggedIn: true };
    }
    case 'doInvalidLogin': {
      console.log('received dispatch');
      return { ...state, credentials: action.payload, isLoggedIn: false };
    }
    case 'do_next_screen': {
      console.log(`loading screen ${action.payload}`)
      return { ...state, screen: action.payload }
    }
    case 'setColors': {
      // console.log('setting colors')
      return { ...state, colors: action.payload }
    }
    default: {
      return state;
    }
  }
};

const storeCredentials = async (value) => {
  try {
    console.log('storing credentials....');
    const jsonValue = JSON.stringify(this.credentials);
    console.log(jsonValue);
    await AsyncStorage.setItem('@credentials', jsonValue)
  } catch (e) {
    // saving error
    console.log('error storing data: ');
    console.log(e);
  }
}

const invalidLogin = async (dispatch) => {
  if (this.isLoggedIn || (this.credentials && this.credentials.token)) {
    credentials = this.credentials;
    credentials.token = null;
    // set stored credentials {}
    console.log('clearing asyncStorage credentials');
    const jsonValue = JSON.stringify(credentials);
    await AsyncStorage.setItem('@credentials', jsonValue)
    console.log('setting state credentials {} and isLoggedIn to false');
    await dispatch({ type: 'doInvalidLogin', payload: credentials });
    clearHeader();
  }
}

const hasToken = async (dispatch) => {
  try {

    if (this.credentials && this.credentials.token.length > 0) {
      setHeader(this.credentials.token);
      return true;
    } else {
      const jsonValue = await AsyncStorage.getItem('@credentials')
      credentials = jsonValue != null ? JSON.parse(jsonValue) : null
      if (credentials && credentials.token.length > 0) {
        console.log('token found');
        setHeader(credentials.token);
        console.log(credentials.token);
        await dispatch({ type: 'set_credentials', payload: credentials });
        return true;
      } else {
        console.log('no token here');
        return false;
      }
    }
  } catch(e) {
    // error reading value
    console.log('error checking for token');
    console.log(e);
  }
}

const setHeader = (token) => {
  console.log('setting header');
  Api.baseUrl.defaults.headers.common['Authorization'] = token;
  Api.apiUrl.defaults.headers.common['Authorization'] = token;
}
const clearHeader = (token) => {
  console.log('clearing token from header');
  Api.baseUrl.defaults.headers.common['Authorization'] = null;
}

const signin = (dispatch) => {
  console.log('signin ran')
  user = {};
  return async ({ email, password }) => {
    console.log('signin ran again')
    // make api request to signin
    try {
      user = {
        email,
        password
      };
      const response = await Api.baseUrl.post(
        '/users/sign_in',
        {
          user,
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(response.data)
      if (response.data.errors) {
        var errArray = new Array()
        Object.entries(response.data.errors).forEach(entry => {
          const [key, value] = entry;
          errArray.push(`${key}: ${value}`)
        });
        console.log("errArray is: ")
        console.log(errArray)
        dispatch({ type: 'add_error', payload: errArray})
        return
      }
      console.log(response.headers['authorization']);
      credentials = {
        token: response.headers['authorization'],
        email: email,
        password: password,
        user: response.data.user
      };
      dispatch({ type: 'clear_error'})
      setHeader(response.headers['authorization']);
      await dispatch({ type: 'doStoreCredentials', payload: credentials });
    } catch (err) {
      // console.error("Error response:");
      // console.error(err.response.data);
      // console.error(err.response.status);
      // console.error(err.response.headers);
      await dispatch({ type: 'add_error', payload: err.response.data.error })
    }
  }
}

// const clearErrors = (dispatch => {
//   dispatch({ type: 'clear_error'})
// })

const signout = (dispatch) => {
  return () => {
    // invalidate login and remove credentials
    console.log('signing out')
    invalidLogin(dispatch);
  }
}

const getColors = (dispatch) => {
    return async () => {
      try {
        const response = await Api.apiUrl.get('/colors/index',{})
        // response.data = body of response
        // response.data.colors = colors array returned from server
        // response.headers = headers of response
        // console.log('we have a response')
        // console.log(response.data)
        await dispatch({ type: 'setColors', payload: response.data.colors})
      } catch (err) {
        if (err.response.status === 401) {
          invalidLogin(dispatch)
          // console.error(err.response.data);
          // console.error(err.response.status);
          // console.error(err.response.headers);
          await dispatch({ type: 'add_error', payload: err.response.data.error })
        } else {
          console.log('hit an error getting colors')
          console.log(err)
          console.error("Error response:");
          alert(err.response.data)
          console.error(err.response.data);
          console.error(err.response.status);
          console.error(err.response.headers);
        }
    }
  }
}

const resetPassword = (dispatch) => {
  user = {};
  return async ({ email}) => {
    try {
      user = {
        email
      }
      const response = await Api.baseUrl.post(
        '/users/password',
        {
          user,
          // commit: "Send me reset password instructions"
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      )
      console.log(response.data)
      await dispatch({ type: 'do_next_screen', payload: "EnterCode"})
      await dispatch({ type: 'add_error', payload: null })
    } catch (err) {
      console.error("Error response:");
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      if (err.response.data.errors) {
        console.log(err.response.data.errors)
        let errArray = new Array()
        Object.entries(err.response.data.errors).forEach(entry => {
          const [key, value] = entry;
          errArray.push(`${key}: ${value}`)
        });
        console.log('errArray is:')
        console.log(errArray)
        await dispatch({ type: 'add_error', payload: errArray})
        return
      } else {
        await dispatch({ type: 'add_error', payload: err.response.data.errors })
      }
    }
  }
}

const resetPasswordWithToken = (dispatch) => {
  user = {};
  return async ({ code, password, confirmPassword}) => {
    try {
      user = {
        password: password,
        password_confirmation: confirmPassword,
        reset_password_token: code,
      }
      const response = await Api.baseUrl.put(
        '/users/password',
        {
          user,
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      )
      console.log(response.data)
      await dispatch({ type: 'do_next_screen', payload: "Login"})
      await dispatch({ type: 'add_error', payload: 'Please sign in with your new password' })
    } catch (err) {
      console.error("Error response:");
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      if (err.response.data.errors) {
        console.log(err.response.data.errors)
        let errArray = new Array()
        Object.entries(err.response.data.errors).forEach(entry => {
          const [key, value] = entry;
          errArray.push(`${key}: ${value}`)
        });
        console.log('errArray is:')
        console.log(errArray)
        await dispatch({ type: 'add_error', payload: errArray})
        return
      } else {
        await dispatch({ type: 'add_error', payload: err.response.data.errors })
      }
    }
  }
}

const clearErrors = (dispatch) => {
  dispatch({ type: 'add_error', payload: null})
}

const signup = (dispatch) => {
  user = {};
  return async ({ email, password }) => {
    // make api request to signup
    try {
      user = {
        email,
        password
      };
      const response = await Api.baseUrl.post(
        '/users',
        {
          user,
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      )
      console.log(response.data)
      if (response.data.errors) {
        let errArray = new Array()
          Object.entries(response.data.errors).forEach(entry => {
            const [key, value] = entry;
            errArray.push(`${key}: ${value}`)
          });
        console.log('errArray is:')
        console.log(errArray)
        dispatch({ type: 'add_error', payload: errArray})
        return
      }
      console.log(response.headers['authorization']);
      credentials = {
        token: response.headers['authorization'],
        email: email,
        password: password,
        user: response.data.user
      };
      dispatch({ type: 'clear_error'})
      setHeader(response.headers['authorization']);
      await dispatch({ type: 'doStoreCredentials', payload: credentials });
    } catch (err) {
      console.log('WE HAVE AN ERROR!!!!')
      console.log(err)
      // console.error("Error response:");
      // console.error(err.response.data);
      // console.error(err.response.status);
      // console.error(err.response.headers);
      await dispatch({ type: 'add_error', payload: err.response.data.error })
    }
  }
}

export const { Provider, Context } = CreateDataContext(
  authReducer,
  { signin, signout, hasToken, signup, resetPassword, resetPasswordWithToken, getColors },
  { isLoggedIn: false, errorMessage: '', credentials: {} },
);
