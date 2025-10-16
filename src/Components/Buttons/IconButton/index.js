import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import {layout} from '../../../theme/styles';
import styles from './styles';
import MyIcons from '../../MyIcons';
import CustomText from '../../wrappers/Text/CustomText';

const IconButton = ({
  disabled,
  icon,
  style,
  iconStyle,
  onPress,
  text,
  item,
  textStyle,
  preText,
  filled,
}) => {
  return (
    <View>
      <TouchableOpacity
        disabled={onPress == undefined || onPress == null ? true : disabled}
        style={[styles.container, layout.flexRow, style]}
        onPress={() => {
          onPress && onPress(item);
        }}>
        {preText && (
          <CustomText text={`${preText}  `} style={[styles.text, textStyle]} />
        )}
        <MyIcons name={icon} />
        {text && <CustomText text={text} style={[styles.text, textStyle]} />}
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;
