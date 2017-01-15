/*
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import { Button, Card, ListItem } from 'react-native-elements';
import moment from 'moment';

import Styles from '../styles';

/**
 * FoodCard component
 *
 * Render the a Card with food found informations. Silently, try to get the
 * approximate address to food location, if ok, show then.
 * If remove function is present, show the remove button.
 *
 * Usage:
 * <FoodCard food={{
 *    expiration: Date,
 *    foodName: String,
 *    foodType: Array,
 *    id: String,
 *    position: Object
 *  }}
 *  remove={() => {}}
 * />
 *
 */
export default class FoodCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      address: false
    };
  }

  /**
   * Try get the approximate address to food location
   * @method componentDidMount
   */
  componentDidMount() {
    const { position: { coords: { latitude, longitude } } } = this.props.food;
    this.getAddress([latitude, longitude]);
  }

  /**
   * Fetch the Google Maps Api with latitude and longitude to try get an address
   * @method  getAddress
   * @param  {Array} With latitude and longitude info
   */
  getAddress([latitude, longitude]) {
    fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`)
      .then(response => response.json())
      .then(response => {
        const { results } = response;
        if (!results.length) {
          return false;
        }
        const address = results[0].formatted_address;

        return this.setState({ address });
      })
      .catch();
  }

  /**
   * Render Card component with food Data
   * @return {Card} Card Component
   */
  render() {
    const { food, remove } = this.props;
    const { address } = this.state;
    const { position: { coords: { latitude, longitude } } } = food;

    return (
      <Card
        containerStyle={Styles.foodCard}
        dividerStyle={{ marginBottom: 0 }}
        key={food.id}
        title={food.foodName.toUpperCase()}
        titleStyle={Styles.foodCardTitle}
      >
        <ListItem
          containerStyle={Styles.foodCardItem}
          hideChevron
          title={food.foodType.join(', ')}
          subtitle="Tipo de Alimento"
        />
        <ListItem
          containerStyle={Styles.foodCardItem}
          hideChevron
          title={moment(food.expiration).format('DD/MM/YYYY')}
          subtitle="Vencimento"
        />
        <ListItem
          containerStyle={Styles.foodCardItem}
          hideChevron
          title={`${latitude}, ${longitude}`}
          subtitle="Coordenadas"
        />
        {address && (
          <ListItem
            containerStyle={Styles.foodCardItem}
            hideChevron
            title={address}
            subtitle="Endereço Aproximado"
          />
        )}
        <ListItem
          containerStyle={Styles.foodCardItem}
          hideChevron
          title={food.id}
          subtitle="INFO"
        />
        {remove && (<Button
          backgroundColor="#FA5D43"
          buttonStyle={Styles.foundButtonRemove}
          icon={{ name: 'remove-circle' }}
          onPress={() => remove(food)}
          title="APAGAR"
        />)}
      </Card>
    );
  }
}

FoodCard.propTypes = {
  food: PropTypes.shape({
    expiration: PropTypes.string,
    foodName: PropTypes.string,
    foodType: PropTypes.array,
    id: PropTypes.string,
    position: PropTypes.object,
  }).isRequired,
  remove: PropTypes.func
};

FoodCard.defaultProps = {
  remove: null
};
