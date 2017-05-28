/* eslint-disable new-cap */
import _ from 'lodash';
import {DrawerNavigator, StackNavigator} from 'react-navigation';

const defaultDrawerConfig = {
  drawerWidth: 250,
  drawerPosition: 'right',
};

export const createDrawerNavigator = (config, routes) => {
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
