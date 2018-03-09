import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {MIDDLEWARE_FLAG} from '../constants';

export default () => createReactNavigationReduxMiddleware(MIDDLEWARE_FLAG, state => state.nav);
