import {createNavigationReducer} from 'react-navigation-redux-helpers';

export default () => {
  const {AppNavigator} = require('../global/navigator');
  return createNavigationReducer(AppNavigator);
};
