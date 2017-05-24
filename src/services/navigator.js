import {DrawerNavigator, StackNavigator} from 'react-navigation';
import StandaloneNavigator from '../navigators/standaloneNavigator';

import {navigation, STANDALONE, STACK, DRAWER, TAB} from './index';

// in general, we want singleton root navigator
const createNavigator = {
  [STANDALONE]: () => StandaloneNavigator(navigation.routes),
  [STACK]: () => StackNavigator(navigation.routes),
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