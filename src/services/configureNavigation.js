import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';

import {MIDDLEWARE_KEY} from '../constants';
import {createNavigator} from '../global/navigator';

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export const navigationMiddleware = createReactNavigationReduxMiddleware(MIDDLEWARE_KEY, state => state.nav);

export default (Navigator, routeConfig, navigatorConfig, initialRoute) => {
  createNavigator(Navigator, routeConfig, navigatorConfig, initialRoute);
};


