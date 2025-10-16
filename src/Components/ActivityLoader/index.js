import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {colors} from '../../theme/colors';

const ActivityLoader = props => {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator
        size={props?.size || 'large'}
        color={props?.color || colors.theme.white}
      />
    </View>
  );
};

export default ActivityLoader;

const styles = StyleSheet.create({
  container: {
    // height : vh*5,
  },
});
