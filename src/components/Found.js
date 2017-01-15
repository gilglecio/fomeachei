/*
 * @flow
 */
import React, { Component } from 'react';
import {
  Alert,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import MapView from 'react-native-maps';

import Styles from '../styles';

import MultipleChoice from './MultipleChoice';

import Storage from '../data/Storage';

/**
 * Found Component is the form that the user contribute with the humankind
 * mapping found food that it encounters during its survival journey
 */
export default class Found extends Component {

  /**
   * Food initial state, used to reset form
   * @static
   * @method  initialState
   * @return {Object}
   */
  static initialState() {
    return {
      expiration: null,
      foodName: null,
      foodType: []
    };
  }

  constructor() {
    super();
    this.state = {
      ...Found.initialState(),
      position: {}
    };
  }

  /**
   * Start to monitore the user current position to mappinh the food location
   */
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ position });
    }, null, {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 1000
    });

    this.watchID = navigator.geolocation
      .watchPosition(position => this.setState({ position }));
  }

  /**
   * Unwatch the user location position
   * @return {[type]} [description]
   */
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  /**
   * Save the food to the Storage.
   * @method save
   */
  save() {
    const alert = (message, buttons) => Alert.alert('Atenção', message, buttons);

    Storage.save(this.state)
      .then(() => alert('Alimento mapeado com sucesso. Deseja salvar um novo?', [{
        text: 'Não', onPress: Actions.dash
      }, {
        text: 'Sim', onPress: () => this.setState(Found.initialState())
      }]))
      .catch(message => {
        alert(message);
      });
  }

  /**
   * Render the View component with the form
   * @return {View} View Component
   */
  render() {
    /**
     * Start in the global visualization
     * @type {MapView}
     */
    let staticMap = (
      <MapView
        initialRegion={{
          latitude: -24.0887932,
          longitude: -66.3542283,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        style={Styles.locationMap}
      />
    );
    const { expiration, foodName, foodType, position } = this.state;

    /**
     * When the user current position change, set MapView and zoom it
     */
    if (position.coords) {
      staticMap = (
        <MapView
          region={{
            ...position.coords,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
          }}
          style={Styles.locationMap}
        >
          <MapView.Marker
            coordinate={position.coords}
            title={foodName || 'Local do Alimento'}
          />
        </MapView>
      );
    }

    return (
      <View style={Styles.main}>
        <TextInput
          defaultValue={foodName}
          onChangeText={name => this.setState({ foodName: name })}
          placeholder="Nome do Alimento"
          style={Styles.input}s
          underlineColorAndroid="transparent"
        />
        <MultipleChoice
          choiceStyle={Styles.foodTypeChoice}
          defaultValues={foodType}
          onChangeValue={values => this.setState({ foodType: values })}
          options={Storage.getFoodTypes()}
          optionsStyle={Styles.foodTypeChoiceButton}
          selectedBackgroundColor="#4DBA75"
          selectedColor="#fff"
        />
        <DatePicker
          cancelBtnText="Cancelar"
          confirmBtnText="OK"
          customStyles={{
            dateInput: Styles.dateInput,
            dateText: Styles.dateText,
          }}
          date={expiration}
          format="DD/MM/YYYY"
          minDate={new Date()}
          mode="date"
          onDateChange={date => this.setState({ expiration: date })}
          placeholder="Vencimento"
          showIcon={false}
          style={Styles.dateContainer}
        />
        <Text style={Styles.locationLabel}>
          Localização Atual{ !staticMap ? ': aguarde...' : ''}
        </Text>
        {staticMap}
        <Button
          buttonStyle={Styles.foundButtonSave}
          onPress={() => this.save()}
          title="Salvar Mapeamento"
        />
      </View>
    );
  }
}
