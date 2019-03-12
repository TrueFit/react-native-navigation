import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';

import {ReduxNavigator} from '../global/navigator';
import {navigationSelector} from '../selectors';
import {HARDWARE_BACK_PRESS} from '../constants';

class ConnectedNavigator extends Component {
  constructor(props) {
    super(props);

    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(HARDWARE_BACK_PRESS, this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(HARDWARE_BACK_PRESS, this.onBackPress);
  }

  onBackPress() {
    const {dispatch, nav} = this.props;
    if (nav.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    return <ReduxNavigator />;
  }
}

const mapStateToProps = (state, props) => ({
  nav: navigationSelector(state, props),
});

export default connect(mapStateToProps)(ConnectedNavigator);
