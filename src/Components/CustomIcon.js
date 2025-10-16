import {Image, StyleSheet,TouchableOpacity, View} from 'react-native';
import React from 'react';


const CustomIcon = props => {
  const {
    size,
    src,
    resizeMode = 'contain',
    customIconStyle,
    customIconWrapper,
    tintColor,
    bgColor,
    disabled,
    onPress,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.1}
      disabled={disabled}
      onPress={onPress}
      style={[
        {height: size, width: size, backgroundColor: bgColor},
        customIconWrapper,
      ]}>
      <Image
        source={src}
        style={[styles?.img, customIconStyle]}
        resizeMode={resizeMode}
        tintColor={tintColor}
      />
    </TouchableOpacity>
  );
};

export default CustomIcon;

const styles = StyleSheet.create({
  img: {
    height: '100%',
    width: '100%',
  },
});
