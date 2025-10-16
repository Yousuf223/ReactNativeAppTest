import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View ,Image} from 'react-native';
import { useAddMutation } from '../../../Api/accidentApiSlice';
import { executeApiRequestForQueryParams } from '../../../Api/methods/method';
import { useFetchVehicleByUserQuery } from '../../../Api/vehiclesApiSlice';
import fonts from '../../../Assets/fonts';
import ActivityLoader from '../../../Components/ActivityLoader';
import { MainButton } from '../../../Components/Buttons/MainButton';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import CustomHeader from '../../../Components/CustomHeader';
import DropDown from '../../../Components/DropDown';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import InputField from '../../../Components/InputField';
import ModalComponent from '../../../Components/ModalComponent';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import { colors } from '../../../theme/colors';
import { font, spacing } from '../../../theme/styles';
import { vh } from '../../../theme/units';
import { LOG } from '../../../Utils/helperFunction';
import accidentValidation from './accidentValidation';
import { styles } from './styles';
import CheckBox from '../../../Components/CheckBox';

const AddAccidentRecord = ({ route }) => {
  const {
    data,
    isLoading: vehicleLoading,
    isFetching,
    error,
    refetch,
  } = useFetchVehicleByUserQuery();
  LOG('data-vehicle', data);
  const { editParams, attachments, draftId } = route?.params || {};
  // console.log('editParams: ', editParams);
  const navigation = useNavigation();
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedMechanic, setSelectedMechanic] = useState('');
  const [gallery, setGallery] = useState(attachments || []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false);
  const [add, { isLoading }] = useAddMutation();


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
    LOG('valuesGallery', values);
    let payload = {
      ...values,
      involvedCarDetails: JSON.stringify(values?.involvedCarDetails)
    };


    console.log('payloaddd', payload)
    const response = await executeApiRequestForQueryParams({
      apiCallFunction: add,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
      queryParams: draftId ? { draftId } : '',
    });
    LOG('acident Record Add Success:', response);
    setModalVisible(true);
  };


  return (
    <>
      <CustomHeader
        routeName={
          editParams
            ? routes?.main?.editaccidentrecord
            : routes.main.addaccidentrecord
        }
      />
      <ScrollView>
        <Formik
          initialValues={{
            vehicleName: '',
            vehicleId: '',
            accidentDate: '',
            location: '',
            involvedDriverName: '',
            involvedDriverPhone: '',
            description: '',
            gallery: [],
            involvedCarDetails: {
              hasInsurance: false,
              licensePlate: '',
              make: '',
              model: '',
              color: '',
            },
          }}
          validationSchema={accidentValidation}
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
            LOG('Errors-formik:', errors);
            return (
              <>
                <View style={styles.barcontainer}>
                  <DropDown
                    label={'Select Vehicle'}
                    placeholder={'Select'}
                    required={true}
                    textColor={
                      selectedVehicle
                        ? colors?.text?.dimBlack
                        : colors?.text?.grey
                    }
                    // onValueChange={setSelectedVehicle}
                    onValueChange={value => {
                      setFieldValue('vehicleName', value?.value);
                      setFieldValue('vehicleId', value?.id);
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
                      style={{ marginTop: 5 }}
                    />
                  </TouchableOpacity>

                  <CustomDatePicker
                    date={
                      values.accidentDate ? new Date(values.accidentDate) : null
                    }
                    onDateChange={date =>
                      setFieldValue('accidentDate', date.toISOString())
                    }
                    errors={touched.accidentDate && errors.accidentDate}
                  />
                </View>
                <View style={styles?.hr} />
                <View style={styles.barcontainer1}>
                  <CustomText
                    text="Accident Details"
                    size={font.xxlarge}
                    font={fonts.clash.regular}
                    color={colors.text.dimBlack}
                    style={{ marginBottom: 10, marginLeft: 10 }}
                  />
                  <InputField
                    label="Location of Accident"
                    placeholder="Tap to Enter"
                    onChangeText={handleChange('location')}
                    onBlur={handleBlur('location')}
                    value={values.location}
                    errors={touched.location && errors.location}
                  />
                  <InputField
                    label="Other Driver Name"
                    placeholder="Tap to Enter"
                    onChangeText={handleChange('involvedDriverName')}
                    onBlur={handleBlur('involvedDriverName')}
                    value={values.involvedDriverName}
                    errors={
                      touched.involvedDriverName && errors.involvedDriverName
                    }
                  />

                  <InputField
                    label="Other Driver Contact Number"
                    placeholder="Tap to Enter"
                    keyboardType={'numeric'}
                    onChangeText={handleChange('involvedDriverPhone')}
                    onBlur={handleBlur('involvedDriverPhone')}
                    value={values.involvedDriverPhone}
                    errors={
                      touched.involvedDriverPhone && errors.involvedDriverPhone
                    }
                  />

                  {/* Involved Car Details Section */}
                  <View style={{ marginBottom: vh * 2 }}>
                    <CustomText
                      text="Involved Car Details"
                      size={font.large}
                      font={fonts.clash.regular}
                      color={colors.text.dimBlack}
                      style={{ marginBottom: vh * 4, marginLeft: 10 }}
                    />

                    <CheckBox
                      text="Has Insurance"
                      checked={values.involvedCarDetails.hasInsurance}
                      setChecked={() =>
                        setFieldValue(
                          'involvedCarDetails.hasInsurance',
                          !values.involvedCarDetails.hasInsurance,
                        )
                      }
                      style={{ marginBottom: vh * 2, marginLeft: 8 }}
                    />

                    <InputField
                      label="License Plate"
                      placeholder="Enter license plate number"
                      onChangeText={(text) => setFieldValue('involvedCarDetails.licensePlate', text)}
                      value={values.involvedCarDetails.licensePlate}
                    />

                    <InputField
                      label="Make"
                      placeholder="Enter car make"
                      onChangeText={(text) => setFieldValue('involvedCarDetails.make', text)}
                      value={values.involvedCarDetails.make}
                    />

                    <InputField
                      label="Model"
                      placeholder="Enter car model"
                      onChangeText={(text) => setFieldValue('involvedCarDetails.model', text)}
                      value={values.involvedCarDetails.model}
                    />

                    <InputField
                      label="Color"
                      placeholder="Enter car color"
                      onChangeText={(text) => setFieldValue('involvedCarDetails.color', text)}
                      value={values.involvedCarDetails.color}
                    />
                  </View>

                  <InputField
                    label="Other Details"
                    placeholder="Tap to enter"
                    multiline={true}
                    required
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    errors={touched.description && errors.description}
                    style={{ marginBottom: vh * 3 }}
                  />

                  <View style={{ alignItems: 'center', marginBottom: vh * 2 }}>
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
                                  source={{ uri: item?.image?.uri }}
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
                      // disabled={isTaskSuccess}
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
                    message="Do you want to add another accident record?"
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

export default AddAccidentRecord;
