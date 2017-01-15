import { AsyncStorage } from 'react-native';
import moment from 'moment';

import FakeData from './FakeData';

/**
 * Storage service
 */
export default class Storage {

  /**
   * Localstorage food key
   * @static
   * @parameter
   * @type {String}
   */
  static foodKey = '@Food:founded';

  /**
   * Get foods mapped by the user
   * @static
   * @method  getFoodsByMe
   * @return {Promise}
   */
  static getFoodsByMe() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(Storage.foodKey)
        .then(foods => {
          const result = JSON.parse(foods);
          return setTimeout(() => resolve(result || []), 1000);
        })
        .catch(() => reject('Não foi possível acessar os dados.'));
    });
  }

  /**
   * Food types
   * @static
   * @method  getFoodsTypes
   * @return {Array}
   */
  static getFoodTypes() {
    return ['Carboidrato', 'Proteína', 'Vitamina'];
  }

  /**
   * Remove item from the storage
   * @static
   * @method  removeFoodById
   * @param  {String} id
   * @return {Promise}
   */
  static removeFoodById(id) {
    return this.getFoodsByMe()
      .then(foods => {
        const newFoods = foods.filter(f => f.id !== id);
        return AsyncStorage.setItem(Storage.foodKey, JSON.stringify(newFoods));
      });
  }

  /**
   * Validate and Save the food object to the Storage
   * @static
   * @method  save
   * @param  {Object} item
   * @return {Promise}
   */
  static save(item) {
    return new Promise((resolve, reject) => {
      const { foodName, foodType, position } = item;
      let { expiration } = item;

      if (!expiration || !foodName || !foodType || !position) {
        return reject('Todos os campos são obrigatórios.');
      }

      expiration = moment(item.expiration, 'DD/MM/YYYY')
        .hours(23).minutes(59).seconds(59)
        .toDate();

      AsyncStorage.getItem(Storage.foodKey)
        .then(foods => {
          const data = foods ? JSON.parse(foods) : [];
          const newItem = {
            ...item,
            id: String(Date.now()),
            expiration
          };
          data.push(newItem);

          return AsyncStorage.setItem(Storage.foodKey, JSON.stringify(data))
            .then(() => resolve(newItem))
            .catch(() => reject('Não foi possível salvar os dados.'));
        })
        .catch(() => reject('Não foi possível acessar os dados.'));
    });
  }

  /**
   * Search food near the given coords
   * @static
   * @method  search
   * @param  {Object} coords
   * @return {Promise}
   */
  static search(coords) {
    let foods = FakeData.generateFoods({
      coords,
      types: Storage.getFoodTypes(),
      range: [3, 6]
    });

    return Storage.getFoodsByMe()
      .then(items => {
        foods = [
          ...foods,
          ...items
        ].sort((a, b) => new Date(a.expiration) - new Date(b.expiration));

        return new Promise(resolve => {
          setTimeout(() => resolve(foods), 1000);
        });
      });
  }
}
