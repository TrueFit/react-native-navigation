import {getNavigator} from '../services';
import {SET_NAVIGATION_SCHEME} from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case SET_NAVIGATION_SCHEME: {
      const {initialRoute, type} = action.payload;
      const navigator = getNavigator(type);

      return navigator.router.getStateForAction(
        navigator.router.getActionForPathAndParams(initialRoute)
      );
    }

    default: {
      const navigator = getNavigator();
      if (!navigator) {
        return state;
      }

      const nextState = navigator.router.getStateForAction(action, state);

      return nextState || state;
    }
  }
};
