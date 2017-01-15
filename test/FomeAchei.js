import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import FomeAchei from '../src/FomeAchei';

it('renders correctly', () => {
  const tree = renderer.create(
    <FomeAchei />
  );

  expect(tree).toMatchSnapshot();
});
