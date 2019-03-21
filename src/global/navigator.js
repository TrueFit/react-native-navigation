import {connect} from 'react-redux';
import {createReduxContainer} from 'react-navigation-redux-helpers';

export let AppNavigator = null; // eslint-disable-line
export let ReduxContainer = null; // eslint-disable-line
export let InitialRoute = null; // eslint-disable-line

const mapStateToProps = state => ({
  state: state.navigation,
});

export const createNavigator = (
  createRootNavigator,
  routeConfig,
  navigatorConfig,
  initalRoute
) => {
  AppNavigator = createRootNavigator(routeConfig, navigatorConfig);
  ReduxContainer = connect(mapStateToProps)(createReduxContainer(AppNavigator));

  InitialRoute = initalRoute;
};
