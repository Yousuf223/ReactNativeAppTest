import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../wrappers/Text/CustomText';
import MyIcons from '../MyIcons';
import {colors} from '../../theme/colors';
import {layout, spacing} from '../../theme/styles';
import SlidingProgressBar from './SlidingProgressBar';
import fonts from '../../Assets/fonts';

const ProgressBarCard = () => {
  const [isHide, setIsHide] = useState(false);
  return (
    <View style={styles?.container}>
      <View style={styles?.header}>
        <CustomText
          text={isHide ? '********' : `${'407'} Kcal`}
          font={isHide ? fonts.benzin.extrabold : fonts.benzin.semibold}
          color={colors.text.white}
        />

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles?.btnWrap}
          onPress={() => setIsHide(prev => !prev)}>
          <MyIcons name={isHide ? 'cutEye' : 'eyeIcon'} />
        </TouchableOpacity>
      </View>
      <SlidingProgressBar
        label={[
          {id: 0, title: 'Break Fast'},
          {id: 0, title: 'Lunch'},
          {id: 0, title: 'Dinner'},
        ]}
      />
    </View>
  );
};

export default ProgressBarCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.theme?.primary,
    padding: spacing.medium,
    borderRadius: layout.borderRadius,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  btnWrap: {
    backgroundColor: colors?.theme?.primary,
    padding: spacing.small,
    borderRadius: layout.borderRadius,
    borderWidth: 1,
    borderColor: colors.theme.white,
  },
});
