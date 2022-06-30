import axios from "axios";

const getToken = async () => {
  console.log ( 'getting token for user.js' );
  const jsonValue = await AsyncStorage.getItem('@credentials')
  credentials = jsonValue != null ? JSON.parse(jsonValue) : null
  if (credentials && credentials.token) {
    return credentials.token;
  } else {
    return null;
  }
}

const getBaseUrl = () => {
  var isDev = __DEV__
  var baseUrl = null
  isDev = true
  if (isDev) {
    baseUrl = 'http://localhost:3000'
  } else {
    baseUrl = 'http://barassistant.devgw.com'
  }
  console.log(`baseUrl: ${baseUrl}`);
  return baseUrl
}

const baseUrl = axios.create({
  baseURL: `${getBaseUrl()}`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // Authorization: getToken()
  }
});

const apiUrl = axios.create({
  baseURL: `${getBaseUrl()}/api/v1`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // Authorization: getToken()
  }
});

export default { baseUrl, apiUrl }
