import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';
import { baseUrl } from '../../../Api/configs';
import Container from '../../../Components/Container';
import InputField from '../../../Components/InputField';
import { MainButton } from '../../../Components/Buttons/MainButton';
import { showToast } from '../../../Utils/toast';
import { vh } from '../../../theme/units';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import fonts from '../../../Assets/fonts';
import { font } from '../../../theme/styles';
import { useNavigation } from '@react-navigation/native';
import routes from '../../../Navigation/routes';
import TopLeftBackButton from '../../../Components/Buttons/TopLeftBackButton';
import ActivityLoader from '../../../Components/ActivityLoader';
import { colors } from '../../../theme/colors';

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false)
  const handleSendOtp = async () => {
    try {
      setIsLoading(true)
      const res = await axios.post(`${baseUrl}/user/forgot-password`, { email });
      console.log('Subscription',res?.data)
      if (res?.data) {
        setIsLoading(false)
        showToast('success',res?.data.message);
        navigation.navigate(routes.auth.otp, { email,otp:res?.data?.data?.otp });
      } else {
        setIsLoading(false)
        showToast('error', res.data.message || 'Something went wrong');
      }
    } catch (err) {
      setIsLoading(false)
      showToast('error', err?.response?.data?.message || 'Network error');
    }
  };

  return (
    <>
      <TopLeftBackButton />
      <Container
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <CustomText
          text="Forgot Password"
          font={fonts.clash.semibold}
          size={font.h6}
        />
        <View style={{ marginVertical: vh * 3 }} />
        <InputField
          label={'Email Address'}
          placeholder="Enter Email"
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          value={email}
          onChangeText={setEmail}
          required
        />
        <View style={{ marginVertical: vh * 2 }} />

        {isLoading ? (
          <ActivityLoader
            style={styles.submitButton}
            color={colors.theme.secondary}
          />
        ) : (
          <MainButton title="Send OTP" onPress={handleSendOtp} />
        )}

      </Container>


    </>
  );
};

export default ForgotPasswordEmail;


const styles = StyleSheet.create({
  submitButton: {
    color: colors.theme.secondary,
    width: '90%'
  },
})
