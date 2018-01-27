import {NavigationActions} from 'react-navigation';
import {getNavigator} from '../services';
import {SET_NAVIGATION_SCHEME} from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case SET_NAVIGATION_SCHEME: {
      const {initialRoute, type} = action.payload;
      const navigator = getNavigator(type);

      let initialNavState = navigator.router.getStateForAction(NavigationActions.init());

      // the tab navigator decides to put a bunch of child actions on this that we don't want, so truncate those
      const actionForPath = navigator.router.getActionForPathAndParams(initialRoute);
      delete actionForPath.action;

      return navigator.router.getStateForAction(actionForPath);
    }

    case NavigationActions.INIT:
    case NavigationActions.BACK:
    case NavigationActions.RESET:
    case NavigationActions.NAVIGATE:
    case NavigationActions.SET_PARAMS:
    case NavigationActions.URI: {
      const navigator = getNavigator();
      if (!navigator) {
        return state;
      }

      const nextState = navigator.router.getStateForAction(action, state);

      return nextState || state;
    }

    default:
      return state;
  }
};
