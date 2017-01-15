/*
 * @flow
 */
import React, { PropTypes } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import TimeAgo from 'react-native-timeago';

import Styles from '../styles';

/**
 * Render Subtitle Component to ListItem
 * @param  {Object} food
 * @return {View} View Component
 */
const renderSubtitle = food => {
  const { expiration, foodType } = food;

  return (
    <View style={Styles.foodSubtitle}>
      <Text style={Styles.foodSubtitleText}>{foodType.join(',')}</Text>
      <Text style={Styles.foodSubtitleText}>
        Venc. <TimeAgo time={expiration} />
      </Text>
    </View>
  );
};

/**
 * FoodList item to show foods with name, food type and expiration time
 * @param  {Object} props
 * @return {View}
 */
const FoodList = ({ foods, goMarker }) => (
  <View style={Styles.hungryFoodList}>
    <Text style={Styles.foodListHeader}>
      {foods ? `${foods.length} alimento(s) encontrado(s)` : 'Buscando...'}
    </Text>
    <ScrollView>
      <List containerStyle={{ marginTop: 0 }}>
        {foods && foods.map((food, key) => (
          <TouchableOpacity
            key={food.id}
            onPress={() => goMarker && goMarker(food.id, key)}
          >
            <ListItem
              style={{ marginTop: 0 }}
              title={food.foodName}
              titleStyle={Styles.foodTitleText}
              subtitle={renderSubtitle(food)}
            />
          </TouchableOpacity>
        ))}
      </List>
    </ScrollView>
  </View>
);

FoodList.propTypes = {
  foods: PropTypes.arrayOf(React.PropTypes.object),
  goMarker: PropTypes.func
};

export default FoodList;
