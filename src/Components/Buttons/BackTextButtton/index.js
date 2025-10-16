import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../theme/colors';
import CustomText from '../../wrappers/Text/CustomText';

export default function BackTextButton({title}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.goBack()}>
      <CustomText
        text={title}
        style={{color: colors.theme.secondary, textDecorationLine: 'underline'}}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
