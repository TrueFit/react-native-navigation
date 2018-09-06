import {connect} from 'react-redux';
import {reduxifyNavigator} from 'react-navigation-redux-helpers';
import {MIDDLEWARE_KEY} from '../constants';

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

  ReduxNavigator = connect(mapStateToProps)(
    reduxifyNavigator(AppNavigator, MIDDLEWARE_KEY)
  );

  InitialRoute = initalRoute;
};
