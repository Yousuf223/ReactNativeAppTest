import React from 'react';
import {View, StyleSheet} from 'react-native';
import {vw} from '../../theme/units';

const SpaceLine = ({style}) => {
  return <View style={[styles.spaceLine, style]} />;
};

const styles = StyleSheet.create({
  spaceLine: {
    margin: vw * 5,
  },
});

export default SpaceLine;
