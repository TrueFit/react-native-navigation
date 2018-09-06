import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';

import {MIDDLEWARE_KEY} from '../constants';
import {createNavigator} from '../global/navigator';

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
export const navigationMiddleware = createReactNavigationReduxMiddleware(
  MIDDLEWARE_KEY,
  state => state.navigation
);

export default (
  createRootNavigator,
  routeConfig,
  navigatorConfig,
  initialRoute
) => {
  createNavigator(
    createRootNavigator,
    routeConfig,
    navigatorConfig,
    initialRoute
  );
};
