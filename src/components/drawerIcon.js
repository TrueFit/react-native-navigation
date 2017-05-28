import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

import {openDrawer} from '../actions';

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});

const DrawerIcon = ({name = 'bars', size = 30, color = '#000', style = styles.icon, openDrawer}) =>
  (
    <TouchableOpacity onPress={openDrawer}>
      <Icon name={name} size={size} color={color} style={style}/>
    </TouchableOpacity>
  );

export default connect(null, {openDrawer})(DrawerIcon);
