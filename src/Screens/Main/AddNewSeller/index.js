import React, {useRef, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import routes from '../../../Navigation/routes';
import InputField from '../../../Components/InputField';
import {MainButton} from '../../../Components/Buttons/MainButton';
import {styles} from './styles';
import BottomSheet from '../../../Components/BottomSheet';
import {vh} from '../../../theme/units';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import {useResetToScreen} from '../../../Functions/resetToScreen';
import ActivityLoader from '../../../Components/ActivityLoader';
import {colors} from '../../../theme/colors';
import ModalComponent from '../../../Components/ModalComponent';
import DropDown from '../../../Components/DropDown';
import {
  useFetchStoreByUserIdQuery,
  useAddMechanicsSellersMutation,
} from '../../../Api/storeApiSlice';
import {useSelector} from 'react-redux';
import {LOG} from '../../../Utils/helperFunction';
import {executeApiRequest} from '../../../Api/methods/method';

const AddNewSeller = () => {
  const navigation = useNavigation();
  const sheetRef = useRef(null);
  const handleVisibility = () => setVisible(!visible);
  const onBackdropPress = () => handleVisibility();
  const [visible, setVisible] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false); // State for disabling the button
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');
  const [sellerName, setSellerName] = useState('');
  const {resetToScreen} = useResetToScreen();

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

  // Add seller mutation
  const [addMechanicsSellers, {isLoading: addSellerLoading}] =
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

  const handleAddSeller = async () => {
    if (!sellerName.trim()) {
      // Show error for empty seller name
      return;
    }

    if (!selectedStore) {
      // Show error for no store selected
      return;
    }

    setIsTaskSuccess(true);
    setIsLoading(true);

    try {
      // Prepare the payload with seller name and store ID
      const payload = {
        sellers: [sellerName.trim()],
        mechanics: [],
      };

      LOG('Adding seller with payload:', payload);
      LOG('Store ID:', selectedStore);

      // Call the API to add the seller
      const response = await executeApiRequest({
        apiCallFunction: addMechanicsSellers,
        params: {id: selectedStore},
        body: payload,
      });

      LOG('API Response from Add Seller:', response);

      if (response?.success || response?.data) {
        setIsLoading(false);
        setModalVisible(true); // Show the success modal
      } else {
        setIsLoading(false);
        // Handle error case
        setModalVisible(true);
      }
    } catch (error) {
      LOG('Error in Add Seller API:', error);
      setIsLoading(false);
      // Handle error case
      setModalVisible(true);
    }
  };

  return (
    <>
      <CustomHeader routeName={routes.main.addnewseller} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <InputField
            label="Enter Seller Name"
            placeholder="Enter Seller"
            value={sellerName}
            onChangeText={setSellerName}
          />
          <DropDown
            label={'Select Store'}
            placeholder={'Select'}
            textColor={
              selectedStore ? colors?.text?.dimBlack : colors?.text?.grey
            }
            onValueChange={(value, id) => {
              setSelectedStore(id);
            }}
            dynamicData={Stores}
          />
          {isLoading || storeLoading || addSellerLoading ? (
            <ActivityLoader color={colors.theme.secondary} />
          ) : (
            <MainButton
              style={styles.submitButton}
              title={'Add Seller'}
              disabled={isTaskSuccess}
              onPress={handleAddSeller}
            />
          )}
        </View>

        <ModalComponent
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onPressCross={() => {
            setModalVisible(false);
            setTimeout(() => {
              navigation?.goBack();
            }, 1000);
          }}
          title="Seller Added"
          message="New seller has been added successfully!"
          buttonText="Okay"
          onButtonPress={() => {
            setModalVisible(false);
            setTimeout(() => {
              navigation?.goBack();
            }, 1000);
          }}
        />
      </ScrollView>
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
              navigation.navigate(routes?.tab.addrecords);
            }, 550);
          }
        }}
        buttontitle={'Go Back'}
        label={`Seller Added!`}
        description={`You have successfully added a Seller!`}
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

export default AddNewSeller;
