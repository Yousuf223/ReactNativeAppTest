import React from 'react';
import {Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {font, layout, spacing} from '../../../theme/styles';
import MyIcons from '../../MyIcons';
import {useNavigation} from '@react-navigation/native';
import {vh, vw} from '../../../theme/units';

import {colors} from '../../../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
const TopLeftBackButton = ({onPress, style, disabled}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, style]}
      onPress={onPress ? onPress : () => navigation?.goBack()}>
      <Ionicons name={'arrow-back'} color={colors.theme.black} size={16} />
    </TouchableOpacity>
  );
};

export default TopLeftBackButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: vw * 10,
    borderRadius: vh * 10,
    width: vw * 10,
    backgroundColor: colors?.theme?.white,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#E8E6EA',
    marginTop:10
  },
});
