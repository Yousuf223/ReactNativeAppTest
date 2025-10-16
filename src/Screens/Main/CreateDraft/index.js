//

import {ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../../Components/CustomHeader';
import routes from '../../../Navigation/routes';
import {styles} from '../AddAccidentRecord/styles';
import {Formik} from 'formik';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import * as Yup from 'yup';
import {vh} from '../../../theme/units';
import {MainButton} from '../../../Components/Buttons/MainButton';
import ActivityLoader from '../../../Components/ActivityLoader';
import {colors} from '../../../theme/colors';
import {LOG, extractFileName} from '../../../Utils/helperFunction';
import SpaceLine from '../../../Components/SpaceLine';
import {useAddMutation} from '../../../Api/draftsApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';

const draftValidation = Yup.object().shape({
  gallery: Yup.array().min(1, 'At least one image is required in the gallery'),
});

const CreateDraft = props => {
  const {image, vehicleId} = props.route.params; // Add vehicleId to destructuring
  LOG('Images from params:', image);
  LOG('vehicleId from params:', vehicleId);

  const [add, {isLoading}] = useAddMutation();

  // Format the initial images from params
  const formatInitialImages = imageParam => {
    if (!imageParam) return [];

    // Handle case where imageParam is a single object or an array
    const images = Array.isArray(imageParam) ? imageParam : [imageParam];

    return images.map(img => {
      // Ensure the image object has the required fields
      return {
        uri: img.uri || img, // If img is a string (uri), use it directly
        type: img.type || 'image/jpeg', // Default to jpeg if type is missing
        name: img.name || extractFileName(img.uri || img), // Extract name if not provided
      };
    });
  };

  LOG('formatInitialImages', formatInitialImages(image));
  const handleSubmitForm = async values => {
    LOG('Form submitted with values:', values);
    try {
      // Prepare payload for API
      const payload = {
        gallery: values.gallery,
        vehicleId: vehicleId,
      };

      // Make API call

      const response = await executeApiRequest({
        apiCallFunction: add,
        body: payload,
        formData: true,
        toast: true,
        timeout: 30000,
      });
      LOG('Save draft success:', response);

      // Navigate back or show success message
      props.navigation.goBack();
    } catch (error) {
      LOG('Error creating draft:', error);
      // Handle error - you might want to show an error message to the user
    }
  };

  return (
    <>
      <CustomHeader routeName={routes?.main?.createdraft} />
      <ScrollView>
        <Formik
          initialValues={{
            gallery: formatInitialImages(image), // Initialize gallery with formatted images
          }}
          validationSchema={draftValidation}
          onSubmit={handleSubmitForm}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            resetForm,
          }) => {
            LOG('Formik values:', values);
            LOG('Formik errors:', errors);

            return (
              <View style={styles.barcontainer}>
                <View style={{alignItems: 'center', marginBottom: vh * 2}}>
                  <DocumentImagePicker
                    handleImage={images => {
                      LOG('Selected images:', images);
                      setFieldValue('gallery', images); // Update Formik field
                    }}
                    initialImages={values.gallery} // Use Formik's gallery field as source
                    errors={touched.gallery && errors.gallery}
                    label="Attachments"
                    required={true}
                  />
                  {isLoading ? (
                    <ActivityLoader color={colors.theme.secondary} />
                  ) : (
                    <MainButton
                      style={styles.submitButton}
                      title="Save Draft"
                      onPress={handleSubmit}
                    />
                  )}
                </View>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </>
  );
};

export default CreateDraft;
