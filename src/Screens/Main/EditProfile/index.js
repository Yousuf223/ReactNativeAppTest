import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { executeApiRequest } from '../../../Api/methods/method';
import { useUpdateMutation } from '../../../Api/profileApiSlice';
import ActivityLoader from '../../../Components/ActivityLoader';
import { MainButton } from '../../../Components/Buttons/MainButton';
import Container from '../../../Components/Container';
import CustomHeader from '../../../Components/CustomHeader';
import Profile from '../../../Components/ImagePicker/ProfileImagePicker/ProfileImagePicker';
import InputField from '../../../Components/InputField';
import ModalComponent from '../../../Components/ModalComponent';
import routes from '../../../Navigation/routes';
import { colors } from '../../../theme/colors';
import {
  getImageUrl,
  LOG
} from '../../../Utils/helperFunction';
import styles from './styles';

const EditProfile = () => {
  const navigation = useNavigation();
  const [update, { isLoading }] = useUpdateMutation();
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const userDetails = useSelector(state => state?.auth?.user || {});
  console.log('userDetails', userDetails);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number is not valid')
      .required('Phone Number is required'),
  });

  const handleImage = imagePath => {
    setProfileImage(imagePath);
  };

  const handleUpdateProfile = async values => {
    LOG('values', values);
    const updatedProfileObj = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      phone: values.phoneNumber,
      image: profileImage || '',
    };

    // Call executeApiRequest with the update mutation
    const response = await executeApiRequest({
      apiCallFunction: update, // RTK Query mutation function
      body: updatedProfileObj, // FormData payload
      formData: true, // Indicate this is a FormData request
      toast: true, // Show toast messages
      timeout: 30000, // 30-second timeout
    });

    // Handle successful response
    LOG('Profile Update Success:', response);
    setModalVisible(true); // Show success modal (assuming this is defined in your component)
    if (response) {
      // Optional: Navigate after success
      setTimeout(() => navigation.goBack(), 1000); // Uncomment if needed
    }

    //   return response; // Return response if needed elsewhere
    // } catch (err) {
    //   LOG('Profile Update Error:', err);
    //   throw err;
    // }
  };
  return (
    <>
      <CustomHeader routeName={routes.main.editProfile} />
      <Container keyboardAware>
        <Formik
          initialValues={{
            firstName: userDetails?.firstName || '',
            lastName: userDetails?.lastName || '',
            email: userDetails?.email || '',
            phoneNumber: userDetails?.phone || '',

          }}
          // validationSchema={validationSchema}
          onSubmit={handleUpdateProfile}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            values,
            touched,
          }) => {
            LOG('err-formik:', errors);
            let image = getImageUrl(userDetails?.image);
            return (
              <View style={styles.contentContainer}>
                <View style={{ borderRadius: 50 }}>
                  <Profile
                    handleImage={handleImage}
                    isEdit={true}
                    initialImage={image}
                  />
                </View>
                <View style={styles.inputRow}>
                  <InputField
                    label={'First Name'}
                    placeholder="Enter Your First Name"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    error={touched.firstName && errors.firstName}
                  />
                  <InputField
                    label={'Last Name'}
                    placeholder="Enter Your Last Name"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    error={touched.lastName && errors.lastName}
                  />
                  <InputField
                    label={'Email Address'}
                    placeholder="Alexa@gmail.com"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={touched.email && errors.email}
                    editable={false}
                  />
          
                  <InputField
                    label={'Phone Number'}
                    placeholder="Enter Your Phone Number"
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    errors={touched.phoneNumber && errors.phoneNumber}
                    keyboardType={'phone-pad'}
                  />
                </View>
                <View style={styles.rememberRow}>
                  {isLoading ? (
                    <ActivityLoader color={colors.theme.secondary} />
                  ) : (
                    <MainButton
                      style={styles.submitButton}
                      title={'Update Profile'}
                      onPress={handleSubmit}
                    />
                  )}
                </View>
              </View>
            );
          }}
        </Formik>
        <ModalComponent
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onPressCross={() => {
            setModalVisible(false);
            navigation?.goBack();
          }}
          title="Success"
          message="Your profile has been updated successfully!"
          buttonText="Okay"
          onButtonPress={() => {
            setModalVisible(false);
            navigation?.goBack();
          }}
        />
      </Container>
    </>
  );
};

export default EditProfile;
