import React, { useState, memo } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import IconButton from '../Buttons/IconButton';
import TextInputMask from 'react-native-mask-input';
import { colors } from '../../theme/colors';
import styles from './styles';
import Animated, { BounceIn, FadeOut } from 'react-native-reanimated';
import MyIcons from '../MyIcons';
import CustomText from '../wrappers/Text/CustomText';
import fonts from '../../Assets/fonts';
import { vw } from '../../theme/units';
import Feather from 'react-native-vector-icons/Feather';
// Label Component
export const LabelComponent = memo(({ label, required }) => (
  <CustomText
    style={styles.label}
    color={colors.text.dimBlack}
    text={
      <>
        {label}
        {required && <CustomText text={' * '} style={styles.asterisk} />}
      </>
    }
    font={fonts.benzin.regular}
  />
));

const InputField = ({
  inputRef,
  mask,
  label,
  leftIcon, // Left-side icon for email/password
  required,
  placeholder,
  errors,
  multiline,
  onChangeText,
  value,
  password,
  style,
  keyboardType,
  maxLength,
  numberOfLines,
  returnKeyType,
  editable,
  placeholderColor,
  inputContainer2,
  autoCapitalize,
}) => {
  const [focused, setFocused] = useState(false);
  const [formattedValue, setFormattedValue] = useState(value || '');
  const [secureTextEntry, setSecureTextEntry] = useState(
    password ? true : false,
  );


  // Handle number formatting for numeric inputs gramatically
  const handleNumberFormat = (text) => {
    if (keyboardType === 'numeric') {
      // Remove non-numeric characters
      let cleaned = text.replace(/[^0-9]/g, '');
      // Format with commas using Indian locale
      let formatted = cleaned ? parseInt(cleaned).toLocaleString('en-IN') : '';
      setFormattedValue(formatted);
      // Pass the cleaned (unformatted) value to parent onChangeText
      onChangeText && onChangeText(cleaned);
    } else {
      setFormattedValue(text);
      onChangeText && onChangeText(text);
    }
  };


  const showPassword = () => setSecureTextEntry(!secureTextEntry);
  const onFocus = () => !focused && setFocused(true);
  const onBlur = () => focused && setFocused(false);

  return (
    <View style={[styles.container, style]}>
      <View
        style={{
          zIndex: 999,
          left: 35,
          position: 'absolute',
          top: -15,
          backgroundColor: "transparent",
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
        <LabelComponent label={label} required={required} />
      </View>

      {/* Input Container */}
      <View
        style={[
          styles.inputContainer,
          multiline && styles.multilineContainer,
          focused && styles.focusedContainer,
          inputContainer2,
        ]}>
        {/* Left Icon */}
        {leftIcon && (
          <View style={{ marginRight: 10 }}>
            <MyIcons
              name={leftIcon}
              iconStyle={styles.leftIcon}
              color="transparent"
            />
          </View>
        )}

        {/* Input Field */}
        {mask ? (
          <TextInputMask
            ref={inputRef}
            style={[styles.inputStyle, multiline && styles.multiline]}
            onFocus={onFocus}
            onBlur={onBlur}
            numberOfLines={numberOfLines}
            mask={mask}
            multiline={multiline}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            maxLength={maxLength}
            placeholder={placeholder}
            placeholderTextColor={
              placeholderColor ? placeholderColor : colors.text.grey
            }
            secureTextEntry={secureTextEntry}
          />
        ) : (
          <TextInput
            ref={inputRef}
            style={[styles.inputStyle, multiline && styles.multiline]}
            onFocus={onFocus}
            onBlur={onBlur}
            returnKeyType={returnKeyType ? returnKeyType : 'next'}
            multiline={multiline}
            // onChangeText={onChangeText}
            onChangeText={handleNumberFormat}
            editable={editable}
            autoCapitalize={autoCapitalize}
            // value={value}
            value={keyboardType === 'numeric' ? formattedValue : value}
            numberOfLines={numberOfLines}
            keyboardType={keyboardType}
            maxLength={maxLength}
            placeholder={placeholder}
            placeholderTextColor={
              placeholderColor ? placeholderColor : colors.text.grey
            }
            secureTextEntry={secureTextEntry}
          />
        )}

        {/* Password Visibility Toggle */}
        {password && (
          <TouchableOpacity onPress={showPassword} style={styles.eyeButton}>
            <Feather
              name={secureTextEntry ? 'eye-off' : 'eye'} // ✅ fixed
              color={secureTextEntry ? colors.text.grey : colors.theme.black}
              size={18}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Display */}
      {errors ? (
        <Text style={styles.error}>{errors}</Text>
        // <Animated.View
        //   exiting={FadeOut.duration(600)}
        //   entering={BounceIn.duration(300)}>
        //   <Text style={styles.error}>{errors}</Text>
        // </Animated.View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default InputField;
