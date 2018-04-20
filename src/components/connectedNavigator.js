import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BackHandler} from 'react-native';
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import {createReduxBoundAddListener} from 'react-navigation-redux-helpers';
import autobind from 'autobind-decorator';

import {navigationSelector} from '../selectors';
import {AppNavigator} from '../global/navigator';
import {MIDDLEWARE_KEY, HARDWARE_BACK_PRESS} from '../constants';

class ConnectedNavigator extends Component {
  constructor(props) {
    super(props);

    this.addListener = createReduxBoundAddListener(MIDDLEWARE_KEY);
  }

  componentDidMount() {
    BackHandler.addEventListener(HARDWARE_BACK_PRESS, this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(HARDWARE_BACK_PRESS, this.onBackPress);
  }

  @autobind
  onBackPress() {
    const {dispatch, nav} = this.props;
    if (nav.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener: this.addListener,
      })} />
    );
  }
}

const mapStateToProps = state => ({
  nav: navigationSelector(state),
});

export default connect(mapStateToProps)(ConnectedNavigator);


