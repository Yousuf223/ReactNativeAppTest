import React, {memo, useRef, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Text,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';

import PhoneInput from 'react-native-phone-number-input';

import {font, layout, spacing} from '../../theme/styles';
import fonts from '../../Assets/fonts';
import CustomText from '../wrappers/Text/CustomText';
import {vh, vw} from '../../theme/units'; 
import Animated, {BounceIn, FadeOut} from 'react-native-reanimated';
import { colors } from '../../theme/colors';
const {height} = Dimensions.get('screen');

// Label Component
export const LabelComponent = memo(({label, required}) => (
  <CustomText
    style={styles.label}
    color={colors.text.dimBlack}
    text={
      <>
        {label}
        {required && <CustomText text={'*'} style={styles.asterisk} />}
      </>
    }
    font={fonts.benzin.regular}
  />
));

export function CustomPhoneInput({
  value = '',
  formattedValue = '',
  setValue,
  setFormattedValue,
  valid = false,
  showMessage = false,
  errors = '',
  labelTitle = 'Phone Number',
  staric = false,
  defaultCode = 'US',
  defaultValue = '',
}) {
  const phoneInput = useRef(null);

  return (
    <View style={[styles.container]}>
      <View
        style={{
          zIndex: 999,
          left: 35,
          position: 'absolute',
          top: -15,
          backgroundColor: 'transparent',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
        <LabelComponent label={labelTitle} required={staric} />
      </View>
      <View style={{width: '100%'}}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={defaultValue || value}
          defaultCode={defaultCode}
          layout="first"
          onChangeText={text => {
            setValue(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          withShadow
          textInputStyle={{height: vh * 6.5, color: colors?.text?.dimBlack}}
          containerStyle={[styles.inputWrapper, {overflow: 'hidden'}]}
          textContainerStyle={{
            height: vh * 6.5,
            backgroundColor: colors.theme?.white,
          }}
          textInputProps={{
            placeholderTextColor: colors.text.grey,
            fontFamily: fonts?.benzin?.regular,
            top: 1.5,
            fontSize: font.small,
            keyboardType: 'phone-pad',
          }}
          codeTextStyle={{
            color:colors.text.grey,
            fontFamily: fonts?.benzin?.regular,
            fontSize: font.small,
          }}
        />
      </View>

      {errors ? (
        <Animated.View
          exiting={FadeOut.duration(600)}
          entering={BounceIn.duration(300)}>
          <Text style={styles.error}>{errors}</Text>
        </Animated.View>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: layout.contentWidth,
    marginBottom: spacing.medium,
    paddingHorizontal: spacing.mediumh,
    position: 'relative',
  },
  label: {
    color: colors?.theme?.black,
    fontSize: font.small,
  },
  inputWrapper: {
    width: '100%',
    borderRadius: layout.borderRadius,
    height: vh * 6.5,
    backgroundColor: colors.theme?.white,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: font.small,
    fontFamily: fonts?.benzin?.regular,

    borderWidth: 1,
    borderColor: colors?.theme?.border,
  },
  asterisk: {color: colors.background.red},
  error: {
    color: colors.text.red,
    marginTop: vh * 0.5,
    marginLeft: vw * 1,
    fontSize: vh * 1.5,
    fontFamily: fonts.benzin.regular,
  },
});
