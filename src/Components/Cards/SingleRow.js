import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../theme/colors';
import {layout, spacing} from '../../theme/styles';
import MyIcons from '../MyIcons';
import CustomText from '../wrappers/Text/CustomText';

const SingleRow = ({
  iconName,
  label,
  weight,
  calories,
  deleteAction,
  rightIcon,
  onPress,
}) => {
  const [isCheck, setIsCheck] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.textWrap}>
        <MyIcons name={iconName} />
        <CustomText text={label} />
      </View>
      <CustomText text={weight} />
      {calories && <CustomText text={`${calories} cal`} />}
      {!rightIcon && (
        <TouchableOpacity onPress={deleteAction}>
          <MyIcons name={'delete'} size={24} />
        </TouchableOpacity>
      )}
      {rightIcon && (
        <TouchableOpacity onPress={() => setIsCheck(prev => !prev)}>
          <MyIcons name={isCheck ? 'uncheck' : 'checks'} size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SingleRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors?.input.background,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    borderRadius: layout.borderRadius,
  },
  textWrap: {
    flexDirection: 'row',
    gap: spacing.small,
  },
});
