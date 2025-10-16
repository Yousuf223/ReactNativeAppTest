import { BlurView } from '@react-native-community/blur';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import fonts from '../../../Assets/fonts';
import BottomSheet from '../../../Components/BottomSheet';
import { MainButton } from '../../../Components/Buttons/MainButton';
import CustomHeader from '../../../Components/CustomHeader';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import InputField from '../../../Components/InputField';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import { colors } from '../../../theme/colors';
import { font } from '../../../theme/styles';
import { vh } from '../../../theme/units';
import { styles } from './styles';
import ModalComponent from '../../../Components/ModalComponent';
import ActivityLoader from '../../../Components/ActivityLoader';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import { useAddMutation } from '../../../Api/equipmentApiSlice';
import { executeApiRequest } from '../../../Api/methods/method';
import { Formik } from 'formik';
import { LOG } from '../../../Utils/helperFunction';
import equipmentValidation from '../AddHeavyEquipmentRecord/equipmentValidation';
import {
  useFetchStoreByIdQuery,
  useFetchStoreByUserIdQuery,
} from '../../../Api/storeApiSlice';
import DropDown from '../../../Components/DropDown';
const AddHomeRecord = ({ route }) => {
  const editParams = route?.params;
  console.log('edit: ', editParams);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');

  const [add, { isLoading }] = useAddMutation();

  const handleSubmitForm = async values => {
    LOG('valuesGallery', values?.gallery);
    let payload = {
      ...values,
      storeId: selectedStore ? selectedStore : "",
    };
    console.log("🚀 ~ AddHomeRecord ~ payload:", payload)

    

    const response = await executeApiRequest({
      apiCallFunction: add,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
    });
    LOG('Heavy Record Add Success:', response);
    setModalVisible(true);
  };

  const {
    data: storeData,
    isLoading: storeLoading,
    isFetching: storeFetching,
    error: storeError,
    refetch: storeRefetch,
  } = useFetchStoreByUserIdQuery();

  const {
    data: selectedStoreData,
    isLoading: selectedStoreLoading,
    isFetching: selectedStoreFetching,
    error: selectedStoreError,
    refetch: selectedStoreRefetch,
  } = useFetchStoreByIdQuery(selectedStore, {
    skip: !selectedStore,
  });

  let Stores = [];
  if (Array.isArray(storeData) && storeData.length > 0) {
    Stores = storeData.map((store, index) => ({
      key: index,
      value: store?.storeName ?? '',
      id: store?._id ?? '',
    }));
  }
  return (
    <>
      <CustomHeader
        routeName={
          editParams ? routes?.main?.edithomerecord : routes.main.addhomerecord
        }
      />
      <ScrollView>
        <Formik
          initialValues={{
            equipmentName: '',
            equipmentType: 'HOME',
            purchaseDate: '',
            price: '',
            gallery: [],
            description: '',
          }}
          // validationSchema={equipmentValidation}
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
            LOG('Errors-formik:', errors);
            return (
              <>
                <View style={styles.barcontainer}>
                  <DropDown
                    label={'Store of Purchase'}
                    placeholder={'Select'}
                    textColor={
                      selectedStore
                        ? colors?.text?.dimBlack
                        : colors?.text?.grey
                    }
                    onValueChange={(value, id) => {
                      setSelectedStore(id);
                      // setSelectedSeller('');
                      setTimeout(() => selectedStoreRefetch(), 100);
                    }}
                    dynamicData={Stores}
                  />
                  <TouchableOpacity
                    style={styles.addmore}
                    onPress={() => navigation.navigate(routes.main.addastore)}>
                    <MyIcons name={'add'} size={15} />
                    <CustomText
                      text="Add New Store"
                      font={fonts.benzin.regular}
                      size={font.medium}
                      color={colors.text.red}
                      style={{ marginTop: 5 }}
                    />
                  </TouchableOpacity>
                  <InputField
                    label="Home Appliance"
                    placeholder="Tap to Enter"
                    required
                    onChangeText={handleChange('equipmentName')}
                    onBlur={handleBlur('equipmentName')}
                    value={values.equipmentName}
                    errors={touched.equipmentName && errors.equipmentName}
                  />

                  <CustomDatePicker
                    label={'Purchase Date'}
                    labelStyle={{ marginTop: vh * 2 }}
                    date={
                      values.purchaseDate ? new Date(values.purchaseDate) : null
                    }
                    onDateChange={date =>
                      setFieldValue('purchaseDate', date.toISOString())
                    }
                    errors={touched.purchaseDate && errors.purchaseDate}
                  />
                </View>
                <View style={styles?.hr} />
                <View style={styles.barcontainer1}>
                  <CustomText
                    text="Home Details"
                    size={font.xxlarge}
                    font={fonts.clash.regular}
                    color={colors.text.dimBlack}
                    style={{ marginBottom: 10, marginLeft: 10 }}
                  />
                  <InputField
                    label="Price ($)"
                    placeholder="Tap to Enter"
                    keyboardType={'numeric'}
                    required
                    onChangeText={handleChange('price')}
                    onBlur={handleBlur('price')}
                    value={values.price}
                    errors={touched.price && errors.price}
                  />

                  <InputField
                    label="Description"
                    placeholder="Tap to Enter"
                    keyboardType={'default'}
                    required
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    errors={touched.description && errors.description}
                  />

                  <View style={{ alignItems: 'center', marginBottom: vh * 2 }}>
                    <DocumentImagePicker
                      required
                      handleImage={images => {
                        LOG('images', images);
                        setFieldValue('gallery', images);
                      }}
                      errors={touched.gallery && errors.gallery}
                    />
                  </View>
                  {isLoading ? (
                    <ActivityLoader color={colors.theme.secondary} />
                  ) : (
                    <MainButton
                      style={styles.submitButton}
                      title={editParams ? 'Update Record' : 'Add Record'}
                      onPress={handleSubmit}
                    />
                  )}
                </View>
                {editParams ? (
                  <ModalComponent
                    isVisible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                    onPressCross={() => {
                      setModalVisible(false);
                      setTimeout(() => {
                        navigation?.goBack();
                      }, 1000);
                    }}
                    title={`Record Updated`}
                    message={`Information has been updated successfully!`}
                    buttonText="Got it"
                    onButtonPress={() => {
                      setModalVisible(false);
                      setTimeout(() => {
                        navigation?.goBack();
                      }, 1000);
                    }}
                  />
                ) : (
                  <ModalComponent
                    isVisible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                    onPressCross={() => {
                      setModalVisible(false);
                      setTimeout(() => {
                        navigation?.goBack();
                      }, 1000);
                    }}
                    title="Record Added"
                    message="Do you want to add another home record?"
                    doublemodal
                    buttonText1="No"
                    buttonText="Yes"
                    onButtonPress={() => {
                      setModalVisible(false);
                    }}
                  />
                )}
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </>
  );
};

export default AddHomeRecord;
