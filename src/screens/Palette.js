import React from "react"
import { Text, View } from 'react-native'
import { globalStyles } from "../styles/Global";
import { paletteStyles} from "../styles/Palette";
import { useSelector, useDispatch } from 'react-redux'
import { addData } from '../redux/DataSlice'

function PaletteScreen({ navigation }) {
    const data = useSelector((state) => state.data.value)
    const dispatch = useDispatch()

    const buildComplimentary = () => {

    }

    console.log(data)
    console.log(data.tints)
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Palette!!!</Text>
            <View style={paletteStyles.complimentary}><Text>comp</Text></View>
            <View style={paletteStyles.splitComplimentary}><Text>split comp</Text></View>
            <View style={paletteStyles.analogous}><Text>analogous</Text></View>
            <View style={paletteStyles.square}><Text>square</Text></View>
            <View style={paletteStyles.triadic}><Text>triadic</Text></View>
            <View style={paletteStyles.tetradic}><Text>tetradic</Text></View>
            <View style={paletteStyles.tints}><Text>tints</Text></View>
            <View style={paletteStyles.shades}><Text>shades</Text></View>
        </View>
    )
}

export default PaletteScreen

