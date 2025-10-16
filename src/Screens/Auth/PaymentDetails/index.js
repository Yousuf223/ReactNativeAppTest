import React, {useRef, useState} from 'react';
import {Alert, View} from 'react-native';

import {Formik} from 'formik';

import ActivityLoader from '../../../Components/ActivityLoader';
import BottomSheet from '../../../Components/BottomSheet';
import {
  MainButton,
  MainButtonWithGradient,
} from '../../../Components/Buttons/MainButton';
import Container from '../../../Components/Container';
import CustomHeader from '../../../Components/CustomHeader';
import InputField from '../../../Components/InputField';
import PaymentMethods from '../../../Components/PaymentMethods';
import SpaceLine from '../../../Components/SpaceLine';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import {useResetToScreen} from '../../../Functions/resetToScreen';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {font, layout} from '../../../theme/styles';
import {vh, vw} from '../../../theme/units';
import {cardPaymentValidation} from '../../../Validations/authValidations';
import styles from './styles';

import {BlurView} from '@react-native-community/blur';
import fonts from '../../../Assets/fonts';
import ModalComponent from '../../../Components/ModalComponent';

const PaymentDetails = ({navigation, route}) => {
  const signupData = route?.params?.signupData;
  const {resetToScreen} = useResetToScreen();
  const handleSubmit = () => {
    console.log('<<<< Handle Submit >>>>');
  };

  console.log(signupData, 'signup data in final screen');
  const [subPurchaseVisible, setSubPurchaseVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [unSuccessfullVisible, setUnSuccessfullVisible] = useState(false);
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false); // State for disabling the button

  const [visible, setVisible] = useState(false);

  const sheetRef = useRef(null);
  const paymentSuccessRef = useRef(null);

  const handlePurchaseVisibility = () => {
    if (sheetRef?.current) {
      sheetRef.current.close();
      setSubPurchaseVisible(false);
    }
  };

  const handleVisibility = () => setVisible(!visible);
  const onBackdropPress = () => handleVisibility();

  const purchaseNow = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
      setSubPurchaseVisible(false);
    }
    setIsLoading(true);
    setTimeout(() => {
      if (paymentSuccessRef?.current) paymentSuccessRef?.current.open();
      setIsLoading(false);
      setSuccessVisible(true);
    }, 2000);
  };

  const handleSuccessVisibility = () => {
    if (paymentSuccessRef.current) {
      paymentSuccessRef.current.close();
      setVisible(false);
    }
  };

  const handleUnsuccessfulVisibility = () =>
    setUnSuccessfullVisible(!unSuccessfullVisible);

  const onPaymentSuccess = data => {
    if (paymentSuccessRef.current) paymentSuccessRef.current.close();
    setVisible(false);
    setTimeout(() => {
      setIsLoading(false);
      resetToScreen(0, routes.mainStack.main);
    }, 2000);
  };

  return (
    <>
      <Container
        keyboardAware
        keyboardHandled={'handled'}
        contentContainerStyle={styles.container}>
        <View style={layout.flex}>
          <CustomHeader routeName={routes.main.paymentDetails} />

          <Formik
            initialValues={{
              cardholdername: '',
              cardnumber: '',
              cvv: '',
              expiryDate: '',
            }}
            validationSchema={cardPaymentValidation}
            validateOnChange={validateAfterSubmit}
            validateOnBlur={validateAfterSubmit}
            onSubmit={values => onPaymentSuccess(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              setFieldValue,
              isValid,
              values,
            }) => {
              return (
                <View style={{gap: vh * 2, marginTop: '10%'}}>
                  {/* <PaymentMethods /> */}

                  <InputField
                    label={'Card Holder Name'}
                    placeholder={'Enter Card Holder Name'}
                    onChangeText={handleChange('cardholdername')}
                    errors={errors?.cardholdername}
                    required
                  />
                  <InputField
                    label={'Card Number'}
                    onChangeText={handleChange('cardnumber')}
                    keyboardType={'number-pad'}
                    maxLength={16}
                    placeholder={'Enter Card Number'}
                    errors={errors?.cardnumber}
                    required
                  />
                  {/* <View style={layout.flexRow}>
                    <InputField
                      label={'Expiry Date'}
                      style={styles.datePicker}
                      keyboardType={'number-pad'}
                      placeholder="mm"
                      onChangeText={handleChange('month')}
                      errors={errors?.month}
                      maxLength={2}
                      required
                    />
                    <InputField
                      onChangeText={handleChange('year')}
                      style={styles.datePicker}
                      errors={errors?.year}
                      keyboardType={'number-pad'}
                      placeholder="yy"
                      maxLength={2}
                    />
                  </View> */}

                  <InputField
                    label="Expiry Date"
                    // style={styles.datePicker}
                    keyboardType="number-pad"
                    placeholder="MM/YY"
                    onChangeText={text => {
                      let formattedText = text.replace(/\D/g, ''); // Sirf numbers allow
                      if (formattedText.length > 2) {
                        formattedText = `${formattedText.slice(
                          0,
                          2,
                        )}/${formattedText.slice(2, 4)}`;
                      }
                      handleChange('expiryDate')(formattedText);
                    }}
                    value={values.expiryDate}
                    errors={errors?.expiryDate}
                    maxLength={5} // MM/YY format
                    required
                  />
                  <InputField
                    label={'CVV'}
                    onChangeText={handleChange('cvv')}
                    placeholder={'Enter CVV Code'}
                    required
                    keyboardType={'number-pad'}
                    maxLength={4}
                    errors={errors?.cvv}
                    returnKeyType="done"
                  />
                  {/* <SpaceLine style={{margin: 15}} /> */}
                  {isLoading ? (
                    <ActivityLoader color={colors.theme.secondary} />
                  ) : (
                    <MainButton
                      // style={styles.submitButton}
                      title={'Pay Now!'}
                      disabled={isTaskSuccess}
                      onPress={() => {
                        setIsTaskSuccess(true);
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          setModalVisible(true); // Show the success modal
                        }, 2000);
                      }}
                      style={{alignSelf: 'center'}}
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
              resetToScreen(0, routes.auth.login);
            }, 1000);
          }}
          title={`Payment Success`}
          message={`Payment has been made successfully!`}
          buttonText="Got it"
          onButtonPress={() => {
            setModalVisible(false);
            setTimeout(() => {
              resetToScreen(0, routes.auth.login);
            }, 1000);
          }}
        />
      </Container>
      {/* <BottomSheet
        togglePopup={sheetRef}
        successPopup={true}
        onBackButtonPress={onBackdropPress}
        modalHeight={vh * 40}
        onBackdropPress={onBackdropPress}
        onPress={() => {
          if (sheetRef.current) {
            sheetRef.current.close();
            setVisible(false);
            setTimeout(() => {
              resetToScreen(0, routes.mainStack.main);
            }, 550);
          }
        }}
        label={'Payment Successfully'}
        description={`Payment against the subscription has been made successfully!`}
      />
      {visible && (
        <BlurView
          style={styles.absolute}
          blurType="dark"
          blurAmount={2}
          reducedTransparencyFallbackColor="white"
        />
      )} */}
    </>
  );
};

export default PaymentDetails;
