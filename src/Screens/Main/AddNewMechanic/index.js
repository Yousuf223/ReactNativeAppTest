// import {useNavigation} from '@react-navigation/native';
// import React, {useRef, useState} from 'react';
// import {ScrollView, View} from 'react-native';
// import ActivityLoader from '../../../Components/ActivityLoader';
// import {MainButton} from '../../../Components/Buttons/MainButton';
// import CustomHeader from '../../../Components/CustomHeader';
// import DropDown from '../../../Components/DropDown';
// import InputField from '../../../Components/InputField';
// import ModalComponent from '../../../Components/ModalComponent';
// import routes from '../../../Navigation/routes';
// import {VehicleStore} from '../../../Utils/dummyData';
// import {colors} from '../../../theme/colors';
// import {styles} from './styles';
// const AddNewMechanic = () => {
//   const navigation = useNavigation();
//   const sheetRef = useRef(null);
//   const handleVisibility = () => setVisible(!visible);
//   const onBackdropPress = () => handleVisibility();
//   const [visible, setVisible] = useState(false);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isTaskSuccess, setIsTaskSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedStore, setSelectedStore] = useState('');
//   return (
//     <>
//       <CustomHeader routeName={routes.main.addnewmechanic} />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{flexGrow: 1}}>
//         <View style={styles.container}>
//           <InputField label="Mechanic Name" placeholder="Enter Mechanic Name" />
//           <DropDown
//             label={'Select Store'}
//             placeholder={'Select'}
//             textColor={
//               selectedStore ? colors?.text?.dimBlack : colors?.text?.grey
//             }
//             onValueChange={setSelectedStore}
//             dynamicData={VehicleStore}
//           />
//           {isLoading ? (
//             <ActivityLoader color={colors.theme.secondary} />
//           ) : (
//             <MainButton
//               style={styles.submitButton}
//               title={'Add Mechanics'}
//               disabled={isTaskSuccess}
//               onPress={() => {
//                 setIsTaskSuccess(true);
//                 setIsLoading(true);
//                 setTimeout(() => {
//                   setIsLoading(false);
//                   setModalVisible(true);
//                 }, 2000);
//               }}
//             />
//           )}
//           {/* <MainButton
//             style={styles.submitButton}
//             title={'Add Mechanics'}
//             onPress={() => {
//               setIsTaskSuccess(true);
//               setIsLoading(true);
//               setTimeout(() => {
//                 setIsLoading(false);
//                 setModalVisible(true);
//               }, 2000);
//             }}
//           /> */}
//         </View>
//       </ScrollView>
//       <ModalComponent
//         isVisible={isModalVisible}
//         onClose={() => setModalVisible(false)}
//         onPressCross={() => {
//           setModalVisible(false);
//           setTimeout(() => {
//             navigation?.goBack();
//           }, 1000);
//         }}
//         title="Mechanic Added"
//         message="New mechanic has been added successfully!"
//         buttonText="Okay"
//         onButtonPress={() => {
//           setModalVisible(false);
//           setTimeout(() => {
//             navigation?.goBack();
//           }, 1000);
//         }}
//       />
//       {/* <BottomSheet
//         togglePopup={sheetRef}
//         successPopup={true}
//         onBackButtonPress={onBackdropPress}
//         modalHeight={vh * 40}
//         onBackdropPress={onBackdropPress}
//         onPress={() => {
//           if (sheetRef.current) {
//             sheetRef.current.close();
//             setVisible(false);
//             setTimeout(() => {
//               navigation.navigate(routes?.tab.addrecords);
//             }, 550);
//           }
//         }}
//         buttontitle={'Go Back'}
//         label={`Mechanic Added!`}
//         description={`Mechanic has been added successfully!`}
//       />
//       {visible && (
//         <BlurView
//           style={styles.absolute}
//           blurType="dark"
//           blurAmount={2}
//           reducedTransparencyFallbackColor="white"
//         />
//       )} */}
//     </>
//   );
// };

// export default AddNewMechanic;

import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import ActivityLoader from '../../../Components/ActivityLoader';
import {MainButton} from '../../../Components/Buttons/MainButton';
import CustomHeader from '../../../Components/CustomHeader';
import DropDown from '../../../Components/DropDown';
import InputField from '../../../Components/InputField';
import ModalComponent from '../../../Components/ModalComponent';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {styles} from './styles';
import {
  useFetchStoreByUserIdQuery,
  useAddMechanicsSellersMutation,
} from '../../../Api/storeApiSlice';
import {LOG} from '../../../Utils/helperFunction';
import {executeApiRequest} from '../../../Api/methods/method';

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  mechanicName: Yup.string().required('Mechanic Name is required'),
});

const AddNewMechanic = () => {
  const navigation = useNavigation();
  const [selectedStore, setSelectedStore] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get user ID from Redux store
  const userDetails = useSelector(state => state?.auth?.user || {});
  const userId = userDetails?._id;

  // Fetch stores from API
  const {
    data: storeData,
    isLoading: storeLoading,
    isFetching: storeFetching,
    error: storeError,
    refetch: storeRefetch,
  } = useFetchStoreByUserIdQuery();

  // Add mechanic mutation
  const [addMechanicsSellers, {isLoading: addMechanicLoading}] =
    useAddMechanicsSellersMutation();

  LOG('data-store', storeData);

  // Process store data for dropdown
  let Stores = [];
  if (Array.isArray(storeData) && storeData.length > 0) {
    Stores = storeData.map((store, index) => ({
      key: index,
      value: store?.storeName ?? '',
      id: store?._id ?? '',
    }));
  }

  const handleAddMechanic = async (values, {resetForm}) => {
    if (!selectedStore) {
      alert('Please select a store');
      return;
    }

    setIsTaskSuccess(true);
    setIsLoading(true);

    try {
      // Prepare the payload with mechanic name and store ID
      const payload = {
        sellers: [],
        mechanics: [values.mechanicName.trim()], // Mechanics array instead of sellers
      };

      LOG('Adding mechanic with payload:', payload);
      LOG('Store ID:', selectedStore);

      // Call the API to add the mechanic
      const response = await executeApiRequest({
        apiCallFunction: addMechanicsSellers,
        params: {id: selectedStore},
        body: payload,
      });

      LOG('API Response from Add Mechanic:', response);

      if (response?.success || response?.data) {
        setIsLoading(false);
        setModalVisible(true); // Show the success modal
        resetForm(); // Reset the form after success
      } else {
        setIsLoading(false);
        alert('Failed to add mechanic');
      }
    } catch (error) {
      LOG('Error in Add Mechanic API:', error);
      setIsLoading(false);
      alert(error?.data?.message || 'Failed to add mechanic');
    }
  };

  return (
    <>
      <CustomHeader routeName={routes.main.addnewmechanic} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Formik
          initialValues={{
            mechanicName: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddMechanic}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <InputField
                label="Enter Mechanic Name"
                placeholder="Enter Mechanic"
                value={values.mechanicName}
                onChangeText={handleChange('mechanicName')}
                onBlur={handleBlur('mechanicName')}
                errors={touched.mechanicName && errors.mechanicName} // Pass error directly
              />
              <DropDown
                label={'Select Store'}
                placeholder={'Select'}
                textColor={
                  selectedStore ? colors?.text?.dimBlack : colors?.text?.grey
                }
                onValueChange={(value, id) => setSelectedStore(id)}
                dynamicData={Stores}
              />
              {isLoading || storeLoading || addMechanicLoading ? (
                <ActivityLoader color={colors.theme.secondary} />
              ) : (
                <MainButton
                  style={styles.submitButton}
                  title={'Add Mechanic'}
                  disabled={isTaskSuccess}
                  onPress={handleSubmit}
                />
              )}
            </View>
          )}
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
          title="Mechanic Added"
          message="New mechanic has been added successfully!"
          buttonText="Okay"
          onButtonPress={() => {
            setModalVisible(false);
            setTimeout(() => {
              navigation?.goBack();
            }, 1000);
          }}
        />
      </ScrollView>
    </>
  );
};

export default AddNewMechanic;
