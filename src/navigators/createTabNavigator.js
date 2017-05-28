/* eslint-disable new-cap */
import _ from 'lodash';
import {TabNavigator, StackNavigator} from 'react-navigation';

export const createTabNavigator = (config, routes) => {
  const tabRoutes = _.reduce(config.routes, (result, route, key) => ({
    ...result,
    [key]: {screen: StackNavigator(routes, {initialRouteName: route.screen})},
  }), {});

  return TabNavigator(tabRoutes, config.config);
};
