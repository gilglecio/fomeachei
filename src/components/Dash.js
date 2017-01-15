/*
 * @flow
 */
import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Styles from '../styles';

/**
 * Dash component
 *
 * Fast access to the most important actions in these days of survivor
 *
 */
export default class Dash extends Component {

  /**
   * Render two big buttons for Hungry and Found actions
   * The psychology of colors was used here
   * Red for the 'Fome' button that indicates urgency
   * Green for the 'Found' button, indicates hope
   *
   * @return {View} View Component
   */
  render() {
    return (
      <View style={[Styles.main, Styles.dash]}>
        <TouchableOpacity
          onPress={Actions.hungry}
          style={[Styles.actionButton, Styles.hungryButton]}
        >
          <Text style={[Styles.actionTextMain, Styles.hungryText]}>
            Fome?
          </Text>
          <Text style={[Styles.actionTextSub, Styles.hungryText]}>
            Encontrar Alimento
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Actions.found}
          style={[Styles.actionButton, Styles.foundButton]}
        >
          <Text style={[Styles.actionTextMain, Styles.foundText]}>
            Achei!
          </Text>
          <Text style={[Styles.actionTextSub, Styles.foundText]}>
            Mapear Alimento
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
