import React, {Component} from 'react';

const INITIAL_ROUTE = 'INITIAL_ROUTE';

const StandaloneRouter = routes => {
  return {
    getStateForAction: (action) => {
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
            ]
          };
      }

      return null;
    },

    getActionForPathAndParams: (path, params) => {
      return {
        type: INITIAL_ROUTE,
        payload: {path, params},
      };
    },

    getPathAndParamsForState: (state) => {
      return {
        path: state.routes[state.index].routeName,
      };
    },

    getComponentForState: (state) => {
      const routeName = state.routes[state.index].routeName;
      return routes[routeName].screen;
    },

    getComponentForRouteName: (routeName) => {
      return routes[routeName].screen;
    }
  };
};

export default routes => {
  const router = StandaloneRouter(routes);

  class StandaloneNavigator extends Component {
    static router = router;

    render() {
      const Component = router.getComponentForState(this.props.navigation.state);

      return <Component />;
    }
  }

  return StandaloneNavigator;
};
