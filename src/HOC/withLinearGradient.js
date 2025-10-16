import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {layout} from '../theme/styles';
import { vh } from '../theme/units';

const withLinearGradient = (WrappedComponent, colors, defaultStyle = {}) => {
  return props => {
    const {disabled, style: propStyle, ...otherProps} = props;
    
    const disabledBtnColors = ['#FF7F7F', '#FF6666'];

    return (
      <View style={[styles.outerContainer, propStyle]}>
        <LinearGradient
          colors={!disabled ? colors : disabledBtnColors}
          style={[styles.gradient, defaultStyle]}>
          <WrappedComponent 
            {...otherProps} 
            style={styles.innerComponent} 
          />
        </LinearGradient>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  outerContainer: {
    // This will take the width from parent
  },
  gradient: {
    borderRadius: layout.borderRadius,
    minHeight: vh * 6,
  },
  innerComponent: {
    backgroundColor: 'transparent',
  },
});

export default withLinearGradient;