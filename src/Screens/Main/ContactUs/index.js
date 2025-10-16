import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {View} from 'react-native';
import * as Yup from 'yup';
import {executeApiRequest} from '../../../Api/methods/method';
import ActivityLoader from '../../../Components/ActivityLoader';
import {MainButton} from '../../../Components/Buttons/MainButton';
import Container from '../../../Components/Container';
import CustomHeader from '../../../Components/CustomHeader';
import InputField from '../../../Components/InputField';
import ModalComponent from '../../../Components/ModalComponent';
import {CustomPhoneInput} from '../../../Components/PhoneNumber';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {layout, spacing} from '../../../theme/styles';
import {vw} from '../../../theme/units';
import {LOG} from '../../../Utils/helperFunction';
import styles from './styles';
import {useAddMutation} from '../../../Api/feedbackApiSlice';

// Validation Schema using Yup
const changePasswordValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email address is required'),
  phoneNumber: Yup.string()
    // .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .required('Phone number is required'),
    // .test('isValid', 'Phone number is not valid', function (value) {
    //   return value ? true : false;
    // }),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});

const ContactUs = () => {
  const navigation = useNavigation();
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [visible, setVisible] = useState(false);
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false); // State for disabling the button
  const [add, {isLoading}] = useAddMutation();

  const handleSubmitt = async values => {
    LOG('Original values', values);

    // Remove phoneNumber from the values object
    const {phoneNumber, ...submitValues} = values;
    LOG('Values to submit (without phoneNumber)', submitValues);

    const response = await executeApiRequest({
      apiCallFunction: add, // Pass the RTK Query mutation function
      body: submitValues, // Send data without phoneNumber
    });
    LOG('API Response from executeApiRequest', response);
    setIsTaskSuccess(true);
    setModalVisible(true); // Show success modal
  };
  return (
    <View style={layout.flex}>
      <CustomHeader
        routeName={routes.main.contactUs}
        titleStyle={{width: vw * 75}}
      />
      <Container
        keyboardAware
        keyboardHandled={'handled'}
        contentContainerStyle={styles.mainContentContainer}>
        <View>
          <View style={{paddingVertical: spacing.medium}}></View>
          <Formik
            initialValues={{
              name: '',
              email: '',
              phoneNumber: '',
              phone: '',
              subject: '',
              message: '',
            }}
            validationSchema={changePasswordValidationSchema}
            validateOnChange={validateAfterSubmit}
            validateOnBlur={validateAfterSubmit}
            onSubmit={values => {
              // setIsLoading(true);
              handleSubmitt(values);
              // setIsLoading(false);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
              values,
              isValid,
            }) => {
              return (
                <View style={styles.contentContainer}>
                  {/* Full Name */}
                  <InputField
                    label="Name"
                    placeholder="Enter Name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    required
                    errors={touched.name && errors.name}
                    returnKeyType={'done'}
                  />
                  {/* Phone Number */}

                  <CustomPhoneInput
                    labelTitle={'Phone Number'}
                    value={values.phoneNumber}
                    formattedValue={values.formattedPhoneNumber}
                    setValue={value => {
                      setFieldValue('phoneNumber', value);
                    }}
                    setFormattedValue={formattedValue => {
                      setFieldValue('phone', formattedValue);
                    }}
                    valid={valid}
                    staric={true}
                    errors={touched?.phoneNumber && errors?.phoneNumber}
                    showMessage={showMessage}
                  />
                  {/* Email Address */}
                  <InputField
                    label="Email Address"
                    placeholder="example@gmail.com"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    required
                    errors={touched.email && errors.email}
                    returnKeyType={'done'}
                  />

                  {/* Subject */}
                  <InputField
                    label="Subject"
                    placeholder="Enter Subject"
                    onChangeText={handleChange('subject')}
                    onBlur={handleBlur('subject')}
                    value={values.subject}
                    required
                    errors={touched.subject && errors.subject}
                    returnKeyType={'done'}
                  />

                  {/* Message */}
                  <InputField
                    label="Message"
                    multiline
                    placeholder="Write your message here..."
                    onChangeText={handleChange('message')}
                    onBlur={handleBlur('message')}
                    value={values.message}
                    required
                    errors={touched.message && errors.message}
                    returnKeyType={'done'}
                    // leftIcon={'sms'}
                  />

                  {isLoading ? (
                    <ActivityLoader color={colors.theme.secondary} />
                  ) : (
                    <MainButton
                      style={styles.submitButton}
                      title={'Submit Now'}
                      disabled={isTaskSuccess}
                      onPress={() => {
                        setValidateAfterSubmit(true);
                        handleSubmit();
                      }}
                      // onPress={() => {
                      //   setIsTaskSuccess(true);
                      //   setIsLoading(true);
                      //   setTimeout(() => {
                      //     setIsLoading(false);
                      //     setModalVisible(true); // Show the success modal
                      //   }, 2000);
                      // }}
                    />
                  )}
                </View>
              );
            }}
          </Formik>
        </View>
        <ModalComponent
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onPressCross={() => {
            setModalVisible(false);
            setTimeout(() => {
              navigation.navigate(routes.tab.home);
            }, 1000);
          }}
          title={`System Alert`}
          message={`Your Response has been submitted successfuly!`}
          buttonText="Got it"
          onButtonPress={() => {
            setModalVisible(false);
            setTimeout(() => {
              navigation.navigate(routes.tab.home);
            }, 1000);
          }}
        />
      </Container>
    </View>
  );
};

export default ContactUs;
