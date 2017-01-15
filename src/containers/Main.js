/*
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import SideMenu from 'react-native-side-menu';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import BusyIndicator from 'react-native-busy-indicator';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Styles from '../styles';

const menuTextColor = '#E2E3E5';

/**
 * Side Menu items
 * @type {Array}
 */
const menuItems = [{
  title: 'Buscar Alimento',
  action: 'hungry',
  leftIcon: {
    name: 'search',
    color: menuTextColor
  }
}, {
  title: 'Mapear Alimento',
  action: 'found',
  leftIcon: {
    name: 'add-location',
    color: menuTextColor
  }
}, {
  title: 'Mapeados por mim',
  action: 'foundIt',
  leftIcon: {
    name: 'beenhere',
    color: menuTextColor
  }
}];

/**
 * Side Menu View
 * @param  {Object} props
 * @return {ScrollView}
 */
const Menu = ({ closeMenu }) => (
  <ScrollView scrollsToTop={false} style={Styles.menu}>
    <View style={Styles.menu}>
      <List containerStyle={Styles.menu}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.action}
            onPress={() => {
              Actions[item.action]();
              closeMenu();
            }}
          >
            <ListItem
              leftIcon={item.leftIcon}
              containerStyle={Styles.menu}
              titleStyle={Styles.menuText}
              title={item.title}
            />
          </TouchableOpacity>
        ))}
      </List>
    </View>
  </ScrollView>
);

Menu.propTypes = {
  closeMenu: PropTypes.func.isRequired
};

/**
 * Main Component with the Navbar, sidemenu and Main Container
 */
export default class Main extends Component {

  constructor() {
    super();

    this.state = {
      isOpen: false
    };
  }

  updateMenuState(isOpen: boolean) {
    this.setState({
      isOpen
    });
  }

  toggleMenu() {
    this.updateMenuState(!this.state.isOpen);
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    const last = children.length - 1;

    return (
      <SideMenu
        menu={<Menu closeMenu={() => this.updateMenuState(false)} />}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}
      >
        <StatusBar
          backgroundColor="#373849"
          barStyle="light-content"
        />
        <View style={Styles.navbar}>
          <TouchableOpacity
            onPress={this.toggleMenu.bind(this)}
            style={Styles.menuButton}
          >
            <Icon
              name="menu"
              color="#FFF"
              size={40}
            />
          </TouchableOpacity>
          <Text style={Styles.navbarTitle}>Fome? Achei!</Text>
        </View>
        <DefaultRenderer
          navigationState={children[last]}
          onNavigate={this.props.onNavigate}
        />
        <BusyIndicator />
      </SideMenu>
    );
  }
}

Main.propTypes = {
  navigationState: PropTypes.shape({
    isOpen: PropTypes.boolean
  }),
  onNavigate: PropTypes.func.isRequired
};

Main.defaultProps = {
  navigationState: { isOpen: false }
};
