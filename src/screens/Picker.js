import React, {Fragment, useEffect, useState} from "react"
import {Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native'
import { globalStyles } from "../styles/Global"
import {TriangleColorPicker, fromHsv, toHsv} from "react-native-color-picker"
import Slider from '@react-native-community/slider'
import { Button } from 'react-native-paper'
import * as RootNavigation from "../components/RootNavigation"
import {hexToHsl, hexToRGB, RGBToHex, HSLToHex, processColor} from "../components/Palette"
import { useSelector, useDispatch } from 'react-redux'
import {setPalette, setPickColor, setSectionColorNames} from '../redux/DataSlice'
import { FormBuilder } from "react-native-paper-form-builder"
import {useForm} from "react-hook-form"
import {useIsFocused} from "@react-navigation/native";

function HomeScreen({ navigation }) {
  const palette = useSelector((state) => state.data.palette)
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


  const {control, setFocus, handleSubmit, setValue, getValues, setError, formState: { errors }} = useForm({
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

  const procColor = async (color) => {
    if (color.length === 7) {
      const colorData = processColor(color);
      await dispatch(setPalette(colorData));
      RootNavigation.navigate('Palette')
    }
  }

  const colorDidChange = async (color) => {
    Keyboard.dismiss()
    await dispatch(setPickColor(color))
    setValue('hex', color)
    setValue('rgb', hexToRGB(color))
    setValue('hsl', hexToHsl(color))
    setValue('hsv', roundHSV(color))
  }

  const MySlider = (props) => <Slider />

  const updateColorFromInput = (input, color) => {
    color = color.replace(/\s/g,'')
    console.log(input)
    console.log(color)
    switch( input ) {
      case 'hex':
        color = (color.charAt(0) !== "#")? "#" + color : color
        const validateHex = /^#([0-9a-f]{3}){1,2}$/i
        if (validateHex.test(color)) {
          dispatch(setPickColor(color))
        }
        break
      case 'rgb':
        console.log(color)
        const validateRGB = /^(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)$/
        if (validateRGB.test(color)) {
          dispatch(setPickColor(RGBToHex(color)))
        }
        break
      case 'hsl':
        console.log(color)
        const validateHSL = /^((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%?){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%?){2})$/i
        if (validateHSL.test(color)) {
          hsl = color.split(',')
          dispatch(setPickColor(HSLToHex(hsl[0], hsl[1], hsl[2])))
        } else {
          console.log('invalid')
        }
        break
      case 'hsv':
        console.log(color)
        const validateHSV = /^((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%?){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%?){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)$/i
        if (validateHSV.test(color)) {
          hsv = color.split(',')
          console.log('from hsv')
          dispatch(setPickColor(fromHsv({h: hsv[0], s: hsv[1], v: hsv[2]})))
        } else {
          console.log('invalid')
        }
        break
      default:
    }
  }

  let selectedColor = data.pickColor
  return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : "height"}
            style={globalStyles.inputContainer}
            keyboardVerticalOffset={100}>
          <FormBuilder
              control={control}
              setFocus={setFocus}
              formConfigArray={[
                [{
                  type: 'text',
                  name: 'hex',
                  rules: {
                    required: {
                      value: true,
                      message: 'HEX value is required',
                    },
                    pattern: {
                      value:
                          /^#?([0-9a-f]{3}){1,2}$/i,
                      message: 'Invalid Hex format',
                    }
                  },
                  textInputProps: {
                    label: 'HEX',
                    style: style={fontSize: 12, textAlign: 'center', fontWeight: 'bold'},
                    underlineColor: 'red',
                    onBlur: () => updateColorFromInput('hex', getValues("hex"))
                  },
                },
                  {
                    type: 'text',
                    name: 'rgb',
                    rules: {
                      required: {
                        value: true,
                        message: 'RGB value is required',
                      },
                      pattern: {
                        value:
                            /^(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)$/,
                        message: 'Invalid RGB format',
                      },
                    },
                    textInputProps: {
                      label: 'RGB',
                      style: style={fontSize: 12, textAlign: 'center', fontWeight: 'bold'},
                      underlineColor: 'red',
                      onBlur: () => updateColorFromInput('rgb', getValues("rgb"))
                    },
                  }],
                [{
                  type: 'text',
                  name: 'hsl',
                  rules: {
                    required: {
                      value: true,
                      message: 'HSL value is required',
                    },
                    pattern: {
                      value:
                          /^((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%?){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%?){2})$/i,
                      message: 'Invalid HSL format',
                    },
                  },
                  textInputProps: {
                    label: 'HSL',
                    style: style={fontSize: 12, textAlign: 'center', fontWeight: 'bold'},
                    underlineColor: 'red',
                    onBlur: () => updateColorFromInput('hsl', getValues("hsl"))
                  },
                },
                  {
                    type: 'text',
                    name: 'hsv',
                    rules: {
                      required: {
                        value: true,
                        message: 'HSV value is required',
                      },
                      pattern: {
                        value:
                            /^((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%?){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%?){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)$/i,
                        message: 'Invalid HSV format',
                      },
                    },
                    textInputProps: {
                      label: 'HSV',
                      style: style={fontSize: 12, textAlign: 'center', fontWeight: 'bold'},
                      underlineColor: 'red',
                      onBlur: () => updateColorFromInput('hsv', getValues("hsv"))
                    },
                  }],
              ]}
          />
        </KeyboardAvoidingView>
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
      </TouchableWithoutFeedback>
  )
}

export default HomeScreen
