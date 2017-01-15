/*
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

/**
 * Multiple Choice Component to allow the user choose most the one option
 */
export default class MultipleChoice extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: [],
    };
  }

  /**
   * Return the selected options
   * @method  getSelectedValues
   * @return {Array} Array of selected options
   */
  getSelectedValues() {
    return this.state.selected;
  }

  /**
   * Check if given option is selected
   * @method  isSelected
   * @param  {Any}  option
   * @return {Boolean}
   */
  isSelected(option) {
    return this.state.selected.includes(option);
  }

  /**
   * Add or Remove option to the selected list
   * @method  addOrRemoveOption
   * @param {Any} option
   */
  addOrRemoveOption(option) {
    const { onChangeValue } = this.props;
    const { selected } = this.state;
    if (!this.isSelected(option)) {
      selected.push(option);
    } else {
      selected.splice(selected.indexOf(option), 1);
    }

    if (onChangeValue) {
      onChangeValue(selected);
    }

    this.setState({ selected });
  }

  /**
   * Render the View with options to user choose
   * @return {View} View Component
   */
  render() {
    const {
      choiceStyle,
      defaultValues,
      options,
      optionsStyle,
      selectedBackgroundColor,
      selectedColor,
    } = this.props;
    this.state.selected = defaultValues;

    return (
      <View style={[choiceStyle && choiceStyle]}>
        {options.map((option, k) => (
          <TouchableOpacity
            key={k}
            style={[
              optionsStyle && optionsStyle,
              this.isSelected(option) && { backgroundColor: selectedBackgroundColor }
            ]}
            onPress={() => this.addOrRemoveOption(option)}
          >
            <Text
              style={[this.isSelected(option) && { color: selectedColor }]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

MultipleChoice.propTypes = {
  choiceStyle: PropTypes.number,
  defaultValues: PropTypes.arrayOf(PropTypes.string),
  onChangeValue: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  optionsStyle: PropTypes.number,
  selectedBackgroundColor: PropTypes.string.isRequired,
  selectedColor: PropTypes.string.isRequired,
};

MultipleChoice.defaultProps = {
  choiceStyle: {},
  defaultValues: [],
  onChangeValue: () => {},
  optionsStyle: {},
};
