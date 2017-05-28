/* eslint-disable new-cap */
import {StackNavigator} from 'react-navigation';
import {StandaloneNavigator, createDrawerNavigator, createTabNavigator} from '../navigators';

import {navigation, STANDALONE, STACK, DRAWER, TAB} from './index';

const createNavigator = {
  [STANDALONE]: () => StandaloneNavigator(navigation.routes),
  [STACK]: () => StackNavigator(navigation.routes),
  [DRAWER]: () => createDrawerNavigator(navigation.drawer, navigation.routes),
  [TAB]: () => createTabNavigator(navigation.tabs, navigation.routes),
};

const Navigator = {
  type: null,
  navigator: null,
};

export const getNavigator = type => {
  if (!type) {
    return Navigator.navigator;
  }

  if (type === Navigator.type) {
    return Navigator.navigator;
  }

  Navigator.type = type;
  Navigator.navigator = createNavigator[type]();

  return Navigator.navigator;
};
