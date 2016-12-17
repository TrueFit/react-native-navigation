import {NavigationExperimental} from 'react-native';
import {stateReducer} from 'truefit-react-utils';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

// helpers
const sceneForRoute = route =>
  ({
    key: `${route}-${Date.now()}`,
    route,
  });

const navigationTree = route =>
  ({
    index: 0,
    routes: [sceneForRoute(route)],
  });

// reducer
export const navigationReducer = initialScene => {
  const initialState = navigationTree(initialScene);

  return stateReducer(initialState, {
    NAVIGATION_PUSH: (state, route) =>
      NavigationStateUtils.push(state, sceneForRoute(route)),

    NAVIGATION_POP: state => {
      if (state.index === 0) {
        return state;
      }

      return NavigationStateUtils.pop(state);
    },

    NAVIGATION_RESET: () => initialState,

    NAVIGATION_RESET_TO: (state, route) => navigationTree(route),
  });
};
