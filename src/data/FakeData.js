import moment from 'moment';

import foodDb from './foods.json';

/**
 * Fake Food Data
 */
export default class FakeData {

  /**
   * Generate Coordinates based on center coordinates and given radius
   * @static
   * @method fakePosition
   * @param  {Object} center {latitude, longitude}
   * @param  {Number} radius
   * @return {Object} Coordinates Object with latitude and longitude
   */
  static fakePosition(center, radius) {
    const y0 = center.latitude;
    const x0 = center.longitude;
    const rd = radius / 111300;

    const u = Math.random();
    const v = Math.random();

    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    return {
      coords: {
        latitude: y + y0,
        longitude: x + x0
      }
    };
  }

  /**
   * Generate Foods
   * @static
   * @method generateFoods
   * @param  {Object} options.coords {latitude, longitude}
   * @param  {Array} options.types  List of food types
   * @param  {Array} options.range  [min, max] count results
   * @return {Array}                List of generated foods
   */
  static generateFoods({ coords, types, range }) {
    let foods = foodDb.foods.sort(() => 0.5 - Math.random())
      .slice(0, this.getRandom(range[0], range[1]));

    foods = foods.map(foodName => {
      const position = this.fakePosition(coords, this.getRandom(100, 1000));
      const expiration = this.randomDate();
      const foodType = [types[this.getRandom(0, 2)]];

      return {
        id: String(expiration.getTime()),
        expiration,
        foodName,
        foodType,
        position
      };
    });

    return foods;
  }

  /**
   * Generate Random name in range between min and max given values
   * @static
   * @method getRandom
   * @param  {Number} min
   * @param  {Number} [max]
   * @return {Number}
   */
  static getRandom(min, max = 100000) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
  }

  /**
   * Generate random date
   * @static
   * @method randomDate
   * @return Date
   */
  static randomDate() {
    const date = moment();
    date.add(this.getRandom(1, 30), 'days');
    date.hours(this.getRandom(0, 23)).minutes(this.getRandom(0, 59));
    return date.toDate();
  }
}
