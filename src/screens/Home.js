import React from "react";
import { Text, View } from 'react-native'
import { globalStyles } from "../styles/Global";
import { TriangleColorPicker } from "react-native-color-picker";
import Slider from '@react-native-community/slider';
import { Button } from 'react-native-paper'
import * as RootNavigation from "../components/RootNavigation"
import  { processColor } from "../components/Palette";
import { useSelector, useDispatch } from 'react-redux'
import { addData } from '../redux/DataSlice'

function HomeScreen({ navigation }) {
  const data = useSelector((state) => state.data.value)
  const dispatch = useDispatch()

  const procColor = (color) => {
    if (color.length === 7) {
      console.log('processing the color!!!');
      const colorData = processColor(color);
      dispatch(addData(colorData));
      RootNavigation.navigate('Palette')
    }
  }

  const MySlider = (props) => <Slider />
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.headerText}>Please Select a Color</Text>
        <TriangleColorPicker
            sliderComponent={MySlider}
            onColorSelected={color => procColor(color)}
            style={{flex: 1}}
        />
    </View>
  )
}

export default HomeScreen
//     .tint10 {
//   calc(var(--l) + ((100% - var(--l)) / 10) * 1));}
// .tint20 {
//   calc(var(--l) + ((100% - var(--l)) / 10) * 2));
// }
//
// .shade10 {
//   calc(var(--l) - ((100% - var(--l)) / 10) * 1));
// }
// .shade20 {
//   calc(var(--l) - ((100% - var(--l)) / 10) * 2));
// }
// /* etc. */
