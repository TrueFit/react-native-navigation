import {createNavigationReducer} from 'react-navigation-redux-helpers';

export default () =>
  createNavigationReducer(require('../global/navigator').AppNavigator);
