import {createSelector} from 'reselect';
import immutableSelector from './immutableSelector';
import reduxNavigationSelector from './reduxNavigationSelector';
import immutableNavigationSelector from './immutableNavigationSelector';

export default createSelector(immutableSelector, immutableNavigationSelector, reduxNavigationSelector,
  (immutable, immutableNav, reduxNav) => (immutable ? immutableNav : reduxNav));

