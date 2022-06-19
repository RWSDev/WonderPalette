import React, { useContext, useEffect } from "react";
import { Text, View } from 'react-native'
import { globalStyles } from "../styles/Global";
import { TriangleColorPicker } from "react-native-color-picker";
import Slider from '@react-native-community/slider';
import * as RootNavigation from "../components/RootNavigation"

function HomeScreen({ navigation }) {

  const procColor = (color) => {
    const hsl = hexToHSL(color)
    let colorTable = {primary: color, hsl: hsl}
    // console.log('Primary: ' + color)
    // console.log(`HSL: ${hsl.h} : ${hsl.s} : ${hsl.l}`)
    // console.log('Complimentary: ' + complimenentary(color))
    colorTable.complimentary = complimenentary(color)
    // console.log('Split Complimentary: ' + splitComplimentary(color))
    colorTable.splitComplementary = splitComplimentary(color)
    // console.log('Analogous: ' + analogous(color))
    colorTable.analogous = analogous(color)
    // console.log('Triadic: ' + triadic(color))
    colorTable.triadic = triadic(color)
    // console.log('Square: ' + square(color))
    colorTable.square = square(color)
    // console.log('Tetradic: ' + tetradic(color))
    colorTable.tetradic = tetradic(color)
    // console.log('Tints: ' + tints(color))
    colorTable.tints = tints(color)
    // console.log('Shades: ' + shades(color))
    colorTable.shades = shades(color)
    console.log(colorTable)
    RootNavigation.navigate('Palette')
  }

  const hexToHSL = (color) => {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (color.length == 4) {
      r = "0x" + color[1] + color[1];
      g = "0x" + color[2] + color[2];
      b = "0x" + color[3] + color[3];
    } else if (color.length == 7) {
      r = "0x" + color[1] + color[2];
      g = "0x" + color[3] + color[4];
      b = "0x" + color[5] + color[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
      h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {h: h, s: s, l: l}
  }

  const HSLToHex = (h,s,l) => {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;
  }
  const complimenentary = (color) => {
    const hsl = hexToHSL(color)
    let h = 0
    let colorArray = [color]
    if (hsl.h + 180 > 360) {
      h = hsl.h + 180 - 360
    } else {
      h = hsl.h + 180
    }
    colorArray.push(HSLToHex(h, hsl.s, hsl.l))
    return colorArray
  }

  const splitComplimentary = (color) => {
    const hsl = hexToHSL(color)
    let colorArray = []
    // 150º for first
    if (hsl.h + 150 > 360) {
      h = hsl.h + 150 - 360
    } else {
      h = hsl.h + 150
    }
    colorArray.push(HSLToHex(h, hsl.s, hsl.l))
    colorArray.push(color)
    // 210º for second
    if (hsl.h + 210 > 360) {
      h = hsl.h + 210 - 360
    } else {
      h = hsl.h + 210
    }
    colorArray.push(HSLToHex(h, hsl.s, hsl.l))
    return colorArray
  }

  const analogous = (color) => {
    const hsl = hexToHSL(color)
    let colorArray = []
    // - 30º for first
    if (hsl.h - 30 < 0) {
      h = 360 - Math.abs(hsl.h - 30)
    } else {
      h = hsl.h - 30
    }
    colorArray.push(HSLToHex(h, hsl.s, hsl.l))
    colorArray.push(color)
    // +30º for second
    if (hsl.h + 30 > 360) {
      h = hsl.h + 30 - 360
    } else {
      h = hsl.h + 30
    }
    colorArray.push(HSLToHex(h, hsl.s, hsl.l))
    return colorArray
  }

  const triadic = (color) => {
    const hsl = hexToHSL(color)
    let colorArray = []
    // - 120º for first
    if (hsl.h - 120 < 0) {
      h = 360 - Math.abs(hsl.h - 120)
    } else {
      h = hsl.h - 120
    }
    colorArray.push(HSLToHex(h, hsl.s, hsl.l))
    colorArray.push(color)
    // +120º for second
    if (hsl.h + 120 > 360) {
      h = hsl.h + 120 - 360
    } else {
      h = hsl.h + 120
    }
    colorArray.push(HSLToHex(h, hsl.s, hsl.l))
    return colorArray
  }

  const square = (color) => {
    const hsl = hexToHSL(color)
    let colorArray = []
    // +90º for first
    if (hsl.h + 90 > 360) {
      h = hsl.h + 90 - 360
    } else {
      h = hsl.h + 90
    }
    colorArray.push(HSLToHex(h, hsl.s, hsl.l))
    colorArray.push(color)
    // 270º for second
    if (hsl.h + 270 > 360) {
      h = hsl.h + 270 - 360
    } else {
      h = hsl.h + 270
    }
    colorArray.push(HSLToHex(h, hsl.s, hsl.l))
    return colorArray
  }

  const tetradic = (color) => {
    const hsl = hexToHSL(color)
    let colorArray = [color]
    // +60º for first
    if (hsl.h + 60 > 360) {
      h = hsl.h + 60 - 360
    } else {
      h = hsl.h + 60
    }
    colorArray.push(HSLToHex(h, hsl.s, hsl.l))
    // 180º for second
    if (hsl.h + 180 > 360) {
      h = hsl.h + 180 - 360
    } else {
      h = hsl.h + 180
    }
    colorArray.push(HSLToHex(h, hsl.s, hsl.l))
    // 240º for second
    if (hsl.h + 240 > 360) {
      h = hsl.h + 240 - 360
    } else {
      h = hsl.h + 240
    }
    colorArray.push(HSLToHex(h, hsl.s, hsl.l))
    return colorArray
  }

  const tints = (color) => {
    const hsl = hexToHSL(color)
    let colorArray = [color]
    let l = hsl.l
    for(i = 1; i < 10; i++ ) {
      l = l + (((100 - l) / 10) * i)
      colorArray.push(HSLToHex(hsl.h, hsl.s, l))
    }
    return colorArray
  }

  const shades = (color) => {
    const hsl = hexToHSL(color)
    let colorArray = [color]
    let l = hsl.l
    for(i = 1; i < 10; i++ ) {
      l = l - ((0 + l) / 10) * i
      colorArray.push(HSLToHex(hsl.h, hsl.s, l))
    }
    return colorArray
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
