/*
 * @flow
 */
import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import moment from 'moment';

import 'moment/locale/pt-br';

import Main from './containers/Main';

import Dash from './components/Dash';
import Found from './components/Found';
import FoundIt from './components/FoundIt';
import Hungry from './components/Hungry';

moment.locale('pt-br');

/**
 * FomeAchei main component
 *
 * The best experience to colaborative information about found foods
 *
 */
export default class FomeAchei extends Component {

  /**
   * Render the React Native Router Flux schema
   * @method render
   * @return {Router} Router Schema
   */
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="main" component={Main} initial hideNavBar>
            <Scene key="dash" component={Dash} hideNavBar initial />
            <Scene key="found" component={Found} hideNavBar />
            <Scene key="foundIt" component={FoundIt} hideNavBar />
            <Scene key="hungry" component={Hungry} hideNavBar />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
