/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('@react-native-community/netinfo', () => {});
/*jest.mock('@react-native-picker/picker', () => {
  return {
    Picker: () => {
      return {
        Item: () => {
          return null;
        },
      };
    },
  };
});*/

it('renders correctly', () => {
  renderer.create(<App />);
});
