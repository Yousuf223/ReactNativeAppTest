import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { easeInEaseOut } from '../../theme/animations';
import { font, layout } from '../../theme/styles';
import styles from './styles';
import MyIcons from '../MyIcons';
import CustomText from '../wrappers/Text/CustomText';
import { colors } from '../../theme/colors';
import fonts from '../../Assets/fonts';
import Animated, { BounceIn, FadeOut } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
const CheckBox = ({
  style,
  selected,
  disabled,
  checked,
  setChecked,
  checkContainerStyle,
  checkStyle,
  text,
  textStyle,
  highligthStyle,
  errors,
}) => {
  const onPress = () => (
    easeInEaseOut(50), setChecked(prevState => !prevState)
  );

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        style={[layout.flexRow, style]}
        onPress={onPress}>
        <View
          style={[
            styles.checkContainer,
            checkContainerStyle,
            (selected || checked) && highligthStyle,
          ]}>
          {(selected || checked) && <AntDesign name={'check'} color="#fff" size={16} />}
        </View>
        {text && <CustomText style={[styles.text, textStyle]} text={text} font={fonts?.benzin?.light} />}
      </TouchableOpacity>
      {errors ? (
        <Animated.View
          exiting={FadeOut.duration(600)}
          entering={BounceIn.duration(300)}>
          <Text style={styles.error}>{errors}</Text>
        </Animated.View>
      ) : (
        <View />
      )}
    </>
  );
};

export default CheckBox;
