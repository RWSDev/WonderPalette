import React from "react";
import { Text, View } from 'react-native'
import { globalStyles } from "../styles/Global";
import {TriangleColorPicker, fromHsv} from "react-native-color-picker";
import Slider from '@react-native-community/slider';
import { Button } from 'react-native-paper'
import * as RootNavigation from "../components/RootNavigation"
import  { processColor } from "../components/Palette";
import { useSelector, useDispatch } from 'react-redux'
import { setPalette, setPickColor } from '../redux/DataSlice'

function HomeScreen({ navigation }) {
  const initialColor = '#0046ff'
  const data = useSelector((state) => state.data)
  const dispatch = useDispatch()

  const procColor = (color) => {
    if (color.length === 7) {
      console.log('processing the color!!!');
      const colorData = processColor(color);
      dispatch(setPalette(colorData));
      RootNavigation.navigate('Palette')
    }
  }

  const MySlider = (props) => <Slider />
  let selectedColor = data.pickColor
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.headerText}>Please Select a Color</Text>
        <TriangleColorPicker
            defaultColor={data.pickColor}
            color={data.pickColor}
            hideControls={true}
            sliderComponent={MySlider}
            onColorChange={color => dispatch(setPickColor(fromHsv(color)))}
            style={{flex: 1}}
        />
      <View style={globalStyles.pickerButtonsContainer}>
        <Button
            mode={'outlined'}
            buttonColor={data.pickColor}
            onPress={() => procColor(data.pickColor)}
            style={[globalStyles.pickerButton, {borderColor: data.pickColor}]}>
          <Text style={[globalStyles.pickerButtonText, {color: data.pickColor}]}>See Palette</Text>
        </Button>
        <Button
            mode={'outlined'}
            buttonColor={data.pickColor}
            onPress={() => dispatch(setPickColor(initialColor))}
            style={[globalStyles.pickerButton, {borderColor: data.pickColor}]}>
          <Text style={[globalStyles.pickerButtonText, {color: data.pickColor}]}>Reset Palette</Text>
        </Button>
      </View>
    </View>
  )
}

export default HomeScreen
