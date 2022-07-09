import * as React from 'react';
import { View, Text, TextInput, Modal } from 'react-native';
import {IconButton, Menu, Divider, Provider, Card, Button} from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RootNavigation from "./RootNavigation"
import { useNavigation } from '@react-navigation/native'
import { getPalettes, savePalette } from "./SqliteDB";
import { useSelector, useDispatch } from 'react-redux'
import { loadSavedPalettes } from '../redux/DataSlice'
import {useState} from "react";
import {paletteStyles} from "../styles/Palette";
import Icon from "react-native-vector-icons/FontAwesome5";
import {globalStyles} from "../styles/Global";

const TopMenu = () => {
  const navigation = useNavigation()
  // const savedPalettes = useSelector((state) => state.data.savedPalettes)
  const palette = useSelector((state) => state.data.palette)
  const dispatch = useDispatch()
  let scene = 'Picker'
  if (navigation.getCurrentRoute() !== undefined) {
    scene = navigation.getCurrentRoute().name
  }
  MaterialCommunityIcon.loadFont();
  const [visible, setVisible] = React.useState(false);
  const [promptVisible, setPromptVisible] = useState(false)
  const [text, onChangeText] = useState('')
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const loadPalettes = async() => {
    const palettes = await getPalettes()
    await dispatch(loadSavedPalettes(palettes))
    navigation.navigate('Saved Palettes')
    // RootNavigation.navigate('Saved Palettes')
  }

  console.log(scene)
  const buildMenu = () => {
    switch( scene ) {
      case "Picker":
        return (
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<IconButton icon="dots-grid" color="white" onPress={openMenu} />}>
              <Menu.Item onPress={() => {closeMenu(); RootNavigation.navigate('Settings')}} title="Settings" />
            </Menu>
        )
        break
      case 'PaletteScreen':
        return (
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<IconButton icon="dots-grid" color="white" onPress={openMenu} />}>
              <Divider />
              <Menu.Item onPress={() => {closeMenu(); setPromptVisible(true)}} title="Save Palette" />
              <Menu.Item onPress={() => {closeMenu(); loadPalettes()}} title="Load Saved Palettes" />
            </Menu>
        )
        break
      default:
        return (
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<IconButton icon="dots-grid" color="white" onPress={openMenu} />}>
              <Menu.Item onPress={() => {closeMenu(); RootNavigation.navigate('Settings')}} title="Settings" />
            </Menu>
        )
    }
  }

    const doSavePalette = async() => {
        closeMenu()
        console.log('==================== saving palette ====================')
        console.log(text)
        console.log(palette.primary)
        try {
            await savePalette(text, palette.primary)
            onChangeText('')
        } catch (e) {
            console.log(e)
        }
    }


  const namePromptModal = () => {
      return (
              <Modal
                  animationType="slide"
                  visible={promptVisible}
                  transparent={true}
                  onRequestClose={() => {
                      alert('closed')
                      setPromptVisible(!promptVisible)
                  }}>
                  {/*<View style={{flex: 1, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center', maxHeight: '50%', minWidth: "75%", marginVertical: 250, alignSelf: 'center'}}>*/}
                      <Card style={paletteStyles.saveCard}>
                          <Card.Title
                              titleStyle={paletteStyles.saveCardTitleText}
                              title={"Please enter a name to save as"}
                          />
                          <Card.Content>
                              <TextInput
                                  style={paletteStyles.promptInput}
                                  onChangeText={onChangeText}
                                  value={text}
                              />
                          </Card.Content>
                          <Card.Actions style={paletteStyles.saveCardActionsContainer}>
                              <Button
                                  mode={'outlined'}
                                  buttonColor={palette.pickColor}
                                  onPress={() => setPromptVisible(!promptVisible)}
                                  style={paletteStyles.saveCardActionButton}>
                                  <Text style={globalStyles.primaryButtonText}>Cancel</Text>
                              </Button>
                              <Button
                                  mode={'outlined'}
                                  buttonColor={palette.pickColor}
                                  onPress={() => {setPromptVisible(!promptVisible); doSavePalette()}}
                                  style={paletteStyles.saveCardActionButton}>
                                  <Text style={globalStyles.primaryButtonText}>Save</Text>
                              </Button>
                          </Card.Actions>
                      </Card>

                  {/*</View>*/}
              </Modal>
      )
  }

  return (
    <Provider>
      <View>
          {namePromptModal()}
        {buildMenu()}
      </View>
    </Provider>
  );
};

export default TopMenu;
