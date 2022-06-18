import color from 'color';
import { black, white, pinkA400 } from './colors';
import configureFonts from './fonts';
import type { Theme } from 'react-native-paper/src/types';

const DefaultTheme: Theme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: '#025e8f',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: white,
    error: '#B00020',
    text: black,
    onSurface: '#000000',
    disabled: color(black).alpha(0.26).rgb().string(),
    placeholder: 'yellow',
    backdrop: color(black).alpha(0.5).rgb().string(),
    notification: pinkA400,
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DefaultTheme;
