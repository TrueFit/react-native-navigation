import React, {Component} from 'react'; // eslint-disable-line
import {NavigationActions} from 'react-navigation';

const INITIAL_ROUTE = 'INITIAL_ROUTE';

const navigate = action =>
  ({
    index: 0,
    routes: [
      {
        routeName: action.routeName,
        key: action.routeName,
        ...action.params,
      },
    ],
  });

const StandaloneRouter = routes =>
  ({
    getStateForAction: action => {
      switch (action.type) {
        case INITIAL_ROUTE:
          return {
            index: 0,
            routes: [
              {
                routeName: action.payload.path,
                key: action.payload.path,
                ...action.payload.params,
              },
            ],
          };

        case NavigationActions.NAVIGATE:
          return navigate(action);

        case NavigationActions.RESET: {
          if (action.routeName) {
            return navigate(action);
          }

          const innerAction = action.actions > 0 ? action.actions[0] : null;
          if (!innerAction) {
            return null;
          }

          return {
            index: 0,
            routes: [
              {
                routeName: innerAction.routeName,
                key: innerAction.routeName,
                ...innerAction.params,
              },
            ],
          };
        }

        default:
          return null;
      }
    },

    getActionForPathAndParams: (path, params) =>
      ({
        type: INITIAL_ROUTE,
        payload: {path, params},
      }),

    getPathAndParamsForState: state =>
      ({
        path: state.routes[state.index].routeName,
      }),

    getComponentForState: state => {
      const routeName = state.routes[state.index].routeName;
      return (routes[routeName] || {}).screen || null;
    },

    getComponentForRouteName: routeName =>
      (routes[routeName] || {}).screen || null,
  });

export const StandaloneNavigator = routes => {
  const router = StandaloneRouter(routes); // eslint-disable-line

  class Navigator extends Component {
    static router = router;

    render() {
      const Component = router.getComponentForState(this.props.navigation.state); // eslint-disable-line

      return <Component />;
    }
  }

  return Navigator;
};
