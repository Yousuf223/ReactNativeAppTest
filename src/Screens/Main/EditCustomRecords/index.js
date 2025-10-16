
// import React, { useState } from 'react';
// import { View, ScrollView, StyleSheet } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import CustomText from '../../../Components/wrappers/Text/CustomText';
// import fonts from '../../../Assets/fonts';
// import { font, spacing } from '../../../theme/styles';
// import { colors } from '../../../theme/colors';
// import { MainButton } from '../../../Components/Buttons/MainButton';
// import InputField from '../../../Components/InputField';
// import { vh } from '../../../theme/units';
// import CustomHeader from '../../../Components/CustomHeader';
// import routes from '../../../Navigation/routes';
// import { LOG, extractFilenameFromUrl } from '../../../Utils/helperFunction';
// import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
// import { imageServer } from '../../../Api/configs';
// import ActivityLoader from '../../../Components/ActivityLoader';
// import { recordsApi } from '../../../Api/recordsApiSlice';
// import ModalComponent from '../../../Components/ModalComponent';
// import { executeApiRequest } from '../../../Api/methods/method';
// import { persistor } from '../../../Redux/store';
// import { otherRecordsApi } from '../../../Api/otherRecordsApiSlice';
// import { useDispatch } from 'react-redux';
// import { autopartsApi } from '../../../Api/autopartsApiSlice';
// import { gasApi } from '../../../Api/gasApiSlice';
// import { accidentApi } from '../../../Api/accidentApiSlice';
// import { travelApi } from '../../../Api/travelApiSlice';
// import { maintenanceAutopartsApi } from '../../../Api/mainteinanceAutopartsApiSlice';
// import { equipmentApi } from '../../../Api/equipmentApiSlice';
// import { petApi } from '../../../Api/petApiSlice';
// import { vetApi } from '../../../Api/vetApiSlice';
// import { repairAutopartsApi } from '../../../Api/repairAutopartsApiSlice';
// import { useEditMutation } from '../../../Api/customRecordsApiSlice';

// const extractInitialValues = (data, attachments) => {
//   const initialValues = {};
//   data.forEach(item => {
//     const cleanedValue =
//       typeof item.detail === 'string'
//         ? item.detail.replace(/\$/g, '').trim()
//         : item.detail;
//     initialValues[item.id] = cleanedValue || '';
//   });
//   initialValues.gallery = normalizeGallery(attachments);
//   initialValues.removeAttachments = [];
//   initialValues.description = '';
//   LOG('GALLERY: ', initialValues?.gallery);
//   return initialValues;
// };

// const capitalizeFirstLetter = text => {
//   if (!text) return '';
//   return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
// };

// const generateValidationSchema = data => {
//   const shape = {};
//   data.forEach(item => {
//     shape[item.id] = Yup.string().required(`${item.title} is required`);
//   });
//   return Yup.object().shape(shape);
// };

// const normalizeGallery = gallery => {
//   if (!gallery || !Array.isArray(gallery)) return [];
//   return gallery
//     .filter(item => item?.image?.uri)
//     .map((item, index) => {
//       const uri = item.image.uri;
//       return {
//         uri,
//         type: 'image/jpeg',
//         name: extractFilenameFromUrl(uri) || `image${index}.jpg`,
//       };
//     });
// };

// const EditCustomRecords = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { editableData, type, originalData, attachments, id } = route.params;
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [edit, { isLoading: isEditLoading, isError, error }] = useEditMutation();
//   const dispatch = useDispatch();

//   LOG('type: ', type);
//   LOG('ID PARAM: ', id);
//   LOG('EditableData: ', editableData);
//   LOG('OriginalData: ', originalData);
//   LOG('Attachments Data: ', attachments);
//   const initialValues = extractInitialValues(editableData, attachments);
//   const validationSchema = generateValidationSchema(editableData);

//   console.log('initialValues', initialValues);

//   const handleSubmit = async (values, { setFieldValue }) => {
//     console.log('Edited values:', values);
//     // setIsLoading(true);
//     let payload = { ...values };

//     // Function to convert the input to the desired format
//     function convertToDesiredFormat(input) {
//       const data = [];
//       for (const key in input) {
//         console.log('keykeykey',key);
        
//         if (key !== 'gallery' && key !== 'removeAttachments' && key !== 'description') {
//           let value = input[key];
//           if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)) {
//             const [month, day, year] = value.split('/');
//             value = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00.000`;
//           }
//           data.push({
//             fieldId: key,
//             value: value,
//           });
//         }
//       }
//       return {
//         data:JSON.stringify(data),
//         removeAttachments:JSON.stringify(input.removeAttachments)|| [],
//         description: input.description || '',
//       };
//     }

//     const result = convertToDesiredFormat(payload);
//     console.log('Payload:', result);

//     // Uncomment to test API call
//     try {
//       const response = await executeApiRequest({
//         apiCallFunction: edit,
//         body: { ...result, gallery: values.gallery },
//         params: { id: id, type: type },
//         formData: true,
//         toast: true,
//         timeout: 30000,
//       });
//       LOG('Record Update Success:', response);
//       if (response) {
//         setModalVisible(true);
//       }
//     } catch (error) {
//       LOG('Vehicle Update Error:', error);
//     } finally {
//       // setIsLoading(false);
//     }
//     // navigation.goBack();
//   };

//   const handleModal = () => {
//     setModalVisible(false);
//     setTimeout(() => {
//       if (['HOME', 'TRAVEL', 'SMALL', 'HEAVY', 'TOOLS', 'PET', 'VET'].includes(type)) {
//         dispatch(otherRecordsApi.util.resetApiState());
//         navigation.navigate(routes?.tab?.otherrecord);
//       } else {
//         dispatch(recordsApi.util.resetApiState());
//         navigation.navigate(routes?.tab?.records);
//       }
//       setTimeout(async () => {
//         await persistor.purge();
//       }, 550);
//     }, 1000);
//   };

//   return (
//     <>
//       <CustomHeader
//         title={`Edit ${capitalizeFirstLetter(type)} Details`}
//         routeName={routes?.main.editautoparts}
//         disabled={true}
//       />
//       <ScrollView contentContainerStyle={styles.container}>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({
//             values,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             setFieldValue,
//             errors,
//             touched,
//           }) => (
//             <View style={{ gap: 20 }}>
//               {editableData.map(item => {
//                 let editFalse = [
//                   'Date',
//                   'Name',
//                   'Brand',
//                   'Make',
//                   'Part Number',
//                   'Num',
//                   'To',
//                   'Type',
//                   'Specie',
//                   'Condition',
//                   'Breed',
//                   'From',
//                 ];
//                 let newEdit = editFalse.some(items => item.title.includes(items));
//                 LOG('New Edit: ', newEdit);

//                 return (
//                   <View key={item.id}>
//                     <InputField
//                       label={
//                         item?.title.includes('Expense') ||
//                         item?.title.includes('Cost') ||
//                         item?.title.includes('Payment') ||
//                         item?.title.includes('Rate') ||
//                         item?.title.includes('Price')
//                           ? `${item?.title} ($)`
//                           : item?.title
//                       }
//                       required={true}
//                       value={values[item.id]}
//                       onChangeText={handleChange(item.id)}
//                       onBlur={handleBlur(item.id)}
//                       placeholder={`Enter ${item.title}`}
//                       placeholderTextColor={colors.text.placeholder}
//                       errors={touched[item.id] && errors[item.id]}
//                       editable={!newEdit}
//                       inputContainer2={!newEdit ? {} : { borderColor: '#A0A0A0' }}
//                       keyboardType={
//                         item?.title.includes('Expense') ||
//                         item?.title.includes('Cost') ||
//                         item?.title.includes('Payment') ||
//                         item?.title.includes('Rate') ||
//                         item?.title.includes('Price') ||
//                         item?.title.includes('Mileage') ||
//                         item?.title.includes('Warranty') ||
//                         item?.title.includes('Phone')
//                           ? 'numeric'
//                           : 'default'
//                       }
//                     />
//                   </View>
//                 );
//               })}
//               <View style={{ alignItems: 'center', marginBottom: vh * 2 }}>
//                 <DocumentImagePicker
//                   handleImage={images => {
//                     const prevGallery = values.gallery || [];
//                     const newGallery = images || [];
//                     // Extract filenames of removed images using extractFilenameFromUrl
//                     const removedImages = prevGallery
//                       .filter(prevItem => !newGallery.some(newItem => newItem.name === prevItem.name))
//                       .map(item => extractFilenameFromUrl(item.uri) || item.name);

//                     const updatedRemoveAttachments = [
//                       ...(values.removeAttachments || []),
//                       ...removedImages,
//                     ];

//                     setFieldValue('gallery', newGallery);
//                     setFieldValue('removeAttachments', updatedRemoveAttachments);

//                     LOG('Updated gallery:', newGallery);
//                     LOG('Updated removeAttachments:', updatedRemoveAttachments);
//                   }}
//                   initialImages={values.gallery}
//                   errors={touched.gallery && errors.gallery}
//                   label={`${capitalizeFirstLetter(type)} Images`}
//                   required={true}
//                 />
//               </View>
//               {isEditLoading ? (
//                 <ActivityLoader color={colors.theme.secondary} />
//               ) : (
//                 <MainButton
//                   title="Save"
//                   onPress={handleSubmit}
//                   style={{ marginTop: spacing.large, alignSelf: 'center' }}
//                 />
//               )}
//             </View>
//           )}
//         </Formik>
//         <ModalComponent
//           isVisible={isModalVisible}
//           onClose={() => setModalVisible(false)}
//           onPressCross={handleModal}
//           title={`Record Updated`}
//           message={`You have successfully updated your record!`}
//           buttonText="Got it"
//           onButtonPress={handleModal}
//         />
//       </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: spacing.medium,
//     paddingBottom: spacing.extraLarge,
//   },
// });

// export default EditCustomRecords;


import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import fonts from '../../../Assets/fonts';
import { font, spacing } from '../../../theme/styles';
import { colors } from '../../../theme/colors';
import { MainButton } from '../../../Components/Buttons/MainButton';
import InputField from '../../../Components/InputField';
import { vh } from '../../../theme/units';
import CustomHeader from '../../../Components/CustomHeader';
import routes from '../../../Navigation/routes';
import { LOG, extractFilenameFromUrl } from '../../../Utils/helperFunction';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import { imageServer } from '../../../Api/configs';
import ActivityLoader from '../../../Components/ActivityLoader';
import { recordsApi } from '../../../Api/recordsApiSlice';
import ModalComponent from '../../../Components/ModalComponent';
import { executeApiRequest } from '../../../Api/methods/method';
import { persistor } from '../../../Redux/store';
import { otherRecordsApi } from '../../../Api/otherRecordsApiSlice';
import { useDispatch } from 'react-redux';
import { autopartsApi } from '../../../Api/autopartsApiSlice';
import { gasApi } from '../../../Api/gasApiSlice';
import { accidentApi } from '../../../Api/accidentApiSlice';
import { travelApi } from '../../../Api/travelApiSlice';
import { maintenanceAutopartsApi } from '../../../Api/mainteinanceAutopartsApiSlice';
import { equipmentApi } from '../../../Api/equipmentApiSlice';
import { petApi } from '../../../Api/petApiSlice';
import { vetApi } from '../../../Api/vetApiSlice';
import { repairAutopartsApi } from '../../../Api/repairAutopartsApiSlice';
import { useEditMutation } from '../../../Api/customRecordsApiSlice';

const extractInitialValues = (data, attachments) => {
  const initialValues = {};
  data.forEach(item => {
    const cleanedValue =
      typeof item.detail === 'string'
        ? item.detail.replace(/\$/g, '').trim()
        : item.detail;
    initialValues[item.id] = cleanedValue || '';
  });
  initialValues.gallery = normalizeGallery(attachments);
  initialValues.removeAttachments = [];
  initialValues.description = '';
  LOG('GALLERY: ', initialValues?.gallery);
  return initialValues;
};

const capitalizeFirstLetter = text => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const generateValidationSchema = data => {
  const shape = {};
  data.forEach(item => {
    shape[item.id] = Yup.string().required(`${item.title} is required`);
  });
  return Yup.object().shape(shape);
};

const normalizeGallery = gallery => {
  if (!gallery || !Array.isArray(gallery)) return [];
  return gallery
    .filter(item => item?.image?.uri)
    .map((item, index) => {
      const uri = item.image.uri;
      return {
        uri,
        type: 'image/jpeg',
        name: extractFilenameFromUrl(uri) || `image${index}.jpg`,
      };
    });
};

const EditCustomRecords = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { editableData, type, originalData, attachments, id } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newImages, setNewImages] = useState([]); // Track new images separately
  const [edit, { isLoading: isEditLoading, isError, error }] = useEditMutation();
  const dispatch = useDispatch();

  LOG('type: ', type);
  LOG('ID PARAM: ', id);
  LOG('EditableData: ', editableData);
  LOG('OriginalData: ', originalData);
  LOG('Attachments Data: ', attachments);
  const initialValues = extractInitialValues(editableData, attachments);
  const validationSchema = generateValidationSchema(editableData);

  console.log('initialValues', initialValues);

  const handleSubmit = async (values, { setFieldValue }) => {
    console.log('Edited values:', values);
    setIsLoading(true);
    let payload = { ...values };

    // Function to convert the input to the desired format
    function convertToDesiredFormat(input) {
      const data = [];
      for (const key in input) {
        console.log('keykeykey', key);
        if (key !== 'gallery' && key !== 'removeAttachments' && key !== 'description') {
          let value = input[key];
          if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)) {
            const [month, day, year] = value.split('/');
            value = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00.000`;
          }
          data.push({
            fieldId: key,
            value: value,
          });
        }
      }
      return {
        data: JSON.stringify(data),
        removeAttachments: JSON.stringify(input.removeAttachments || []),
        description: input.description || '',
      };
    }

    const result = convertToDesiredFormat(payload);
    console.log('Payload:', result);

    try {
      const response = await executeApiRequest({
        apiCallFunction: edit,
        body: { ...result, gallery: newImages }, // Send only new images or empty array
        params: { id: id, type: type },
        formData: true,
        toast: true,
        timeout: 30000,
      });
      LOG('Record Update Success:', response);
      if (response) {
        setModalVisible(true);
      }
    } catch (error) {
      LOG('Vehicle Update Error:', error);
    } finally {
      setIsLoading(false);
    }
    // navigation.goBack();
  };

  const handleModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      if (['HOME', 'TRAVEL', 'SMALL', 'HEAVY', 'TOOLS', 'PET', 'VET'].includes(type)) {
        dispatch(otherRecordsApi.util.resetApiState());
        navigation.navigate(routes?.tab?.otherrecord);
      } else {
        dispatch(recordsApi.util.resetApiState());
        navigation.navigate(routes?.tab?.otherrecord);
      }
      setTimeout(async () => {
        await persistor.purge();
      }, 550);
    }, 1000);
  };

  return (
    <>
      <CustomHeader
        title={`Edit ${capitalizeFirstLetter(type)} Details`}
        routeName={routes?.main.editautoparts}
        disabled={true}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
          }) => (
            <View style={{ gap: 20 }}>
              {editableData.map(item => {
                let editFalse = [
                  'Date',
                  'Name',
                  'Brand',
                  'Make',
                  'Part Number',
                  'Num',
                  'To',
                  'Type',
                  'Specie',
                  'Condition',
                  'Breed',
                  'From',
                ];
                let newEdit = editFalse.some(items => item.title.includes(items));
                LOG('New Edit: ', newEdit);

                return (
                  <View key={item.id}>
                    <InputField
                      label={
                        item?.title.includes('Expense') ||
                        item?.title.includes('Cost') ||
                        item?.title.includes('Payment') ||
                        item?.title.includes('Rate') ||
                        item?.title.includes('Price')
                          ? `${item?.title} ($)`
                          : item?.title
                      }
                      required={true}
                      value={values[item.id]}
                      onChangeText={handleChange(item.id)}
                      onBlur={handleBlur(item.id)}
                      placeholder={`Enter ${item.title}`}
                      placeholderTextColor={colors.text.placeholder}
                      errors={touched[item.id] && errors[item.id]}
                      editable={!newEdit}
                      inputContainer2={!newEdit ? {} : { borderColor: '#A0A0A0' }}
                      keyboardType={
                        item?.title.includes('Expense') ||
                        item?.title.includes('Cost') ||
                        item?.title.includes('Payment') ||
                        item?.title.includes('Rate') ||
                        item?.title.includes('Price') ||
                        item?.title.includes('Mileage') ||
                        item?.title.includes('Warranty') ||
                        item?.title.includes('Phone')
                          ? 'numeric'
                          : 'default'
                      }
                    />
                  </View>
                );
              })}
              <View style={{ alignItems: 'center', marginBottom: vh * 2 }}>
                <DocumentImagePicker
                  handleImage={images => {
                    const prevGallery = values.gallery || [];
                    const newGallery = images || [];
                    // Extract filenames of removed images
                    const removedImages = prevGallery
                      .filter(prevItem => !newGallery.some(newItem => newItem.name === prevItem.name))
                      .map(item => extractFilenameFromUrl(item.uri) || item.name);

                    // Determine new images (not present in initial gallery)
                    const initialGalleryNames = initialValues.gallery.map(item => item.name);
                    const addedImages = newGallery.filter(
                      item => !initialGalleryNames.includes(item.name)
                    );

                    const updatedRemoveAttachments = [
                      ...(values.removeAttachments || []),
                      ...removedImages,
                    ];

                    setFieldValue('gallery', newGallery); // Update UI with all images
                    setFieldValue('removeAttachments', updatedRemoveAttachments);
                    setNewImages(addedImages); // Track only new images for API

                    LOG('Updated gallery:', newGallery);
                    LOG('Updated removeAttachments:', updatedRemoveAttachments);
                    LOG('New images:', addedImages);
                  }}
                  initialImages={values.gallery}
                  errors={touched.gallery && errors.gallery}
                  label={`${capitalizeFirstLetter(type)} Images`}
                  required={true}
                />
              </View>
              {isEditLoading || isLoading ? (
                <ActivityLoader color={colors.theme.secondary} />
              ) : (
                <MainButton
                  title="Save"
                  onPress={handleSubmit}
                  style={{ marginTop: spacing.large, alignSelf: 'center' }}
                />
              )}
            </View>
          )}
        </Formik>
        <ModalComponent
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onPressCross={handleModal}
          title={`Record Updated`}
          message={`You have successfully updated your record!`}
          buttonText="Got it"
          onButtonPress={handleModal}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    paddingBottom: spacing.extraLarge,
  },
});

export default EditCustomRecords;