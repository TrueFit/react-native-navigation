import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import autoBind from 'class-autobind';
import {addNavigationHelpers} from 'react-navigation';
import {back} from '../actions';

import {navigationStateSelector, navigationTypeSelector} from '../selectors';
import {getNavigator} from '../services';

// the container component
class Root extends Component {

  constructor() {
    super();
    autoBind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress() {
    const {handleBack, navigationState} = this.props;
    if (navigationState.index === 0) {
      return false;
    }

    handleBack();
    return true;
  }

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

export default connect(mapStateToProps, {handleBack: back})(Root);
