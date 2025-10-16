import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SlidingProgressBar from './SlidingProgressBar';
import ProgressBar from './ProgressBar';
import {LabelComponent} from '../InputField';

const MeterProgressBar = ({label}) => {
  return (
    <View>
      <LabelComponent label={label} required />
      <ProgressBar />
    </View>
  );
};

export default MeterProgressBar;

const styles = StyleSheet.create({});
