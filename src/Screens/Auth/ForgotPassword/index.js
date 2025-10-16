// import React, {useRef, useState} from 'react';
// import {Platform, View} from 'react-native';

// import Container from '../../../Components/Container';

// import {useNavigation} from '@react-navigation/native';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {MainButton} from '../../../Components/Buttons/MainButton';
// import InputField from '../../../Components/InputField';
// import routes from '../../../Navigation/routes';
// import {font, layout, spacing} from '../../../theme/styles';
// import styles from './styles';

// import fonts from '../../../Assets/fonts';
// import ActivityLoader from '../../../Components/ActivityLoader';
// import Background from '../../../Components/Background';
// import TopLeftBackButton from '../../../Components/Buttons/TopLeftBackButton';
// import ModalComponent from '../../../Components/ModalComponent';
// import CustomText from '../../../Components/wrappers/Text/CustomText';
// import {
//   useResetToLoginScreen,
//   useResetToScreen,
// } from '../../../Functions/resetToScreen';
// import {colors} from '../../../theme/colors';
// import {vh} from '../../../theme/units';
// import OTPInput from './OTPInput';

// const getSubTitle = step => {
//   switch (step) {
//     case 1:
//       return `Enter your email to recover your account`;
//     case 2:
//       return `Enter your 04 digit OTP sent to your email ID.`;
//     default:
//       return `Set new password for your account.`;
//   }
// };

// const Header = ({step}) => {
//   const insets = useSafeAreaInsets();
//   return (
//     <View
//       style={[
//         styles.headerContainer,
//         Platform.OS === 'ios' && {paddingTop: insets.top},
//       ]}></View>
//   );
// };

// const ForgotPassword = () => {
//   const navigation = useNavigation();
//   const {resetToLoginScreen} = useResetToLoginScreen();
//   const [step, setStep] = useState(1);
//   const [visible, setVisible] = useState(false);
//   const [email, setEmail] = useState();
//   const [code, setCode] = useState();
//   const [password, setPassword] = useState();
//   const [confirmPass, setConfirmPass] = useState();

//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isTaskSuccess, setIsTaskSuccess] = useState(false); // State for disabling the button
//   const [isLoading, setIsLoading] = useState(false);

//   const sheetRef = useRef(null);
//   const {resetToScreen} = useResetToScreen();

//   const handleVisibility = () => setVisible(!visible);
//   //   const dispatch = useDispatch();

//   const handleSubmit = () => {
//     switch (step) {
//       case 1:
//         return handleEmailStep();
//       case 2:
//         return handleCodeStep();
//       case 3:
//         return handleChangePassStep();
//     }
//   };

//   const passUpdateSuccess = async () => {
//     if (sheetRef.current) {
//       sheetRef.current.close();
//     }
//     handleVisibility();
//     resetToLoginScreen();
//   };

//   const onBackdropPress = () => {
//     handleVisibility();
//     if (sheetRef.current) {
//       sheetRef.current.close();
//     }
//   };

//   const handleEmailStep = () => {
//     setStep(prevStep => prevStep + 1);
//   };

//   const handleCodeStep = () => {
//     setStep(prevStep => prevStep + 1);
//   };

//   const handleChangePassStep = () => {
//     // if (sheetRef.current) sheetRef.current.open();
//     // handleVisibility();
//     setIsTaskSuccess(true);
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       setModalVisible(true); // Show the success modal
//     }, 2000);
//   };
//   const navigateToLogin = () => navigation.navigate(routes.auth.login);
//   // const resetToLogin = ()=> resetToScreen(1, routes.auth.login);

//   const renderSteps = () => {
//     switch (step) {
//       case 1:
//         return (
//           <InputField
//             label="Email Address"
//             placeholder="Enter Email"
//             keyboardType={'email-address'}
//             onChangeText={setEmail}
//             required
//             returnKeyType={'done'}
//           />
//         );
//       case 2:
//         return (
//           <OTPInput navigation={navigation} />
//           //   <View>
//           //     <InputField
//           //       style={styles.verificationCodeInput}
//           //       keyboardType={'number-pad'}
//           //       label="Verification Code"
//           //       onChangeText={setCode}
//           //       placeholder="Enter verification code"
//           //       required
//           //       returnKeyType={'done'}
//           //     />
//           //     <TextButton style={styles.forgotText} title={'Resend Code'} />
//           //   </View>
//         );
//       case 3:
//         return (
//           <>
//             <View style={{marginBottom: spacing?.large}}>
//               <InputField
//                 label="Password"
//                 placeholder="Enter Password"
//                 onChangeText={setPassword}
//                 required
//                 password
//               />
//             </View>
//             <InputField
//               label="Confirm Password"
//               onChangeText={setConfirmPass}
//               placeholder="Confirm Password"
//               required
//               password
//             />
//           </>
//         );
//       default:
//         return <></>;
//     }
//   };

//   return (
//     <Background>
//       <View style={layout.flex}>
//         <TopLeftBackButton />
//         <Container
//           keyboardAware
//           contentContainerStyle={styles.mainContentContainer}>
//           <CustomText
//             text={'Forgot Password'}
//             font={fonts.clash.semibold}
//             size={font.h6}
//           />
//           <View style={{margin: vh * 1}} />
//           <CustomText
//             text={getSubTitle(step)}
//             size={font.large}
//             font={fonts?.benzin?.regular}
//           />
//           <View style={{margin: vh * 3}} />
//           <View style={styles.contentContainer}>
//             {renderSteps()}
//             <View style={{margin: vh * 1}} />
//             {isLoading ? (
//               <ActivityLoader color={colors.theme.secondary} />
//             ) : (
//               <MainButton
//                 style={styles.submitButton}
//                 title={step >= 3 ? 'Update' : 'Continue'}
//                 onPress={handleSubmit}
//                 disabled={isTaskSuccess}
//               />
//             )}
//           </View>
//           {/* <View style={{ alignItems: 'center' }}>
//             <AuthTextButton
//               text={'Back to?'}
//               buttonText="Sign In"
//               onPress={resetToLoginScreen}
//             />
//           </View> */}
//         </Container>

//         {/* <BottomSheet
//           togglePopup={sheetRef}
//           successPopup={visible}
//           onBackButtonPress={passUpdateSuccess}
//           modalHeight={vh * 40}
//           onDragDown={passUpdateSuccess}
//           onBackdropPress={onBackdropPress}
//           onCrossPress={() => {
//             if (sheetRef.current) {
//               sheetRef.current.close();
//               handleVisibility();
//             }
//             setTimeout(() => {
//               resetToLoginScreen();
//             }, 550);
//           }}
//           onPress={passUpdateSuccess}
//           label="System Message!"
//           description={`Your password has been successfully updated.`}
//         />
//         {visible && (
//           <BlurView
//             style={styles.absolute}
//             blurType="dark"
//             blurAmount={2}
//             reducedTransparencyFallbackColor="white"
//           />
//         )} */}

//         <ModalComponent
//           isVisible={isModalVisible}
//           onClose={() => setModalVisible(false)}
//           onPressCross={() => {
//             setModalVisible(false);
//             setTimeout(() => {
//               resetToLoginScreen();
//             }, 1000);
//           }}
//           title="Success"
//           message="Your password has been changed!"
//           buttonText="Got it"
//           onButtonPress={() => {
//             resetToLoginScreen;
//           }}
//         />
//       </View>
//     </Background>
//   );
// };

// export default ForgotPassword;

import React, {useRef, useState} from 'react';
import {Alert, Platform, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import AuthTextButton from '../../../Components/AuthTextButton';
import Container from '../../../Components/Container';
import InputField from '../../../Components/InputField';
import routes from '../../../Navigation/routes';
import {font, layout} from '../../../theme/styles';
import styles from './styles';

import Animated, {
  BounceIn,
  FadeOut,
  SlideInLeft,
} from 'react-native-reanimated';
import fonts from '../../../Assets/fonts';
import BottomSheet from '../../../Components/BottomSheet';
import TopLeftBackButton from '../../../Components/Buttons/TopLeftBackButton';
import {useResetToLoginScreen} from '../../../Functions/resetToScreen';
import {vh} from '../../../theme/units';
import OTPInput from './OTPInput';
import {
  useResetPassMutation,
  useVerifyCodeMutation,
  useVerifyEmailMutation,
} from '../../../Api/resetPassApiSlice';
import {showToast} from '../../../Utils/toast';
import ActivityLoader from '../../../Components/ActivityLoader';
import {colors} from '../../../theme/colors';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import {LOG, makeApiCall} from '../../../Utils/helperFunction';
import {MainButton} from '../../../Components/Buttons/MainButton';

const getSubTitle = step => {
  switch (step) {
    case 1:
      return `Enter your email to recover your account`;
    case 2:
      return `Enter verification code sent to your email.`;
    default:
      return `Set new password for your account.`;
  }
};

const Header = ({step}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.headerContainer,
        Platform.OS === 'ios' && {paddingTop: insets.top},
      ]}></View>
  );
};

const ForgotPassword = () => {
  const navigation = useNavigation();
  const {resetToLoginScreen} = useResetToLoginScreen();
  // const [verifyEmail, {isLoading}] = useVerifyEmailMutation();
  // const [verfifyCode, {isLoading}] = useVerifyCodeMutation();
  const [verifyEmail, {isLoading: isVerifyingEmail}] = useVerifyEmailMutation();
  const [verifyCode, {isLoading: isVerifyingCode}] = useVerifyCodeMutation();
  const [resetPass, {isLoading: isResetPassword}] = useResetPassMutation();

  const [step, setStep] = useState(1);

  const sheetRef = useRef(null);

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      code:
        step === 2
          ? Yup.string()
              .required('Verification code is required')
              .length(4, 'OTP must be exactly 4 digits')
          : null,
      password:
        step === 3
          ? Yup.string()
              .min(8, 'Password must be at least 8 characters')
              .required('Password is required')
          : null,
      confirmPassword:
        step === 3
          ? Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Confirm Password is required')
          : null,
    }),
    onSubmit: values => {
      console.log('values-values', values);
      console.log('step-step', step);
      switch (step) {
        case 1:
          return handleEmailStep(values);
        case 2:
          return handleCodeStep(values);
        case 3:
          return handleChangePassStep(values);
      }
    },
  });

  const passUpdateSuccess = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  const handleEmailStep = async values => {
    await makeApiCall(
      verifyEmail,
      {
        email: values.email,
        type: 'USER',
      },
      setStep,
    );
  };

  const handleCodeStep = async values => {
    LOG('VerifyOtp', values, 'error');
    await makeApiCall(
      verifyCode,
      {
        email: values.email,
        code: values.code,
      },
      setStep,
    );
  };

  const handleChangePassStep = async values => {
    LOG('Change-Password', values, 'success');
    let response = await makeApiCall(resetPass, {
      email: values.email,
      code: values.code,
      password: values.password,
    });
    if (response?.status) {
      if (sheetRef.current) sheetRef.current.open();
      setTimeout(() => {
        if (sheetRef.current) sheetRef.current.close();
        resetToLoginScreen();
      }, 850);
    }
  };

  const navigateToLogin = () => navigation.navigate(routes.auth.login);

  const renderSteps = () => {
    LOG('Formik Error:', formik.errors);
    switch (step) {
      case 1:
        return (
          <InputField
            label={'Email Address'}
            placeholder="Enter Email"
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            onChangeText={formik.handleChange('email')}
            value={formik.values.email}
            errors={formik.errors.email}
            touched={formik.touched.email}
            required
            returnKeyType={'done'}
            // leftIcon={'email'}
          />
        );
      case 2:
        return (
          <OTPInput
            navigation={navigation}
            code={formik.values.code}
            onChangeText={value => formik.setFieldValue('code', value)}
            errors={formik.errors.code}
            touched={formik.touched.code}
            // handleResendCB={handleEmailStep}
          />
        );
      case 3:
        return (
          <View style={{gap: 10}}>
            <InputField
              label={'Enter Password'}
              placeholder="Enter Password"
              onChangeText={formik.handleChange('password')}
              value={formik.values.password}
              errors={formik.errors.password}
              touched={formik.touched.password}
              required
              password
            />
            <InputField
              label={'Enter Confirm Password'}
              onChangeText={formik.handleChange('confirmPassword')}
              value={formik.values.confirmPassword}
              errors={formik.errors.confirmPassword}
              touched={formik.touched.confirmPassword}
              placeholder="Confirm Password"
              required
              password
            />
          </View>
        );
      default:
        return <></>;
    }
  };

  return (
    <View style={layout.flex}>
      <TopLeftBackButton />
      <Container
        keyboardAware
        contentContainerStyle={styles.mainContentContainer}>
        <Animated.View
          exiting={FadeOut.duration(600)}
          entering={BounceIn.duration(300)}>
          <CustomText
            text={'Forgot Password'}
            font={fonts.clash.semibold}
            size={font.h6}
          />
        </Animated.View>

        <View style={{margin: vh * 1}} />
        <Animated.View
          exiting={FadeOut.duration(600)}
          entering={SlideInLeft.duration(300)}>
          <CustomText
            text={getSubTitle(step)}
            size={font.large}
            font={fonts?.benzin?.regular}
          />
        </Animated.View>
        <View style={{margin: vh * 3}} />
        <View style={styles.contentContainer}>
          {renderSteps()}
          <View style={{margin: vh * 1}} />
          {isVerifyingEmail || isVerifyingCode || isResetPassword ? (
            <ActivityLoader
              style={styles.submitButton}
              color={colors.theme.secondary}
            />
          ) : (
            <MainButton
              style={styles.submitButton}
              title={step >= 3 ? 'Update' : 'Continue'}
              onPress={formik.handleSubmit}
              disabled={!formik.isValid}
            />
          )}
        </View>
      </Container>
      <View style={{alignItems: 'center'}}>
        <AuthTextButton
          text={'Back to?'}
          buttonText="Sign In"
          onPress={resetToLoginScreen}
          underLine={true}
        />
      </View>

      <BottomSheet
        togglePopup={sheetRef}
        successPopup={true}
        onClose={() => resetToLoginScreen()}
        modalHeight={vh * 40}
        onPress={passUpdateSuccess}
        label="System Message!"
        description={`Your password has been successfully updated.`}
      />
    </View>
  );
};

export default ForgotPassword;
