import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {spacing} from '../../theme/styles';

const DuoBoxContainer = ({children1, children2}) => {
  return (
    <View style={styles?.workoutPlanContainer}>
      <View style={styles?.upperBoxContainer}>{children1}</View>
      <View style={styles?.lowerBoxContainer}>{children2}</View>
    </View>
  );
};

export default DuoBoxContainer;
export const styles = StyleSheet.create({
  workoutPlanContainer: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: spacing?.large,
  },
  upperBoxContainer: {
    backgroundColor: '#1D1F24',
    borderBottomWidth: 2,
    borderBottomColor: '#111318',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: spacing?.large,
  },
  lowerBoxContainer: {
    backgroundColor: '#2A2C31',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
