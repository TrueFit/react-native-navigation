import React, {PropTypes} from 'react';
import {NavigationExperimental, StyleSheet} from 'react-native';

const {
  Header: NavigationHeader,
} = NavigationExperimental;

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
});

export const NavigatorHeader = props => {
  const sceneKey = props.scene.route.route;
  const sceneConfig = props.routeMap[sceneKey];

  if (sceneConfig.hidesNavigation) {
    return null;
  }

  if (sceneConfig.headerComponent) {
    const HeaderComponent = sceneConfig.headerComponent;
    return <HeaderComponent />;
  }

  return null;
  // const sceneKey = ;
  // const sceneConfig = this.props.routeMap[sceneKey];
  //
  // return (
  //   <NavigationHeader
  //     {...props}
  //     style={styles.header}
  //     renderTitleComponent={propsInner =>
  //       <HeaderTitle {...propsInner.scene.navigationState} />
  //     }
  //     renderRightComponent={propsInner =>
  //       <HeaderRight {...propsInner.scene.navigationState} />
  //     }
  //     renderLeftComponent={propsInner =>
  //       <HeaderLeft {...propsInner.scene.navigationState} />
  //     }
  //   />
  // );
};

NavigatorHeader.propTypes = {
  scene: PropTypes.object.isRequired,
  routeMap: PropTypes.object.isRequired,
};
