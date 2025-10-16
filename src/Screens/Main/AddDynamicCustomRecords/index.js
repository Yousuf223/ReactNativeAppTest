// import {useNavigation} from '@react-navigation/native';
// import {Formik} from 'formik';
// import React, {useState} from 'react';
// import {ScrollView, TouchableOpacity, View} from 'react-native';
// import {useAddMutation} from '../../../Api/gasApiSlice';
// import {executeApiRequest} from '../../../Api/methods/method';
// import {useFetchVehicleByUserQuery} from '../../../Api/vehiclesApiSlice';
// import fonts from '../../../Assets/fonts';
// import ActivityLoader from '../../../Components/ActivityLoader';
// import {MainButton} from '../../../Components/Buttons/MainButton';
// import CustomDatePicker from '../../../Components/CustomDatePicker';
// import CustomHeader from '../../../Components/CustomHeader';
// import DropDown from '../../../Components/DropDown';
// import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
// import InputField from '../../../Components/InputField';
// import ModalComponent from '../../../Components/ModalComponent';
// import MyIcons from '../../../Components/MyIcons';
// import CustomText from '../../../Components/wrappers/Text/CustomText';
// import routes from '../../../Navigation/routes';
// import {colors} from '../../../theme/colors';
// import {font} from '../../../theme/styles';
// import {vh} from '../../../theme/units';
// import {LOG} from '../../../Utils/helperFunction';
// import {styles} from './styles';
// import * as Yup from 'yup';

// // Dynamic validation schema based on fields
// const createValidationSchema = (fields, hasAttachments) => {
//   const shape = {};
//   fields.forEach(field => {
//     if (field.type === 'TEXT') {
//       shape[field.label] = Yup.string().required(`${field.label} is required`);
//     } else if (field.type === 'DATE') {
//       shape[field.label] = Yup.string().required(`${field.label} is required`);
//     }
//   });
//   // shape.vehicleId = Yup.string().required('Vehicle is required');
//   if (hasAttachments) {
//     shape.gallery = Yup.array()
//       .min(1, 'At least one image is required')
//       .required('Image is required');
//   }
//   return Yup.object().shape(shape);
// };

// const AddDynamicCustomRecords = ({route}) => {
//   const {dynamicFields} = route?.params || {};
//   const {
//     fields = [],
//     hasAttachments = false,
//     name = 'Custom Record',
//   } = dynamicFields || {};

//   LOG('dynamicFields', dynamicFields);

//   const navigation = useNavigation();
//   const [selectedVehicle, setSelectedVehicle] = useState('');
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isTaskSuccess, setIsTaskSuccess] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     data,
//     isLoading: vehicleLoading,
//     isFetching,
//     error,
//     refetch,
//   } = useFetchVehicleByUserQuery();

//   const [add, {isLoading: isAdding}] = useAddMutation();

//   // Process vehicle data for dropdown
//   // let Vehicles = [];
//   // if (Array.isArray(data) && data.length > 0) {
//   //   const uniqueMakes = [
//   //     ...new Set(
//   //       data.map(item => ({
//   //         make: item?.vehicleDetails?.make,
//   //         id: item?._id,
//   //       })),
//   //     ),
//   //   ];
//   //   Vehicles = uniqueMakes.map((item, index) => ({
//   //     key: index,
//   //     value: item?.make ?? '',
//   //     id: item?.id ?? '',
//   //   }));
//   // }

//   // Create initial values for Formik
//   const initialValues = {
//     categoryId: '',
//     gallery: hasAttachments ? [] : undefined,
//     ...fields.reduce((acc, field) => {
//       acc[field.label] = '';
//       return acc;
//     }, {}),
//   };

//   // Handle form submission
//   const handleSubmitForm = async (values, {resetForm}) => {
//     // if (!selectedVehicle) {
//     //   alert('Please select a vehicle');
//     //   return;
//     // }

//     setIsSubmitting(true);
//     try {
//       let payload = {
//         ...values,
//         // vehicleId: selectedVehicle,
//         recordType: name, // Include record type (e.g., "Toy")
//       };

//       LOG('payloadpayloadpayloadpayload', payload);

//       const response = await executeApiRequest({
//         apiCallFunction: add,
//         body: payload,
//         formData: true,
//         toast: true,
//         timeout: 30000,
//       });

//       LOG('Dynamic Record Add Success:', response);
//       if (response?.status) {
//         setIsTaskSuccess(true);
//         setModalVisible(true);
//         resetForm();
//         setSelectedVehicle('');
//       }
//     } catch (error) {
//       LOG('Error adding dynamic record', error);
//       alert(error?.data?.message || 'Failed to add dynamic record');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Render filter inputs (vehicle selection)
//   // const FilterInputRender = ({setFieldValue, touched, errors}) => (
//   //   <View style={styles.barcontainer}>
//   //     <DropDown
//   //       label={'Select Vehicle'}
//   //       placeholder={'Select'}
//   //       textColor={
//   //         selectedVehicle ? colors?.text?.dimBlack : colors?.text?.grey
//   //       }
//   //       onValueChange={(value, id) => {
//   //         setSelectedVehicle(id);
//   //         // setFieldValue('vehicleId', id);
//   //       }}
//   //       dynamicData={Vehicles}
//   //       errors={touched.vehicleId && errors.vehicleId}
//   //     />
//   //     <TouchableOpacity
//   //       style={styles.addmore}
//   //       onPress={() => navigation.navigate(routes.main.addVehicles)}>
//   //       <MyIcons name={'add'} size={15} />
//   //       <CustomText
//   //         text="Add New Vehicle"
//   //         font={fonts.benzin.regular}
//   //         size={font.medium}
//   //         color={colors.text.red}
//   //         style={{marginTop: 5}}
//   //       />
//   //     </TouchableOpacity>
//   //   </View>
//   // );

//   // Render dynamic fields
//   const DynamicFieldsRender = ({
//     values,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     errors,
//     touched,
//     setFieldValue,
//   }) => {
//     return (
//       <View style={styles.barcontainer1}>
//         <CustomText
//           text={`${name} Details`}
//           size={font.xxlarge}
//           font={fonts.clash.regular}
//           color={colors.text.dimBlack}
//           style={{marginBottom: 10, marginLeft: 10}}
//         />
//         {fields.map(field => (
//           <View key={field._id}>
//             {field.type === 'TEXT' && (
//               <InputField
//                 label={field.label}
//                 placeholder={`Enter ${field.label}`}
//                 keyboardType={
//                   field.label.toLowerCase().includes('price')
//                     ? 'numeric'
//                     : 'default'
//                 }
//                 value={values[field.label]}
//                 onChangeText={handleChange(field.label)}
//                 onBlur={handleBlur(field.label)}
//                 errors={touched[field.label] && errors[field.label]}
//               />
//             )}
//             {field.type === 'DATE' && (
//               <CustomDatePicker
//                 label={field.label}
//                 date={
//                   values[field.label] ? new Date(values[field.label]) : null
//                 }
//                 onDateChange={date =>
//                   setFieldValue(field.label, date.toISOString())
//                 }
//                 errors={touched[field.label] && errors[field.label]}
//               />
//             )}
//           </View>
//         ))}
//         {hasAttachments && (
//           <View style={{alignItems: 'center', marginBottom: vh * 2}}>
//             <DocumentImagePicker
//               handleImage={images => setFieldValue('gallery', images)}
//               errors={touched.gallery && errors.gallery}
//             />
//           </View>
//         )}
//         {vehicleLoading || isSubmitting || isAdding ? (
//           <ActivityLoader color={colors.theme.secondary} />
//         ) : (
//           <MainButton
//             style={styles.submitButton}
//             title={'Add Record'}
//             disabled={isTaskSuccess}
//             onPress={handleSubmit}
//           />
//         )}
//       </View>
//     );
//   };

//   return (
//     <>
//       <CustomHeader routeName={routes.main.addDynamicCustomRecords} />
//       <ScrollView>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={createValidationSchema(fields, hasAttachments)}
//           onSubmit={handleSubmitForm}>
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             values,
//             errors,
//             touched,
//             setFieldValue,
//           }) => {
//             console.log('errorss', errors);
//             return (
//               <>
//                 {/* {FilterInputRender({setFieldValue, touched, errors})} */}
//                 {/* <View style={styles?.hr} /> */}
//                 <DynamicFieldsRender
//                   values={values}
//                   handleChange={handleChange}
//                   handleBlur={handleBlur}
//                   setFieldValue={setFieldValue}
//                   handleSubmit={handleSubmit}
//                   errors={errors}
//                   touched={touched}
//                 />
//               </>
//             );
//           }}
//         </Formik>
//         <ModalComponent
//           isVisible={isModalVisible}
//           onClose={() => setModalVisible(false)}
//           onPressCross={() => {
//             setModalVisible(false);
//             setTimeout(() => navigation?.goBack(), 1000);
//           }}
//           title="Record Added"
//           message={`Do you want to add another ${name.toLowerCase()} record?`}
//           doublemodal
//           buttonText1="No"
//           buttonText="Yes"
//           onButtonPress={() => {
//             setModalVisible(false);
//             setIsTaskSuccess(false);
//           }}
//         />
//       </ScrollView>
//     </>
//   );
// };

// export default AddDynamicCustomRecords;

import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {executeApiRequest} from '../../../Api/methods/method';
import fonts from '../../../Assets/fonts';
import ActivityLoader from '../../../Components/ActivityLoader';
import {MainButton} from '../../../Components/Buttons/MainButton';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import CustomHeader from '../../../Components/CustomHeader';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import InputField from '../../../Components/InputField';
import ModalComponent from '../../../Components/ModalComponent';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {font} from '../../../theme/styles';
import {vh} from '../../../theme/units';
import {LOG} from '../../../Utils/helperFunction';
import {styles} from './styles';
import * as Yup from 'yup';
import {useAddMutation} from '../../../Api/customRecordsApiSlice';

// Dynamic validation schema based on fields
const createValidationSchema = (fields, hasAttachments) => {
  const shape = {};
  fields.forEach(field => {
    if (field.type === 'TEXT') {
      shape[field.label] = Yup.string().required(`${field.label} is required`);
    } else if (field.type === 'DATE') {
      shape[field.label] = Yup.string().required(`${field.label} is required`);
    }
  });
  if (hasAttachments) {
    shape.gallery = Yup.array()
      .min(1, 'At least one image is required')
      .required('Image is required');
  }
  return Yup.object().shape(shape);
};

const AddDynamicCustomRecords = ({route}) => {
  const {dynamicFields} = route?.params || {};
  const {
    fields = [],
    hasAttachments = false,
    name = 'Custom Record',
    id: categoryId = '',
  } = dynamicFields || {};

  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [add, {isLoading: isAdding}] = useAddMutation();

  // Create initial values for Formik
  const initialValues = {
    categoryId: categoryId,
    gallery: hasAttachments ? [] : undefined,
    ...fields.reduce((acc, field) => {
      acc[field.label] = '';
      return acc;
    }, {}),
  };

  // Handle form submission
  const handleSubmitForm = async (values, {resetForm}) => {
    setIsSubmitting(true);
    try {
      // Map form values to the required data array format
      const data = fields.map(field => ({
        fieldId: field._id,
        value: values[field.label],
      }));

      let payload = {
        categoryId: values.categoryId,
        data: JSON.stringify(data),
      };

      if (hasAttachments) {
        payload.gallery = values.gallery;
      }

      LOG('payloadpayloadpayloadpayload', payload);

      const response = await executeApiRequest({
        apiCallFunction: add,
        body: payload,
        formData: true,
        toast: true,
        timeout: 30000,
      });

      LOG('Dynamic Record Add Success:', response);
      if (response?.status) {
        setIsTaskSuccess(true);
        setModalVisible(true);
        resetForm();
      }
    } catch (error) {
      LOG('Error adding dynamic record', error);
      alert(error?.data?.message || 'Failed to add dynamic record');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render dynamic fields
  const DynamicFieldsRender = ({
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  }) => {
    return (
      <View style={styles.barcontainer1}>
        <CustomText
          text={`${name} Details`}
          size={font.xxlarge}
          font={fonts.clash.regular}
          color={colors.text.dimBlack}
          style={{marginBottom: 10, marginLeft: 10}}
        />
        {fields.map(field => (
          <View key={field._id}>
            {field.type === 'TEXT' && (
              <InputField
                label={field.label}
                placeholder={`Enter ${field.label}`}
                keyboardType={
                  field.label.toLowerCase().includes('price')
                    ? 'numeric'
                    : 'default'
                }
                value={values[field.label]}
                onChangeText={handleChange(field.label)}
                onBlur={handleBlur(field.label)}
                errors={touched[field.label] && errors[field.label]}
              />
            )}
            {field.type === 'DATE' && (
              <CustomDatePicker
                label={field.label}
                date={
                  values[field.label] ? new Date(values[field.label]) : null
                }
                onDateChange={date =>
                  setFieldValue(field.label, date.toISOString())
                }
                errors={touched[field.label] && errors[field.label]}
              />
            )}
          </View>
        ))}
        {hasAttachments && (
          <View style={{alignItems: 'center', marginBottom: vh * 2}}>
            <DocumentImagePicker
              handleImage={images => setFieldValue('gallery', images)}
              errors={touched.gallery && errors.gallery}
            />
          </View>
        )}
        {isSubmitting || isAdding ? (
          <ActivityLoader color={colors.theme.secondary} />
        ) : (
          <MainButton
            style={styles.submitButton}
            title={'Add Record'}
            disabled={isTaskSuccess}
            onPress={handleSubmit}
          />
        )}
      </View>
    );
  };

  return (
    <>
      <CustomHeader routeName={routes.main.addDynamicCustomRecords} />
      <ScrollView>
        <Formik
          initialValues={initialValues}
          validationSchema={createValidationSchema(fields, hasAttachments)}
          onSubmit={handleSubmitForm}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => {
            console.log('errorss', errors);
            return (
              <>
                <DynamicFieldsRender
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  touched={touched}
                />
              </>
            );
          }}
        </Formik>
        <ModalComponent
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onPressCross={() => {
            setModalVisible(false);
            setTimeout(() => navigation?.goBack(), 1000);
          }}
          title="Record Added"
          message={`Do you want to add another ${name.toLowerCase()} record?`}
          doublemodal
          buttonText1="No"
          buttonText="Yes"
          onButtonPress={() => {
            setModalVisible(false);
            setIsTaskSuccess(false);
          }}
        />
      </ScrollView>
    </>
  );
};

export default AddDynamicCustomRecords;
