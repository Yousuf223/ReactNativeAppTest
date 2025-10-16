

import {Formik} from 'formik';
import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import AuthTextButton from '../../../Components/AuthTextButton';
import {MainButton} from '../../../Components/Buttons/MainButton';
import CheckBox from '../../../Components/CheckBox';
import Container from '../../../Components/Container';
import InputField from '../../../Components/InputField';
import {font, layout, spacing} from '../../../theme/styles';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import fonts from '../../../Assets/fonts';
import ActivityLoader from '../../../Components/ActivityLoader';
import Background from '../../../Components/Background';
import DropDown from '../../../Components/DropDown';
import Profile from '../../../Components/ImagePicker/ProfileImagePicker/ProfileImagePicker';
import ModalComponent from '../../../Components/ModalComponent';
import {CustomPhoneInput} from '../../../Components/PhoneNumber';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import {useResetToLoginScreen} from '../../../Functions/resetToScreen';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {Gender} from '../../../Utils/dummyData';
import {LOG, makeApiCall} from '../../../Utils/helperFunction';
import {useRegisterMutation} from '../../../Api/authApiSlice';
import {appImages} from '../../../Assets/Images';
import * as Yup from 'yup';

const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
   gender: Yup.string().required('Gender is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms'),
});

const SignupScreen = ({initialFormData = {}, isEdit = false}) => {
  const navigation = useNavigation();
  const {resetToLoginScreen} = useResetToLoginScreen();
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false);
  const [registration] = useRegisterMutation();

 const handleSignupData = async (values) => {
  
    const payload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.formattedPhoneNumber || values.phoneNumber,
      gender: values.gender,
      password: values.password,
      confirmPassword: values.confirmPassword,
      role: 'USER',
      deviceType: Platform.OS === 'ios' ? 'ios' : 'android',
    };

    console.log('📦 Signup Payload:', payload);

    try {
      setIsLoading(true);
      const response =   await makeApiCall(registration, payload)
      console.log('✅ Signup Success Response:', response);
      setIsTaskSuccess(true);
      // resetForm();
      setIsLoading(false);
      setModalVisible(true);
    } catch (error) {
      console.log('❌ Signup API Error:', error);
      setIsLoading(false);
    }
  };


  return (
    <Background>
      <View style={layout.flex}>
        <Container
          keyboardAware
          keyboardHandled={'handled'}
          contentContainerStyle={styles.mainContentContainer}>
          <View style={{marginTop: spacing.xxlarge}} />
          <CustomText
            text={'Register'}
            font={fonts.clash.semibold}
            size={font.h6}
          />
          <View style={{margin: spacing.xsmall}} />
          <CustomText
            text={'Fill out this form to register'}
            size={font.medium}
            font={fonts.benzin?.regular}
          />
          <View>
            {/* <View style={{alignItems: 'center', paddingTop: spacing?.large}}>
              <Profile
                handleImage={imagePath => {
                  console.log('Selected Image Path:', imagePath);
                }}
                isEdit={true}
                initialImage={appImages.placeholder}
              />
            </View> */}

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                 gender: '',
                phoneNumber: '',
                formattedPhoneNumber: '',
                password: '',
                confirmPassword: '',
                termsAccepted: false,
                role: 'USER',
                deviceType: Platform.OS === 'ios' ? 'ios' : 'android',
              }}
              validationSchema={signupValidationSchema}
                validateOnChange={validateAfterSubmit}
              validateOnBlur={validateAfterSubmit}
              onSubmit={values =>  handleSignupData(values)}
              // onSubmit={(values, {resetForm}) => {
              //   LOG('values:', values);
              //   handleSignupData(values);
              // }}
              // handleSignupData(values)
              >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                errors,
                isValid,
                values,
              }) => (
                <View style={styles.contentContainer}>
                  <View style={{marginBottom: spacing?.medium}}>
                    <InputField
                      label="First Name"
                      placeholder="Enter First Name"
                      required
                      onChangeText={handleChange('firstName')}
                      errors={errors?.firstName}
                      value={values?.firstName}
                    />
                  </View>
                  <View style={{marginBottom: spacing?.medium}}>
                    <InputField
                      label="Last Name"
                      placeholder="Enter Last Name"
                      required
                      onChangeText={handleChange('lastName')}
                      errors={errors?.lastName}
                      value={values?.lastName}
                    />
                  </View>
                  <View style={{marginBottom: spacing?.medium}}>
                    <InputField
                      label="Email Address"
                      placeholder="Enter Email Address"
                      required
                      autoCapitalize={'none'}
                      onChangeText={handleChange('email')}
                      errors={errors?.email}
                      value={values?.email}
                      keyboardType={'email-address'}
                    />
                  </View>
                  <View
                    style={{
                      marginBottom: spacing?.medium,
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <CustomPhoneInput
                      labelTitle={'Phone Number'}
                      value={values.phoneNumber}
                      formattedValue={values.formattedPhoneNumber}
                      setValue={value => setFieldValue('phoneNumber', value)}
                      setFormattedValue={formattedValue =>
                        setFieldValue('formattedPhoneNumber', formattedValue)
                      }
                      valid={valid}
                      staric={true}
                      showMessage={showMessage}
                    />
                  </View>
                  <View style={{marginBottom: spacing?.medium}}>
                    <DropDown
                      label={'Gender'}
                      required={true}
                      textColor={
                        values?.gender
                          ? colors?.text?.dimBlack
                          : colors?.text?.grey
                      }
                      placeholder={'Select'}
                      onValueChange={value =>
                        setFieldValue('gender',value?.value?.toUpperCase())
                      }
                      dynamicData={Gender}
                      errors={errors?.gender}
                    />
                  </View>
                  <View style={{marginBottom: spacing?.medium}}>
                    <InputField
                      label="Password"
                      placeholder="Enter Password"
                      onChangeText={handleChange('password')}
                      required
                      password
                      errors={errors?.password}
                      value={values?.password}
                      returnKeyType={'done'}
                    />
                  </View>
                  <View style={{marginBottom: spacing?.medium}}>
                    <InputField
                      label="Confirm Password"
                      placeholder="Enter Password"
                      onChangeText={handleChange('confirmPassword')}
                      required
                      password
                      errors={errors?.confirmPassword}
                      value={values?.confirmPassword}
                      returnKeyType={'done'}
                    />
                  </View>
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      paddingHorizontal: spacing.large,
                      marginBottom: 10,
                    }}>
                    <CheckBox
                      highligthStyle={{backgroundColor: '#00BA00'}}
                      text={'I accept all the Terms & Conditions'}
                      checked={values.termsAccepted}
                      setChecked={() =>
                        setFieldValue('termsAccepted', !values.termsAccepted)
                      }
                      errors={errors?.termsAccepted}
                    />
                  </View>
                  {isLoading ? (
                    <ActivityLoader color={colors.theme.secondary} />
                  ) : (
                    <MainButton
                      style={styles.submitButton}
                      title={'Register Now'}
                      disabled={
                        !isValid || isTaskSuccess || !values.termsAccepted
                      }
                      onPress={ () => {   setValidateAfterSubmit(true),handleSubmit()} }
                    />
                  )}
                </View>
              )}
            </Formik>
          </View>
          <View style={{alignItems: 'center'}}>
            <AuthTextButton
              text={'Already have an account?'}
              buttonText="Sign In"
              underLine={true}
              onPress={resetToLoginScreen}
            />
          </View>
        </Container>
        <ModalComponent
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onPressCross={() => {
            setModalVisible(false);
            navigation.navigate(routes.auth.login);
          }}
          title={`Success`}
          message={`Your account has been registered!`}
          buttonText="Got it"
          onButtonPress={() => {
            setModalVisible(false);
            navigation.navigate(routes.auth.login);
          }}
        />
      </View>
    </Background>
  );
};

export default SignupScreen;
