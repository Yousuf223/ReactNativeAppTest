import React from 'react';
import {Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {font, layout, spacing} from '../../../theme/styles';
import MyIcons from '../../MyIcons';
import {useNavigation} from '@react-navigation/native';
import {vh, vw} from '../../../theme/units';
import {colors} from '../../../theme/colors';
import Feather from 'react-native-vector-icons/Feather'
const TopLeftDrawerButton = ({onPress, style, disabled}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, style]}
      onPress={onPress ? onPress : () => navigation.openDrawer()}>
      <Feather name={'menu'} color="000" size={24} />
    </TouchableOpacity>
  );
};

export default TopLeftDrawerButton;

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    backgroundColor: 'transparent',
    borderColor: colors?.theme?.border
  },
});
