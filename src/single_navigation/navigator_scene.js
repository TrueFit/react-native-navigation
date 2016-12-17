import React, {Component, PropTypes} from 'react';
import {NavigationExperimental, View, Text, StyleSheet} from 'react-native';
import autobind from 'class-autobind';

const {
  Card: NavigationCard,
} = NavigationExperimental;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export class NavigatorScene extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  renderFourOFour(key) {
    return (
      <View style={styles.container}>
        <Text>Route for {key} not found</Text>
      </View>
    );
  }

  renderScene(route) {
    const sceneKey = route.scene.route.route;
    const sceneConfig = this.props.routeMap[sceneKey];

    // handle bad config
    if (!sceneConfig) {
      return this.renderFourOFour(sceneKey);
    }

    // render
    const Child = sceneConfig.component;
    return (
      <View style={styles.container}>
        <Child />
      </View>
    );
  }

  render() {
    return (
      <NavigationCard {...this.props} renderScene={this.renderScene} />
    );
  }
}

NavigatorScene.propTypes = {
  routeMap: PropTypes.object.isRequired,
};
