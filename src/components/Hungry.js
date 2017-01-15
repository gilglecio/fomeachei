/*
 * @flow
 */
import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import MapView from 'react-native-maps';
import LoaderHander from 'react-native-busy-indicator/LoaderHandler';

import Styles from '../styles';

import FoodList from './FoodList';

import Storage from '../data/Storage';

/**
 * Hungry Component the last hope of humankind that shows you where find food
 * next to you. Simple map with the list of found foods.
 */
export default class Hungry extends Component {

  constructor() {
    super();

    this.state = {
      foods: null,
      position: {}
    };
  }

  /**
   * Show the loading indicator and start watch the user position to use the
   * coordinates to find the supplies
   */
  componentDidMount() {
    LoaderHander.showLoader('Aguarde...');
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ position });
    }, null, {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 1000
    });

    this.watchID = navigator.geolocation
      .watchPosition(position => {
        this.search(position.coords);
        this.setState({ position });
        this.timeout = setTimeout(() => this.map.fitToElements(false), 2000);
      });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    navigator.geolocation.clearWatch(this.watchID);
  }

  /**
   * Map the markers to use in the zoom show food location
   * @type {Object}
   */
  markers = {};

  /**
   * Zoom the map in the food position
   * @method goMarker
   * @param  {String} id Food id
   */
  goMarker(id) {
    this.map.fitToSuppliedMarkers([id], true);
    if (this.markers[id]) {
      this.markers[id].showCallout();
    }
  }

  /**
   * Search the food based on location coords given
   * @param  {Object} coords {latitude, longitude}
   */
  search(coords) {
    if (!coords) {
      return false;
    }

    Storage.search(coords)
      .then(foods => {
        LoaderHander.hideLoader();
        return this.setState({ foods });
      })
      .catch(() => Alert.alert('Atenção', 'Os dados não puderam ser carregados.'));
  }

  /**
   * Render the View with the Map and the list of supplies
   * @return {View} View Component
   */
  render() {
    const { foods } = this.state;

    return (
      <View style={Styles.main}>
        <MapView
          followsUserLocation
          ref={ref => { this.map = ref; }}
          showsMyLocationButton={false}
          showsUserLocation
          style={Styles.hungryMap}
        >
          {foods && foods.map(food => (
            <MapView.Marker
              coordinate={food.position.coords}
              identifier={food.id}
              key={food.id}
              ref={ref => { this.markers[food.id] = ref; }}
              title={food.foodName}
            />
          ))}
        </MapView>
        <FoodList foods={foods} goMarker={this.goMarker.bind(this)} />
      </View>
    );
  }
}
