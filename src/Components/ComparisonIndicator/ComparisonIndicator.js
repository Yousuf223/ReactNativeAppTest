import {StyleSheet, View} from 'react-native';
import React from 'react';
import {spacing} from '../../theme/styles';
import CustomText from '../wrappers/Text/CustomText';

const ComparisonIndicator = ({label1, label2}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, {backgroundColor: '#E62720'}]} />
      <CustomText text={label1 || 'As IS'} />
      <View style={[styles.circle, {backgroundColor: '#F7DD6E'}]} />
      <CustomText text={label2 || 'Best Self'} />
    </View>
  );
};

export default ComparisonIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.small,
    paddingTop: spacing.large,
    alignItems: 'center',
  },
  circle: {
    height: spacing.medium,
    width: spacing.medium,
    borderRadius: 100,
  },
});
