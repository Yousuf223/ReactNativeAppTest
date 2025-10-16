import React from 'react';
import TextButton from '../Buttons/TextButton';
import {View} from 'react-native';
import styles from './styles';
import CustomText from '../wrappers/Text/CustomText';
import {font} from '../../theme/styles';
import MyIcons from '../MyIcons';
import {vh} from '../../theme/units';
import {colors} from '../../theme/colors';
import fonts from '../../Assets/fonts';

const AuthTextButton = ({
  style,
  text,
  buttonText,
  onPress,
  underLine,
  color,
  textColor,
}) => {
  return (
    <View style={[styles.container, style]}>
      <CustomText
        text={text}
        style={styles.text}
        size={font.medium}
        color={color ? color : colors?.text?.dimBlack}
        font={fonts?.benzin.regular}
      />
      <TextButton
        title={` ${buttonText}`}
        onPress={onPress}
        underLine={underLine}
        textTransform="uppercase"
        textColor={textColor ? textColor : colors.black}
      />
    </View>
  );
};

export default AuthTextButton;
