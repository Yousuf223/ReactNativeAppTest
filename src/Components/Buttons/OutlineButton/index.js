import {Image, TouchableOpacity} from 'react-native';

import React from 'react';
import styles from './styles';
import {colors} from '../../../theme/colors';
import CustomText from '../../wrappers/Text/CustomText';

const OutlineButton = ({style, title, onPress, textStyle, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, style, disabled && {backgroundColor: 'grey'}]}
      onPress={onPress}>
      <CustomText text={title} style={[styles.textStyle, textStyle]} />
    </TouchableOpacity>
  );
};

export default OutlineButton;
