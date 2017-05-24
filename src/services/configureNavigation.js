import {setNavigationScheme} from '../actions';

// configuration
export const STANDALONE = 'STANDALONE';
export const STACK = 'STACK';
export const DRAWER = 'DRAWER';
export const TAB = 'TAB';

export const navigation = {
  drawer: null,
  tabs: null,

  routes: null,
};

export const configureNavigation = (store, config) => {
  navigation.drawer = config.drawer;
  navigation.tabs = config.tabs;
  navigation.routes = config.routes;

  const {type, route} = config.initialConfig;
  store.dispatch(setNavigationScheme(type, route));
};
