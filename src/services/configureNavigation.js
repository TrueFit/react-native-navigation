import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {createNavigator} from '../global/navigator';

// Note: createReactNavigationReduxMiddleware must be run before createReduxContainer
export const navigationMiddleware = createReactNavigationReduxMiddleware(
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
