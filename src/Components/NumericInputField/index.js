import React, { useState, memo } from 'react';
import { Text, TextInput, View } from 'react-native';
import { colors } from '../../theme/colors';
import styles from './styles';
import Animated, { BounceIn, FadeOut } from 'react-native-reanimated';
import MyIcons from '../MyIcons';
import CustomText from '../wrappers/Text/CustomText';
import fonts from '../../Assets/fonts';
import { vw } from '../../theme/units';

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

const NumericInputField = ({
  inputRef,
  label,
  leftIcon,
  required,
  placeholder,
  errors,
  multiline,
  onChangeText,
  value,
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

  const onFocus = () => !focused && setFocused(true);
  const onBlur = () => focused && setFocused(false);

  // Handle number formatting for numeric inputs
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

  return (
    <View style={[styles.container, style]}>
      <View
        style={{
          zIndex: 999,
          left: 35,
          position: 'absolute',
          top: -15,
          backgroundColor: 'white',
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
        <TextInput
          ref={inputRef}
          style={[styles.inputStyle, multiline && styles.multiline]}
          onFocus={onFocus}
          onBlur={onBlur}
          returnKeyType={returnKeyType ? returnKeyType : 'next'}
          multiline={multiline}
          onChangeText={handleNumberFormat}
          editable={editable}
          autoCapitalize={autoCapitalize}
          value={keyboardType === 'numeric' ? formattedValue : value}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderColor ? placeholderColor : colors.text.grey
          }
        />
      </View>

      {/* Error Display */}
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
};

export default NumericInputField;