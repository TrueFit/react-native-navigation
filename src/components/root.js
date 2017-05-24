import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';

import {navigationStateSelector, navigationTypeSelector} from '../selectors';
import {getNavigator} from '../services';

// the container component
class Root extends Component {
  render() {
    const {navigationType, navigationState, dispatch} = this.props;
    if (!navigationType) {
      return null;
    }

    const Navigator = getNavigator(navigationType);
    const nav = addNavigationHelpers({dispatch, state: navigationState});

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
