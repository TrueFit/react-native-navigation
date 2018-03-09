import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import {createReduxBoundAddListener} from 'react-navigation-redux-helpers';
import autobind from 'autobind-decorator';

import {back} from '../actions';

import {navigationStateSelector, navigationTypeSelector} from '../selectors';
import {getNavigator} from '../services';

import {MIDDLEWARE_FLAG} from '../constants';

const addListener = createReduxBoundAddListener(MIDDLEWARE_FLAG);

class Root extends Component {
  // lifecycle
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  // actions
  @autobind
  onBackPress() {
    const {dispatch, nav} = this.props;
    if (nav.index === 0) {
      return false;
    }

    dispatch(back());
    return true;
  }

  // render
  render() {
    const {navigationType, navigationState, dispatch} = this.props;
    if (!navigationType) {
      return null;
    }

    const Navigator = getNavigator(navigationType);
    const nav = addNavigationHelpers({dispatch, state: navigationState, addListener});

    return (
      <Navigator navigation={nav} />
    );
  }
}

const mapStateToProps = state => ({
  navigationState: navigationStateSelector(state),
  navigationType: navigationTypeSelector(state),
});

export default connect(mapStateToProps)(Root);
