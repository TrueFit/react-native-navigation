// has to be first because of the npm package requirements
import {createMiddleware} from './services';
export const navigationMiddleware = createMiddleware();

// other exports
export * from './actions';
export * from './components';
export {default as navigationReducer} from './reducers';
export {
  STANDALONE, DRAWER, STACK, TAB,
  configureNavigation,
} from './services';
