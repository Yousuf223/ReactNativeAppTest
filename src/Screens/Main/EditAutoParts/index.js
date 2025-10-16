// import DateTimePicker from '@react-native-community/datetimepicker';
// import React, {useRef, useState} from 'react';
// import {ScrollView, TouchableOpacity, View} from 'react-native';
// import fonts from '../../../Assets/fonts';
// import CustomHeader from '../../../Components/CustomHeader';
// import DropDown from '../../../Components/DropDown';
// import InputField from '../../../Components/InputField';
// import MyIcons from '../../../Components/MyIcons';
// import CustomText from '../../../Components/wrappers/Text/CustomText';
// import routes from '../../../Navigation/routes';
// import {colors} from '../../../theme/colors';
// import {font} from '../../../theme/styles';
// import {Vehicle, VehicleMech, VehicleStore} from '../../../Utils/dummyData';
// import {styles} from './styles';
// import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
// import {vh, vw} from '../../../theme/units';
// import {
//   MainButton,
//   MainButtonWithGradient,
// } from '../../../Components/Buttons/MainButton';
// import {useNavigation} from '@react-navigation/native';
// import BottomSheet from '../../../Components/BottomSheet';
// import {BlurView} from '@react-native-community/blur';
// import CustomDatePicker from '../../../Components/CustomDatePicker';
// import ModalComponent from '../../../Components/ModalComponent';
// import ActivityLoader from '../../../Components/ActivityLoader';
// const EditAutoParts = () => {
//   const navigation = useNavigation();
//   const [selectedVehicle, setSelectedVehicle] = useState('');
//   const [selectedStore, setSelectedStore] = useState('');
//   const [selectedMechanic, setSelectedMechanic] = useState('');
//   const [dob, setDob] = useState('');
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isTaskSuccess, setIsTaskSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       const formattedDate = selectedDate.toISOString().split('T')[0];
//       setDob(formattedDate);
//     }
//   };
//   const FilterInputRender = () => (
//     <View style={styles.barcontainer}>
//       <DropDown
//         label={'Select Vehicle'}
//         placeholder={'Select'}
//         textColor={
//           selectedVehicle ? colors?.text?.dimBlack : colors?.text?.grey
//         }
//         onValueChange={setSelectedVehicle}
//         dynamicData={Vehicle}
//       />
//       <TouchableOpacity
//         style={styles.addmore}
//         onPress={() => navigation.navigate(routes.main.addVehicles)}>
//         <MyIcons name={'add'} size={14} />
//         <CustomText
//           text="Add More"
//           font={fonts.benzin.regular}
//           size={font.medium}
//           color={colors.text.red}
//           style={{marginTop: 5}}
//         />
//       </TouchableOpacity>
//       <DropDown
//         label={'Select Store'}
//         placeholder={'Select'}
//         textColor={selectedStore ? colors?.text?.dimBlack : colors?.text?.grey}
//         onValueChange={setSelectedStore}
//         dynamicData={VehicleStore}
//       />
//       <TouchableOpacity
//         style={styles.addmore}
//         onPress={() => navigation.navigate(routes.main.addastore)}>
//         <MyIcons name={'add'} size={15} />
//         <CustomText
//           text="Add More"
//           font={fonts.benzin.regular}
//           size={font.medium}
//           color={colors.text.red}
//           style={{marginTop: 5}}
//         />
//       </TouchableOpacity>
//       <DropDown
//         label={'Select Seller'}
//         placeholder={'Select'}
//         textColor={
//           selectedMechanic ? colors?.text?.dimBlack : colors?.text?.grey
//         }
//         onValueChange={setSelectedMechanic}
//         dynamicData={VehicleMech}
//       />
//       <TouchableOpacity
//         style={styles.addmore}
//         onPress={() => navigation.navigate(routes.main.addnewseller)}>
//         <MyIcons name={'add'} size={15} />
//         <CustomText
//           text="Add New Seller"
//           font={fonts.benzin.regular}
//           size={font.medium}
//           color={colors.text.red}
//           style={{marginTop: 5}}
//         />
//       </TouchableOpacity>
//       {/* <View style={styles.doblabel}>
//         <CustomText
//           text="Enter Date"
//           font={fonts.benzin.regular}
//           size={font.small}
//           color={colors.text.dimBlack}
//         />
//       </View>
//       <TouchableOpacity
//         style={styles.dateContainer}
//         onPress={() => setShowDatePicker(true)}>
//         <CustomText
//           text={dob ? dob : 'Enter Date'}
//           font={fonts.benzin.regular}
//           size={font.small}
//           color={colors.text.dimBlack}
//         />
//         <MyIcons name={'calendar'} />
//       </TouchableOpacity> */}

//       {/* {showDatePicker && (
//         <DateTimePicker
//           value={dob ? new Date(dob) : new Date()}
//           mode="date"
//           display="default"
//           maximumDate={new Date()}
//           onChange={handleDateChange}
//         />
//       )} */}

//       <CustomDatePicker />
//     </View>
//   );
//   const PartDetails = () => {
//     return (
//       <View style={[styles.barcontainer]}>
//         <CustomText
//           text="Parts Details"
//           size={font.xxlarge}
//           font={fonts.clash.regular}
//           color={colors.text.dimBlack}
//           style={{marginBottom: 10, marginLeft: 10}}
//         />
//         <InputField label="Enter Part Name" placeholder="Enter Part Name" />
//         <InputField label="Brand Name" placeholder="Enter Brand Name" />
//         <DropDown
//           label={'Conditions'}
//           placeholder={'Select'}
//           textColor={
//             selectedVehicle ? colors?.text?.dimBlack : colors?.text?.grey
//           }
//           onValueChange={setSelectedVehicle}
//           dynamicData={Vehicle}
//         />
//         <InputField
//           label="Price ($)"
//           placeholder="Enter Price"
//           keyboardType={'numeric'}
//         />
//         <InputField
//           label="Part Number"
//           placeholder="Enter Part Number"
//           keyboardType={'numeric'}
//         />
//         <InputField
//           label="Warranty Manufacture"
//           placeholder="Enter Manufacture"
//         />
//         <InputField label="Extended Warrantee" placeholder="Enter Warrantee" />
//         <InputField
//           label="Cost Of Extended Warrantee ($)"
//           placeholder="Enter Warrantee"
//           keyboardType={'numeric'}
//         />
//         <InputField
//           label="Current Car Mileage"
//           placeholder="Enter Mileage"
//           keyboardType={'numeric'}
//         />
//         <InputField
//           label="Receipt Number"
//           placeholder="Enter Receipt"
//           keyboardType={'numeric'}
//         />
//         <View>
//           <DocumentImagePicker />
//         </View>
//         {isLoading ? (
//           <ActivityLoader color={colors.theme.secondary} />
//         ) : (
//           <MainButton
//             style={styles.submitButton}
//             title={'Update Record'}
//             disabled={isTaskSuccess}
//             onPress={() => {
//               setIsTaskSuccess(true);
//               setIsLoading(true);
//               setTimeout(() => {
//                 setIsLoading(false);
//                 setModalVisible(true);
//               }, 2000);
//             }}
//           />
//         )}
//       </View>
//     );
//   };
//   return (
//     <>
//       <CustomHeader routeName={routes.main.editautoparts} />
//       <ScrollView>
//         {FilterInputRender && FilterInputRender()}
//         <View style={styles?.hr} />
//         {PartDetails && PartDetails()}
//         <ModalComponent
//           isVisible={isModalVisible}
//           onClose={() => setModalVisible(false)}
//           onPressCross={() => {
//             setModalVisible(false);
//             setTimeout(() => {
//               navigation?.goBack();
//             }, 1000);
//           }}
//           title={`Record Updated`}
//           message={`Your record has been updated successfully!`}
//           buttonText="Got it"
//           onButtonPress={() => {
//             setModalVisible(false);
//             setTimeout(() => {
//               navigation?.goBack();
//             }, 1000);
//           }}
//         />
//       </ScrollView>
//     </>
//   );
// };

// export default EditAutoParts;

// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Formik } from 'formik';
// import React, { useState } from 'react';
// import { ScrollView, StyleSheet, View } from 'react-native';
// import { useDispatch } from 'react-redux';
// import * as Yup from 'yup';
// import { executeApiRequest } from '../../../Api/methods/method';
// import { otherRecordsApi } from '../../../Api/otherRecordsApiSlice';
// import { recordsApi, useEditMutation } from '../../../Api/recordsApiSlice';
// import ActivityLoader from '../../../Components/ActivityLoader';
// import { MainButton } from '../../../Components/Buttons/MainButton';
// import CustomHeader from '../../../Components/CustomHeader';
// import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
// import InputField from '../../../Components/InputField';
// import ModalComponent from '../../../Components/ModalComponent';
// import routes from '../../../Navigation/routes';
// import { persistor } from '../../../Redux/store';
// import { colors } from '../../../theme/colors';
// import { spacing } from '../../../theme/styles';
// import { vh } from '../../../theme/units';
// import { LOG } from '../../../Utils/helperFunction';

// const extractInitialValues = (data, attachments) => {
//   const initialValues = {};
//   data.forEach(item => {
//     // Remove $ and trim spaces
//     const cleanedValue =
//       typeof item.detail === 'string'
//         ? item.detail.replace(/\$/g, '').trim()
//         : item.detail;
//     initialValues[item.id] = cleanedValue || '';
//   });
//   initialValues.gallery = normalizeGallery(attachments);
//   LOG('GALLERY: ', initialValues?.gallery);
//   return initialValues;
// };

// const capitalizeFirstLetter = text => {
//   if (!text) return '';
//   return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
// };

// // Dynamic Yup schema
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
//     .filter(item => item?.image?.uri) // make sure uri exists
//     .map((item, index) => {
//       const uri = item.image.uri;
//       return {
//         uri,
//         type: 'image/jpeg',
//         name: `image${index}.jpg`,
//       };
//     });
// };

// const EditAutoParts = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { editableData, type, originalData, attachments, id } = route.params;
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [edit, { isLoading: isEditLoading, isError, error }] = useEditMutation();
//   const dispatch = useDispatch();
//   const [newImages, setNewImages] = useState([])
//   const [deletedImages, setDeletedImages] = useState([])

//   LOG('type: ', type);
//   LOG('ID PARAM: ', id);
//   LOG('EditableData: ', editableData);
//   LOG('Original Data: ', originalData);
//   LOG('Attachments Data: ', attachments);
//   const initialValues = extractInitialValues(editableData, attachments);
//   const validationSchema = generateValidationSchema(editableData);

//   console.log('initialValues', initialValues);


//   const handleSubmit = async values => {
//     console.log('Edited values:', values);
//     setIsLoading(true);
//     let payload = {
//       ...values,
//     };
//     console.log('payload::,', payload);

//     // setModalVisible(true);
//     try {
//       const response = await executeApiRequest({
//         apiCallFunction: edit,
//         body: payload,
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
//       setIsLoading(false);
//     }
//     // navigation.goBack();
//   };
//   const handleModal = () => {
//     setModalVisible(false);
//     setTimeout(() => {
//       if (
//         ['HOME', 'TRAVEL', 'SMALL', 'HEAVY', 'TOOLS', 'PET', 'VET'].includes(
//           type,
//         )
//       ) {
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
//           onSubmit={handleSubmit}>
//           {({
//             values,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             setFieldValue,
//             errors,
//             touched,
//           }) =>
//           (
//             <View style={{ gap: 20 }}>
//               {/* Hide fields */}
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
//                   "From",

//                 ];
//                 let newEdit = editFalse.some(items =>
//                   item.title.includes(items),
//                 );
//                 LOG('New Edit: ', newEdit);

//                 return (
//                   <View key={item.id}>
//                     <InputField
//                       label={
//                         item?.title.includes('Expense') ||
//                           item?.title.includes('Cost') ||

//                           item?.title.includes('Payment') ||
//                           item?.title.includes('Rate') ||
//                           item?.title.includes('Price')
//                           ? `${item?.title} ($)`
//                           : item?.title
//                       }
//                       required={true}
//                       value={values[item.id]}
//                       onChangeText={handleChange(item.id)}
//                       onBlur={handleBlur(item.id)}
//                       placeholder={`Enter ${item.title}`}
//                       placeholderTextColor={colors.text.placeholder}
//                       // editable={item?.title.includes('Date') ? false : true}
//                       errors={touched[item.id] && errors[item.id]}
//                       editable={!newEdit}
//                       inputContainer2={!newEdit ? {} : { borderColor: '#A0A0A0' }}
//                       keyboardType={
//                         item?.title.includes('Expense') ||
//                           item?.title.includes('Cost') ||
//                           item?.title.includes('Payment') ||
//                           item?.title.includes('Rate') ||
//                           item?.title.includes('Mileage') ||
//                           item?.title.includes('Warranty') ||
//                           item?.title.includes('Phone') ||
//                           item?.title.includes('Price')
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
//                     LOG('images', images);
//                     setFieldValue('gallery', images);
//                   }}
//                   initialImages={values.gallery}
//                   errors={touched.gallery && errors.gallery}
//                   label={`${capitalizeFirstLetter(type)} Images`}
//                   required={true}
//                 />
//               </View>
//               {isLoading ? (
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

// export default EditAutoParts;

import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { executeApiRequest } from '../../../Api/methods/method';
import { otherRecordsApi } from '../../../Api/otherRecordsApiSlice';
import { recordsApi, useEditMutation } from '../../../Api/recordsApiSlice';
import ActivityLoader from '../../../Components/ActivityLoader';
import { MainButton } from '../../../Components/Buttons/MainButton';
import CustomHeader from '../../../Components/CustomHeader';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import InputField from '../../../Components/InputField';
import ModalComponent from '../../../Components/ModalComponent';
import routes from '../../../Navigation/routes';
import { persistor } from '../../../Redux/store';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/styles';
import { vh } from '../../../theme/units';
import { LOG } from '../../../Utils/helperFunction';

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
    .filter(item => item?.image?.uri) // make sure uri exists
    .map((item, index) => {
      const uri = item.image.uri;
      return {
        uri,
        type: 'image/jpeg',
        name: `image${index}.jpg`,
      };
    });
};

const EditAutoParts = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { editableData, type, originalData, attachments, id } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [edit, { isLoading: isEditLoading, isError, error }] = useEditMutation();
  const dispatch = useDispatch();
  const [newImages, setNewImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const initialValues = extractInitialValues(editableData, attachments);
  // const validationSchema = generateValidationSchema(editableData);

  console.log('initialValues', initialValues);

  const handleSubmit = async values => {
    console.log('Edited values:', values);
    setIsLoading(true);
    let payload = {
      ...values,
      gallery: newImages, // Include new images in payload
      deletedImages: JSON.stringify(deletedImages), // Include deleted image names in payload
    };
    console.log('payload::,', payload);

    try {
      const response = await executeApiRequest({
        apiCallFunction: edit,
        body: payload,
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
  };

  const handleModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      if (
        ['HOME', 'TRAVEL', 'SMALL', 'HEAVY', 'TOOLS', 'PET', 'VET'].includes(
          type,
        )
      ) {
        dispatch(otherRecordsApi.util.resetApiState());
        navigation.navigate(routes?.tab?.otherrecord);
      } else {
        dispatch(recordsApi.util.resetApiState());
        navigation.navigate(routes?.tab?.records);
      }
      setTimeout(async () => {
        await persistor.purge();
      }, 550);
    }, 1000);
  };
  const handleImageChange = (images, removedImage, setFieldValue) => {

    // Ensure images is an array
    const updatedImages = Array.isArray(images) ? images : [];
    setFieldValue('gallery', updatedImages);
    // Handle removed image
    if (removedImage) {
      setDeletedImages(prev => [...prev, removedImage]);
    }
    // Update newImages (only include images with file:// URI)
    const newImagesList = updatedImages.filter(img => img.uri?.startsWith('file://'));
    console.log('newImagesList', newImagesList);

    setNewImages(newImagesList);
  };
  return (
    <>
      <CustomHeader
        // title={`Edit ${capitalizeFirstLetter(type)} Details`}
        title={`Edit ${capitalizeFirstLetter(type == "VEHICLE_SERVICE" ? "Vehicle Maintenance" : type)}`}

        routeName={routes?.main.editautoparts}
        disabled={true}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={handleSubmit}>
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
              {editableData.filter(item => !item.id.startsWith('involvedCarDetails') && !item.id.startsWith('partDescription') && !item.id.startsWith('warrantyExpiration')  ).map(item => {

                let editFalse = [
                  'Date',
                  // 'Name',
                  // 'Brand',
                  'Make',
                  // 'Part Number',
                  // 'Num',
                  'To ',
                  'Type',
                  // 'Specie',
                  'Condition',
                  // 'Breed',
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
                          item?.title.includes('Mileage') ||
                          item?.title.includes('Warranty') ||
                          item?.title.includes('Phone') ||
                          item?.title.includes('Price')
                          ? 'numeric'
                          : 'default'
                      }
                    />
                  </View>
                );
              })}
              <View style={{ alignItems: 'center', marginBottom: vh * 2 }}>
                <DocumentImagePicker
                  handleImage={(images, removedImage) =>
                    handleImageChange(images, removedImage, setFieldValue)
                  }
                  initialImages={values.gallery}
                  errors={touched.gallery && errors.gallery}
                  label={`${capitalizeFirstLetter(type)} Images`}
                />
              </View>
              {isLoading ? (
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

export default EditAutoParts;
