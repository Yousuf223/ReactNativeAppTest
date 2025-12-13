import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { baseUrl } from '../../../Api/configs';
import Container from '../../../Components/Container';
import { MainButton } from '../../../Components/Buttons/MainButton';
import { showToast } from '../../../Utils/toast';
import { vh } from '../../../theme/units';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import fonts from '../../../Assets/fonts';
import { font } from '../../../theme/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import routes from '../../../Navigation/routes';
import { colors } from '../../../theme/colors';
import OTPInput from './OTPInput';
import ActivityLoader from '../../../Components/ActivityLoader';
const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email;
  const otpCode =  route.params.otp
  console.log('otpCode',otpCode)

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true)
      const res = await axios.post(`${baseUrl}/user/verify-otp`, { email, otp });
      if (res.data) {
         setIsLoading(false)
        showToast('success', 'OTP verified successfully');
        navigation.navigate(routes.auth.resetPassword, { email, otp });
      } else {
        showToast('error', res.data.message || 'Invalid OTP');
          setIsLoading(false)
      }
    } catch (err) {
        setIsLoading(false)
      showToast('error', err?.response?.data?.message || 'Network error');
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await axios.post(`${baseUrl}/forgot-password`, { email });
      if (res.data.success) {
        showToast('success', 'OTP resent successfully');
      } else {
        showToast('error', res.data.message || 'Something went wrong');
      }
    } catch (err) {
      showToast('error', err?.response?.data?.message || 'Network error');
    }
  };

  return (
    <Container     contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
      <CustomText
        text="Verify OTP"
        font={fonts.clash.semibold}
        size={font.h6}
      />
      <View style={{ margin: vh * 3 }} />
      <OTPInput
        code={otp}
        onChangeText={setOtp}
        placeholder="Enter 4-digit OTP"
      />
      <Text style={{color:colors.theme.black,paddingVertical:10}}>
        OTP Code :{otpCode}
      </Text>
      <View style={{ margin: vh * 2 }} />
        {isLoading ? (
          <ActivityLoader
            style={styles.submitButton}
            color={colors.theme.secondary}
          />
        ) : (
       <MainButton title="Verify" onPress={handleVerifyOtp} />
        )}
      
      <TouchableOpacity onPress={handleResendOtp} style={{ marginTop: 15 }}>
        <Text style={{ color: colors.theme.secondary, textAlign: 'center' }}>
          Resend OTP
        </Text>
      </TouchableOpacity>
    </Container>
  );
};

export default VerifyOtp;


const styles = StyleSheet.create({
    submitButton: {
        color: colors.theme.secondary,
        width: '90%'
    },
})
