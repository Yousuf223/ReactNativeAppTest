import {TouchableOpacity} from 'react-native';

// import EuclidCircularAMedium from '../../wrappers/Texts/EuclidCircularAMedium';
import React from 'react';
import styles from './styles';

import MyIcons from '../../MyIcons';
import CustomText from '../../wrappers/Text/CustomText';

const ButtonWithIcon = ({
  style,
  title,
  onPress,
  textStyle,
  disabled,
  iconName,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      style={[styles.container, style, disabled && {backgroundColor: 'grey'}]}
      onPress={onPress}>
      {iconName && <MyIcons name={iconName} color="transparent" size={16} />}
      <CustomText style={[styles.textStyle, textStyle]} text={title} />
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;
