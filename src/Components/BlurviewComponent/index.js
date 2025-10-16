import React from 'react';
import {StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const BlurviewComponent = ({visible}) => {
  if (visible) {
    return (
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={2}
        reducedTransparencyFallbackColor="white"
      />
    );
  } else {
    return null;
  }
};

export default BlurviewComponent;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
