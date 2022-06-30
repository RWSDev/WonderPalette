import React, {useEffect, useState} from "react"
import { Text, View } from 'react-native'
import { globalStyles } from "../styles/Global"
import {TriangleColorPicker, fromHsv, toHsv} from "react-native-color-picker"
import Slider from '@react-native-community/slider'
import { Button } from 'react-native-paper'
import * as RootNavigation from "../components/RootNavigation"
import {hexToHsl, hexToRGB, processColor} from "../components/Palette"
import { useSelector, useDispatch } from 'react-redux'
import {setPalette, setPickColor} from '../redux/DataSlice'
import { FormBuilder } from "react-native-paper-form-builder"
import {useForm} from "react-hook-form"
import {useIsFocused} from "@react-navigation/native";

function HomeScreen({ navigation }) {

  const [colorBooks, setColorBooks] = useState([])
  const initialColor = '#0000ff'
  const data = useSelector((state) => state.data)
  const dispatch = useDispatch()

  useEffect(() => {
    colorDidChange(data.pickColor)
  }, [data.pickColor]);

  const roundHSV = (color) => {
    const hsv = toHsv(color)
    let hsvValues = Object.values(hsv)
    hsvValues.forEach((v, index) => {
      if (!Number.isInteger(v)) {
        hsvValues[index] = v.toFixed(2)
      }
    })
    return hsvValues.join(',')
  }


  const {control, setFocus, handleSubmit, setValue} = useForm({
    defaultValues: {
      hex: data.pickColor,
      rgb: hexToRGB(data.pickColor),
      hsl: hexToHsl(data.pickColor),
      hsv: roundHSV(data.pickColor),
      errorMessage: ''
    },
    mode: 'onChange',
  });
  const isFocused = useIsFocused();
  useEffect(() => {}, [isFocused]);

  const procColor = (color) => {
    if (color.length === 7) {
      const colorData = processColor(color);
      dispatch(setPalette(colorData));
      RootNavigation.navigate('Palette')
    }
  }

  const colorDidChange = async (color) => {
    await dispatch(setPickColor(color))
    setValue('hex', color)
    setValue('rgb', hexToRGB(color))
    setValue('hsl', hexToHsl(color))
    setValue('hsv', roundHSV(color))
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
            onColorChange={color => { dispatch(setPickColor(fromHsv(color))); setColorBooks([])}}
            style={{flex: 1}}
        />
      <View style={globalStyles.inputContainer}>
        <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
              [{
                type: 'text',
                name: 'hex',
                textInputProps: {
                  label: 'HEX',
                  style: style={fontSize: 12, textAlign: 'center', fontWeight: 'bold'}
                },
              },
                {
                  type: 'text',
                  name: 'rgb',
                  textInputProps: {
                    label: 'RGB',
                    style: style={fontSize: 12, textAlign: 'center', fontWeight: 'bold'}
                  },
                }],
              [{
                type: 'text',
                name: 'hsl',
                textInputProps: {
                  label: 'HSL',
                  style: style={fontSize: 12, textAlign: 'center', fontWeight: 'bold'}
                },
              },
                {
                  type: 'text',
                  name: 'hsv',
                  value: 'blahblah',
                  textInputProps: {
                    label: 'HSV',
                    style: style={fontSize: 12, textAlign: 'center', fontWeight: 'bold'},
                  },
                }],
            ]}
        />
      </View>
      <View style={globalStyles.pickerButtonsContainer}>
        <Button
            mode={'outlined'}
            buttonColor={data.pickColor}
            onPress={() => procColor(data.pickColor)}
            style={[globalStyles.pickerButton, {borderColor: data.pickColor}]}>
          <Text style={[globalStyles.pickerButtonText, {color: data.pickColor}]}>Build Palette</Text>
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
