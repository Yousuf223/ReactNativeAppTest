import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import TextButton from '../../../Components/Buttons/TextButton'; // Assuming this is your button component
import {colors} from '../../../theme/colors';
import {vh, vw} from '../../../theme/units';
import {font, spacing} from '../../../theme/styles';
import CustomText from '../../../Components/wrappers/Text/CustomText';

const OTPInput = ({otp, errors, touched, onChangeText, handleResendCB}) => {
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(30);

  // Start the timer for OTP expiration
  // useEffect(() => {
  //   if (timer > 0) {
  //     const interval = setInterval(() => {
  //       setTimer(prevTimer => prevTimer - 1);
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   } else {
  //     // Handle when the timer expires
  //     setShowResend(true);
  //   }
  // }, [timer]);

  // Resend OTP Handler
  // const handleResendCode = () => {
  //   // Reset timer and trigger resend OTP action
  //   setTimer(30);
  //   setShowResend(false);
  //   // Resend OTP logic (e.g., API call) goes here
  //   handleResendCB();
  // };

  return (
    <View>
      {/* OTP Text Input */}
      <OTPTextView
        value={otp}
        handleTextChange={onChangeText}
        inputCount={4}
        inputCellLength={1}
        tintColor={colors.border.inputBorder}
        offTintColor={'transparent'}
        containerStyle={{
          paddingHorizontal: 20,
          width: vw * 90,
        }}
        textInputStyle={{
          backgroundColor: colors.input.background,
          borderRadius: vh * 2,
          width: vw * 15,
          height: vh * 8,
          borderTopWidth: 2,
          borderRightWidth: 2,
          borderLeftWidth: 2,
          borderBottomWidth: 2.4,
          color: colors?.text.white,
          placeholderTextColor: colors.text.placeholder,
        }}
        testIDPrefix="otp_input_"
        autoFocus={false}
      />

      {/* Error Message for OTP */}
      {errors && touched && <CustomText text={errors} style={styles.error} />}

      {/* Timer or Resend Code Button */}
      {/* {showResend ? (
        <TextButton
          style={styles.forgotText}
          title="Resend Code"
          onPress={handleResendCode}
        />
      ) : (
        <TextButton
          style={styles.forgotText}
          title={`00:${timer < 10 ? '0' : ''}${timer}`}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  forgotText: {
    alignSelf: 'flex-end',
    fontSize: font.small,
  },
  error: {
    color: colors.text.red,
    fontSize: font.small,
    paddingLeft: spacing.large,
  },
});

export default OTPInput;
