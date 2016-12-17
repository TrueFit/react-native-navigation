import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {NavigationExperimental, StyleSheet} from 'react-native';
import autobind from 'class-autobind';

import {NavigatorScene} from './navigator_scene';

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Navigator extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  renderScene(sceneProps) {
    return <NavigatorScene {...sceneProps} routeMap={this.props.routeMap} />;
  }

  render() {
    return (
      <NavigationCardStack
        navigationState={this.props.navigation}
        style={styles.container}
        renderScene={this.renderScene} />
    );
  }
}

Navigator.propTypes = {
  navigation: PropTypes.object.isRequired,
  routeMap: PropTypes.object.isRequired,
};

// redux
export const SingleNavigator = connect(({navigation}) => ({navigation}))(Navigator);
