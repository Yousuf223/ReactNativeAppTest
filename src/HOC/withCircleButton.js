import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {vw} from '../theme/units';

const withCircleButton = WrappedComponent => {
  return props => {
    const customStyle = [
      {
        width: vw * 16,
        height: vw * 16,
        borderRadius: vw * 14,
      },
    ];
    return <WrappedComponent {...props} style={customStyle} />;
  };
};

export default withCircleButton;

const styles = StyleSheet.create({});
