import * as React from 'react';
import { View } from 'react-native';
import { IconButton, Menu, Divider, Provider } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RootNavigation from "./RootNavigation"

const TopMenu = ({ navigation }) => {
  MaterialCommunityIcon.loadFont();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<IconButton icon="dots-grid" color="white" onPress={openMenu} />}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {closeMenu(); RootNavigation.navigate('Settings')}} title="Settings" />
          <Divider />
        </Menu>
      </View>
    </Provider>
  );
};

export default TopMenu;
