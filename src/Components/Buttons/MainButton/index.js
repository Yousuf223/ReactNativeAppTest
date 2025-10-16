import {TouchableOpacity} from 'react-native';
import React from 'react';

import styles from './styles';
import withLinearGradient from '../../../HOC/withLinearGradient';
import CustomText from '../../wrappers/Text/CustomText';
import withCircleButton from '../../../HOC/withCircleButton';
import MyIcons from '../../MyIcons';
import {vh} from '../../../theme/units';
import fonts from '../../../Assets/fonts';
import Feather from 'react-native-vector-icons/Feather'; 
const MainButton = ({
  style,
  title,
  onPress,
  textStyle,
  disabled,
  icon,
  hideIcon,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, style]}
      onPress={onPress}>
      {icon ? (
        <MyIcons name={'backIcon'} />
      ) : (
        <>
          <CustomText
            text={title}
            style={[styles.textStyle, textStyle]}
            font={fonts?.clash?.semibold}
          />
          {(() => {
            
            if (!hideIcon) {
              return <Feather name={'arrow-right'} color="#fff" size={16} />;
            } else if (hideIcon) {
              return <Feather name={'arrow-right'} color="#ffffff05" size={vh * 2} />;
            }
          })()}
        </>
      )}
    </TouchableOpacity>
  );
};

const colors = ['#AF0000', '#FF2E00', '#FF1A00'];
const MainButtonWithGradient = withLinearGradient(MainButton, colors);
const MainButtonWithCircle = withCircleButton(MainButton);

export {MainButtonWithGradient, MainButton, MainButtonWithCircle};
