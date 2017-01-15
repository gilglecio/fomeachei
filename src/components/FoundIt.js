/*
 * @flow
 */
import React, { Component } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import LoaderHander from 'react-native-busy-indicator/LoaderHandler';

import Styles from '../styles';

import FoodCard from './FoodCard';

import Storage from '../data/Storage';

/**
 * FoundIt Component show the user contributions with the humanity
 */
export default class FoundIt extends Component {

  constructor() {
    super();
    this.state = {
      foods: []
    };
  }

  /**
   * Show the loading indicator and ask to Storage about the user contributions
   */
  componentDidMount() {
    LoaderHander.showLoader('Aguarde...');
    Storage.getFoodsByMe()
      .then(foods => {
        LoaderHander.hideLoader();
        return this.setState({ foods });
      })
      .catch(() => Alert.alert('Atenção', 'Dados não puderam ser carregados.'));
  }

  /**
   * Remove the food from the Storage
   * @method foodRemove
   * @param  {Object} food
   */
  foodRemove(food) {
    if (!food) {
      return false;
    }

    Alert.alert('Atenção',
      `Deseja mesmo remover a localização do alimento ${food.foodName} `, [{
        text: 'Não'
      }, {
        text: 'Sim',
        onPress: () => {
          Storage.removeFoodById(food.id)
            .then(() => {
              let { foods } = this.state;
              foods = foods.filter(f => f.id !== food.id);

              return this.setState({ foods });
            })
            .catch(() => Alert.alert('Atenção', 'Não foi possível remover.'));
        }
      }]
    );
  }

  /**
   * Render a list of FoodCards
   * @return {View} View Component
   */
  render() {
    const { foods } = this.state;

    return (
      <View style={Styles.main}>
        <Text style={Styles.foodListHeader}>
          {foods ? `${foods.length} alimento(s) encontrado(s)` : 'Buscando...'}
        </Text>
        <ScrollView>
          {foods && foods.map(food => (
            <FoodCard
              food={food}
              key={food.id}
              remove={this.foodRemove.bind(this)}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
