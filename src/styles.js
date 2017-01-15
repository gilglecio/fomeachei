/**
 * @flow
 */
import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const inputWidth = width - 20;

/**
 * Main Colors
 * @type {Object}
 */
const colors = {
  mainBackground: '#373849',
  found: '#4DBA75',
  hungry: '#FA5D43',
};

/**
 * Components default main style values
 * @type {Object}
 */
const main = {
  backgroundColor: colors.mainBackground,
  paddings: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20
  }
};

/**
 * FomeAchei Full Styleshet
 *
 * Considerations: Some styles is inline in their components but
 *                 is just rules with one property, max two
 *
 * @type {Object}
 */
export default StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 6,
    height: 200,
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 20,
    width: 200,
  },
  actionTextMain: {
    fontSize: 46
  },
  actionTextSub: {
    fontSize: 16
  },
  autocompleteList: {
    height: 150,
    marginTop: 40,
    position: 'absolute',
    zIndex: 10000,
  },
  dash: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent',
    width: inputWidth,
    marginBottom: 20,
    height: 50,
  },
  dateInput: {
    alignItems: 'flex-start',
    width: inputWidth,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'transparent',
  },
  dateText: {
    color: '#111'
  },
  foodCard: {
    margin: 0,
    marginTop: 10,
    marginRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  foodCardItem: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  foodCardTitle: {
    color: colors.found,
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodListHeader: {
    backgroundColor: '#CCC',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  foodTypeChoice: {
    backgroundColor: '#FFFFFF',
    height: 50,
    flexDirection: 'row',
    marginBottom: 20,
    width: inputWidth,
  },
  foodTypeChoiceButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  },
  foodSubtitle: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  foodSubtitleText: {
    color: '#999',
    flex: 1,
    fontSize: 11,
  },
  foodTitleText: {
    fontSize: 14,
  },
  foundButton: {
    borderColor: '#4DBA75'
  },
  foundButtonRemove: {
    backgroundColor: colors.hungry,
    height: 50,
    marginLeft: 0,
    marginRight: 0
  },
  foundButtonSave: {
    backgroundColor: colors.found,
    height: 50,
    marginLeft: 0,
    marginRight: 0,
  },
  foundText: {
    color: '#4DBA75',
  },
  hungryButton: {
    borderColor: colors.hungry,
  },
  hungryFoodList: {
    flex: 1,
    marginTop: 20
  },
  hungryMap: {
    flex: 1
  },
  hungryText: {
    color: colors.hungry,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent',
    height: 50,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    width: inputWidth,
  },
  inputField: {
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    width: inputWidth,
  },
  locationLabel: {
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent',
    height: 40,
    padding: 10
  },
  locationMap: {
    height: 180,
    marginBottom: 20,
    width: inputWidth,
  },
  main: {
    backgroundColor: main.backgroundColor,
    flex: 1,
    ...main.paddings,
  },
  menu: {
    backgroundColor: '#272B34',
    borderBottomColor: 'transparent',
    borderColor: 'transparent',
    flex: 1,
  },
  menuButton: {
    padding: 15,
    width: 70,
  },
  menuText: {
    color: '#E2E3E5',
    fontSize: 18,
    marginLeft: 14
  },
  navbar: {
    backgroundColor: '#373849',
    height: 60,
    flexDirection: 'row',
  },
  navbarTitle: {
    marginTop: Platform.OS !== 'android' ? 8 : 0,
    color: '#E2E3E5',
    flex: 2,
    fontSize: 22,
    letterSpacing: 1,
    lineHeight: 52,
    textAlign: 'left',
  }
});
