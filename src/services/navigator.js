import _ from 'lodash';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import StandaloneNavigator from '../navigators/standaloneNavigator';

import {navigation, STANDALONE, STACK, DRAWER, TAB} from './index';

// create DrawerNavigator - TODO: abstract
const defaultDrawerConfig = {
  drawerWidth: 250,
  drawerPosition: 'right',
};

const createDrawerNavigator = (config, routes) => {
  const drawerRoutes = _.reduce(config.routes, (result, route, key) => ({
    ...result,
    [key]: {screen: StackNavigator(routes, {initialRouteName: route.screen})},
  }), {});

  const drawerConfig = {
    ...defaultDrawerConfig,
    ...(config.config || {}),
  };

  return DrawerNavigator(drawerRoutes, drawerConfig);
};


const createNavigator = {
  [STANDALONE]: () => StandaloneNavigator(navigation.routes),
  [STACK]: () => StackNavigator(navigation.routes),
  [DRAWER]: () => createDrawerNavigator(navigation.drawer, navigation.routes),
  [TAB]: () => TabNavigator(navigation.routes),
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
