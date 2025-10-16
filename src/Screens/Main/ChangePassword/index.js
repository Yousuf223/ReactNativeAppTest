import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import * as Yup from 'yup';
import {MainButton} from '../../../Components/Buttons/MainButton';
import Container from '../../../Components/Container';
import InputField from '../../../Components/InputField';
import {layout} from '../../../theme/styles';
import styles from './styles';
import CustomHeader from '../../../Components/CustomHeader';
import routes from '../../../Navigation/routes';
import {vh} from '../../../theme/units';
import BottomSheet from '../../../Components/BottomSheet';
import {BlurView} from '@react-native-community/blur';
import ModalComponent from '../../../Components/ModalComponent';
import {colors} from '../../../theme/colors';
import ActivityLoader from '../../../Components/ActivityLoader';
// Validation Schema using Yup
const changePasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    .required('Confirm password is required'),
});
const ChangePassword = () => {
  const navigation = useNavigation();
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false); // State for disabling the button

  const handleLogin = values => {
    setIsTaskSuccess(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setModalVisible(true);
    }, 2000);
  };
  return (
    <View style={layout.flex}>
      <Container
        keyboardAware
        keyboardHandled={'handled'}
        contentContainerStyle={styles.mainContentContainer}>
        <View>
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={changePasswordValidationSchema}
            validateOnChange={validateAfterSubmit}
            validateOnBlur={validateAfterSubmit}
            onSubmit={values => {
              handleLogin(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
              isValid,
            }) => {
              return (
                <>
                  <CustomHeader routeName={routes.main.changePassword} />
                  <View style={styles.contentContainer}>
                    <InputField
                      label="Current Password"
                      placeholder="Enter Current Password"
                      onChangeText={handleChange('currentPassword')}
                      onBlur={handleBlur('currentPassword')}
                      value={values?.currentPassword}
                      required
                      password
                      errors={touched.currentPassword && errors.currentPassword}
                      returnKeyType={'done'}
                    />
                    <InputField
                      label="New Password"
                      placeholder="Enter New Password"
                      onChangeText={handleChange('newPassword')}
                      onBlur={handleBlur('newPassword')}
                      value={values?.newPassword}
                      required
                      password
                      errors={touched.newPassword && errors.newPassword}
                      returnKeyType={'done'}
                    />
                    <InputField
                      label="Confirm Password"
                      placeholder="Enter Confirm Password"
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values?.confirmPassword}
                      required
                      password
                      errors={touched.confirmPassword && errors.confirmPassword}
                      returnKeyType={'done'}
                    />
                    {isLoading ? (
                      <ActivityLoader color={colors.theme.secondary} />
                    ) : (
                      <View>
                        <MainButton
                          style={styles.submitButton}
                          title={'Update Password'}
                          disabled={isTaskSuccess}
                          onPress={() => {
                            setValidateAfterSubmit(true);
                            handleSubmit();
                          }}
                        />
                      </View>
                    )}
                  </View>
                </>
              );
            }}
          </Formik>
          <ModalComponent
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            onPressCross={() => {
              setModalVisible(false);
              setTimeout(() => {
                navigation?.goBack();
              }, 1000);
            }}
            title="System Message"
            message="Your password has been updated successfully!"
            buttonText="Got it"
            onButtonPress={() => {
              setModalVisible(false);
              setTimeout(() => {
                navigation?.goBack();
              }, 1000);
            }}
          />
        </View>
      </Container>
    </View>
  );
};
export default ChangePassword;
