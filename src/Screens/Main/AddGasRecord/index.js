import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import fonts from '../../../Assets/fonts';
import ActivityLoader from '../../../Components/ActivityLoader';
import {MainButton} from '../../../Components/Buttons/MainButton';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import CustomHeader from '../../../Components/CustomHeader';
import DropDown from '../../../Components/DropDown';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import InputField from '../../../Components/InputField';
import ModalComponent from '../../../Components/ModalComponent';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {font, spacing} from '../../../theme/styles';
import {Vehicle} from '../../../Utils/dummyData';
import {styles} from './styles';
import {useFetchVehicleByUserQuery} from '../../../Api/vehiclesApiSlice';
import {LOG} from '../../../Utils/helperFunction';
import {vh, vw} from '../../../theme/units';
import {Formik} from 'formik';
import gasValidation from './gasValidation';
import {useAddMutation} from '../../../Api/gasApiSlice';
import {
  executeApiRequest,
  executeApiRequestForQueryParams,
} from '../../../Api/methods/method';
import {useDispatch} from 'react-redux';
import {draftsApi} from '../../../Api/draftsApiSlice';
import { Image } from 'react-native';
const AddGasRecord = ({route}) => {
  const {
    data,
    isLoading: vehicleLoading,
    isFetching,
    error,
    refetch,
  } = useFetchVehicleByUserQuery();
  LOG('data-vehicle', data);
  const {editParams, attachments, draftId} = route?.params || {};
  console.log('Edit: ', editParams);
  LOG('draftId', draftId);
  LOG('attachments', attachments);

  const navigation = useNavigation();
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedMechanic, setSelectedMechanic] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gallery, setGallery] = useState(attachments || []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false);
  const [add, {isLoading}] = useAddMutation();

  const dispatch = useDispatch();

  // const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDob(formattedDate);
    }
  };

  let Vehicles = [];

  if (Array.isArray(data) && data.length > 0) {
    const uniqueMakes = [
      ...new Set(
        data.map(item => ({
          make: item?.vehicleDetails?.make,
          id: item?._id,
        })),
      ),
    ];

    Vehicles = uniqueMakes.map((item, index) => ({
      key: index,
      value: item?.make ?? '',
      id: item?.id ?? '',
    }));
  }
  LOG('VehiclesVehicles', Vehicles);

  const handleSubmitForm = async values => {
    LOG('valuesGallery', values?.gallery);
    let payload = {
      ...values,
    };

    // LOG('payload: ', payload)

    const response = await executeApiRequestForQueryParams({
      apiCallFunction: add,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
      queryParams: draftId ? {draftId} : '',
    });

    if (response) {
      dispatch(draftsApi.util.resetApiState());
    }
    LOG('Gas Record Add Success:', response);
    setModalVisible(true);
  };
  return (
    <>
      <CustomHeader
        routeName={
          editParams ? routes?.main?.editgasrecord : routes.main.addgasrecord
        }
      />
      <ScrollView>
        <Formik
          initialValues={{
            vehicleName: '',
            vehicleId: '',
            gasDate: '',
            gallons: '',
            price: '',
            carMileage: '',
            gallery: [],
          }}
          validationSchema={gasValidation}
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
                    label={'Select Vehicle'}
                    required={true}
                    placeholder={'Select'}
                    textColor={
                      selectedVehicle
                        ? colors?.text?.dimBlack
                        : colors?.text?.grey
                    }
                    // onValueChange={setSelectedVehicle}
                    onValueChange={(value, id) => {
                      console.log('Selected Make:', value, 'ID:', id);
                      setFieldValue('vehicleName', value);
                      setFieldValue('vehicleId', id);
                    }}
                    dynamicData={Vehicles}
                    errors={touched.vehicleId && errors.vehicleId}
                  />
                  <TouchableOpacity
                    style={styles.addmore}
                    onPress={() =>
                      navigation.navigate(routes.main.addVehicles)
                    }>
                    <MyIcons name={'add'} size={15} />
                    <CustomText
                      text="Add New Vehicle"
                      font={fonts.benzin.regular}
                      size={font.medium}
                      color={colors.text.red}
                      style={{marginTop: 5}}
                    />
                  </TouchableOpacity>

                  <CustomDatePicker
                    date={values.gasDate ? new Date(values.gasDate) : null}
                    onDateChange={date =>
                      setFieldValue('gasDate', date.toISOString())
                    }
                    errors={touched.gasDate && errors.gasDate}
                  />
                </View>
                <View style={styles?.hr} />
                <View style={styles.barcontainer1}>
                  <CustomText
                    text="Gas Details"
                    size={font.xxlarge}
                    font={fonts.clash.regular}
                    color={colors.text.dimBlack}
                    style={{marginBottom: 10, marginLeft: 10}}
                  />
                  <InputField
                    label="Gallons of Gas"
                    placeholder="Tap to Enter"
                    keyboardType={'numeric'}
                    onChangeText={handleChange('gallons')}
                    onBlur={handleBlur('gallons')}
                    value={values.gallons}
                    errors={touched.gallons && errors.gallons}
                  />
                  <InputField
                    label="Price ($)"
                    placeholder="Tap to Enter"
                    keyboardType={'numeric'}
                    onChangeText={handleChange('price')}
                    onBlur={handleBlur('price')}
                    value={values.price}
                    errors={touched.price && errors.price}
                  />

                  <InputField
                    label="Current Car Mileage"
                    placeholder="Tap to Enter"
                    keyboardType={'numeric'}
                    onChangeText={handleChange('carMileage')}
                    onBlur={handleBlur('carMileage')}
                    value={values.carMileage}
                    errors={touched.carMileage && errors.carMileage}
                  />
                  <View style={{alignItems: 'center', marginBottom: vh * 2}}>
                    {gallery.length > 0 && (
                      <CustomText
                        text="Draft Images:"
                        style={{
                          alignSelf: 'flex-start',
                          marginBottom: spacing.small,
                        }}
                      />
                    )}
                    {gallery.length > 0 && (
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: spacing.small,
                          alignItems: 'flex-start',
                          width: '100%',
                          marginBottom: vh * 4,
                        }}>
                        {gallery?.length > 0 &&
                          gallery.map(item => {
                            return (
                              <View>
                                <Image
                                  source={{uri: item?.image?.uri}}
                                  style={{
                                    height: vh * 9,
                                    width: vh * 9,
                                    borderRadius: 10,
                                  }}
                                />
                              </View>
                            );
                          })}
                      </View>
                    )}
                    <DocumentImagePicker
                      handleImage={images => setFieldValue('gallery', images)}
                      errors={touched.gallery && errors.gallery}
                    />
                  </View>
                  {/* <View style={{alignItems: 'center', marginBottom: vh * 2}}>
                    <DocumentImagePicker
                      handleImage={images => {
                        LOG('images', images);
                        setFieldValue('gallery', images);
                      }}
                      errors={touched.gallery && errors.gallery}
                    />
                  </View> */}
                  {isLoading ? (
                    <ActivityLoader color={colors.theme.secondary} />
                  ) : (
                    <MainButton
                      style={styles.submitButton}
                      title={editParams ? 'Update Record' : 'Add Record'}
                      disabled={isTaskSuccess}
                      onPress={handleSubmit}
                    />
                  )}
                </View>
              </>
            );
          }}
        </Formik>

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
            message="Do you want to add another gas record?"
            doublemodal
            buttonText1="No"
            buttonText="Yes"
            onButtonPress={() => {
              setModalVisible(false);
            }}
          />
        )}
      </ScrollView>
    </>
  );
};

export default AddGasRecord;
