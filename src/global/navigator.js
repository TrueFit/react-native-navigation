import {createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import {createReduxContainer} from 'react-navigation-redux-helpers';

export let AppContainer = null;
export let AppNavigator = null; // eslint-disable-line
export let ReduxNavigator = null; // eslint-disable-line
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
  ReduxNavigator = connect(mapStateToProps)(createReduxContainer(AppNavigator));

  AppContainer = createAppContainer(ReduxNavigator);

  InitialRoute = initalRoute;
};
