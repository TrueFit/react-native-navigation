import {reduxifyNavigator} from 'react-navigation-redux-helpers';
import {MIDDLEWARE_KEY} from '../constants';

export let AppNavigator = null; // eslint-disable-line
export let InitialRoute = null; // eslint-disable-line

export const createNavigator = (
  createNavigator,
  routeConfig,
  navigatorConfig,
  initalRoute
) => {
  AppNavigator = reduxifyNavigator(
    createNavigator(routeConfig, navigatorConfig),
    MIDDLEWARE_KEY
  );

  InitialRoute = initalRoute;
};
