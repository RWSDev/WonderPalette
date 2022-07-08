import * as React from 'react';
import { View } from 'react-native';
import { IconButton, Menu, Divider, Provider } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RootNavigation from "./RootNavigation"
import { useNavigation } from '@react-navigation/native'
import { getPalettes } from "./SqliteDB";
import { useSelector, useDispatch } from 'react-redux'
import { loadSavedPalettes } from '../redux/DataSlice'

const TopMenu = () => {
  const navigation = useNavigation()
  const savedPalettes = useSelector((state) => state.data.savedPalettes)
  const dispatch = useDispatch()
  let scene = 'Picker'
  if (navigation.getCurrentRoute() !== undefined) {
    scene = navigation.getCurrentRoute().name
  }
  MaterialCommunityIcon.loadFont();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const loadPalettes = async() => {
    const palettes = await getPalettes()
    await dispatch(loadSavedPalettes(palettes))
    navigation.navigate('Saved Palettes')
    // RootNavigation.navigate('Saved Palettes')
  }

  return (
    <Provider>
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton icon="dots-grid" color="white" onPress={openMenu} />}>
          <Menu.Item title={scene} />
          <Divider />
          <Menu.Item onPress={() => {closeMenu(); loadPalettes()}} title="Load Saved Palettes" />
          <Menu.Item onPress={() => {closeMenu(); RootNavigation.navigate('Settings')}} title="Settings" />
          <Divider />
        </Menu>
      </View>
    </Provider>
  );
};

export default TopMenu;
