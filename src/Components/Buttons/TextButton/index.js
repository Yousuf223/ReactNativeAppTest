import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import CustomText from '../../wrappers/Text/CustomText';
import fonts from '../../../Assets/fonts';
import {colors} from '../../../theme/colors';

const TextButton = ({
  style,
  title,
  onPress,
  underLine,
  textTransform,
  textColor,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CustomText
        text={title}
        font={fonts?.benzin?.regular}
        color={textColor ? textColor : colors.black}
        style={[
          styles.textStyle,
          style,
          {
            textDecorationLine: underLine ? 'underline' : 'none',
            textTransform: textTransform ? textTransform : 'none',
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default TextButton;
