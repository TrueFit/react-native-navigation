import {stateReducer} from 'truefit-react-utils';
import {SET_NAVIGATION_SCHEME} from '../actions';

export default stateReducer(null, {
  [SET_NAVIGATION_SCHEME]: (state, payload) => payload.type,
});