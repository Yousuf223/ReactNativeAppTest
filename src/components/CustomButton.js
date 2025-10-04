import React from 'react';
import {Dimensions, Text, Image, TouchableOpacity} from 'react-native';
import { colors } from '../utils/colors';
import Shadows from '../helpers/Shadows';
const {width} = Dimensions.get('screen');
import {appIcons} from '../assets/index';

export default function CustomButton(props) {
  const {color, title, onPress, buttonStyle, textStyle, disabled, nextBtn,onFocus} =
    props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      onFocus={onFocus}
      style={[
        {
          width: width - 45,
          height: 54,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: color ? color : colors.primary,
          marginTop: '1%',
          borderRadius: 18,
          ...Shadows.shadow5,
          flexDirection: 'row',
          borderRadius: 12,
        },
        buttonStyle,
      ]}>
      <Text
        style={[
          {fontSize: 16, color: colors.white},
          textStyle,
        ]}>
        {title}
      </Text>
      {nextBtn && (
        <Image
          resizeMode="contain"
          source={Icons.next}
          style={{
            height: 22,
            width: 22,
            marginLeft: '4%',
          }}
        />
      )}
    </TouchableOpacity>
  );
}
