import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { executeApiRequest } from '../../../Api/methods/method';
import { useAddMutation } from '../../../Api/vehiclesApiSlice';
import fonts from '../../../Assets/fonts';
import ActivityLoader from '../../../Components/ActivityLoader';
import { MainButtonWithGradient } from '../../../Components/Buttons/MainButton';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import CustomHeader from '../../../Components/CustomHeader';
import DropDown from '../../../Components/DropDown';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import InputField from '../../../Components/InputField';
import ModalComponent from '../../../Components/ModalComponent';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import { colors } from '../../../theme/colors';
import { font, spacing } from '../../../theme/styles';
import { vh, vw } from '../../../theme/units';
import { year } from '../../../Utils/dropdownItems';
import { LOG } from '../../../Utils/helperFunction';
import { styles } from './styles';
import vehicleValidation from './vehicleValidation';
import { useFetchVehicleTypesQuery } from '../../../Api/vehicleTypesApiSlice';
import routes from '../../../Navigation/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddVehicleDetails = ({ route, navigation }) => {
  const vehicleDetails = route?.params;
  const [add, { isLoading }] = useAddMutation();
  const item = vehicleDetails?.vehicleDetails;
  const [isModalVisible, setModalVisible] = useState(false);
  const [AddPayment, setAddPayment] = useState(false);

  useEffect(() => {
    const getPaymentStatus = async () => {
      const value = await AsyncStorage.getItem('AddPayment');
      setAddPayment(value === 'true');
    };
    getPaymentStatus();
  }, []);

  const { data: vehicleTypes } = useFetchVehicleTypesQuery();

  const handleSubmitForm = async values => {
    let payload = {
      ...values,
      hasTurboCharger: values?.hasTurboCharger ? true : false,
      vehicleType: item?._id,
    };



    if (!AddPayment) {
      navigation.navigate(routes.main.subscriptionplan, {
        payload: payload,
        from: 'AddVehicleDetails',
      });
      return;
    }

    const response = await executeApiRequest({
      apiCallFunction: add,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
    });
    if (response) {
      setModalVisible(true);
      setTimeout(() => navigation?.pop(2), 1000);
    }
  };


  return (
    <>
      <CustomHeader title={item?.name} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <Formik
          initialValues={{
            vehicleType: item?.name?.toUpperCase() || '',
            make: '',
            model: '',
            year: '',
            VIN: '',
            plateNumber: '',
            tires: '',
            tirePressure: '',
            type: '',
            engine: '',
            changeOilEvery: '',
            mileageDate: '',
            mileage: '',
            nextOilChange: '',
            hours: '',
            nextHours: '',
            description: '',
            gallery: [],
            cylinders: '',
            driveTrain: '',
            turboCharger: false,
            transmissionType: "",
            engineOilType: ""
          }}
          validationSchema={vehicleValidation}
          onSubmit={handleSubmitForm}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={styles.container}>
              <View
                style={[
                  styles.detailContainer,
                ]}>
                <View style={{ alignItems: 'center', marginTop: vh * 4 }}>


                  <InputField
                    required
                    label="Make"
                    placeholder="Enter Make"
                    onChangeText={handleChange('make')}
                    onBlur={handleBlur('make')}
                    value={values.make}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                    errors={touched.make && errors.make}
                  />
                  {item?.name === 'CAR / Motorcycle' && (
                    <>
                      <InputField
                        label="Model"
                        placeholder="Enter Model"
                        onChangeText={handleChange('model')}
                        onBlur={handleBlur('model')}
                        value={values.model}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Year"
                        placeholder="Year"
                        onChangeText={handleChange('year')}
                        onBlur={handleBlur('year')}
                        value={values.year}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                        keyboardType="decimal-pad"
                      />
                      <InputField
                        label="Engine"
                        placeholder="Enter Engine Info"
                        onChangeText={handleChange('engine')}
                        onBlur={handleBlur('engine')}
                        value={values.engine}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Cylinders"
                        placeholder="Enter Cylinder Type"
                        onChangeText={handleChange('cylinders')}
                        onBlur={handleBlur('cylinders')}
                        value={values.cylinders}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Drive Train"
                        placeholder="FWD / RWD / 4WD / AWD"
                        onChangeText={handleChange('driveTrain')}
                        onBlur={handleBlur('driveTrain')}
                        value={values.driveTrain}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="VIN"
                        placeholder="Enter VIN"
                        onChangeText={handleChange('VIN')}
                        onBlur={handleBlur('VIN')}
                        value={values.VIN}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Plate Number"
                        placeholder="Enter Plate Number"
                        onChangeText={handleChange('plateNumber')}
                        onBlur={handleBlur('plateNumber')}
                        value={values.plateNumber}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Tires"
                        placeholder="Enter Tire Brand/Size"
                        onChangeText={handleChange('tires')}
                        onBlur={handleBlur('tires')}
                        value={values.tires}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Tire Pressure"
                        placeholder="Enter Tire Pressure"
                        onChangeText={handleChange('tirePressure')}
                        onBlur={handleBlur('tirePressure')}
                        value={values.tirePressure}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                    </>
                  )}

                  {item?.name === 'Semi Truck / Truck' && (
                    <>
                      <DropDown
                        label="Type"
                        placeholder="Select Truck Type"
                        onValueChange={value =>
                          setFieldValue('type', value?.value)
                        }
                        dynamicData={[
                          { key: '0', value: 'Semi' },
                          { key: '1', value: 'Box Truck' },
                          { key: '2', value: 'Flatbed Truck' },
                          { key: '3', value: 'Dump Truck' },
                        ]}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                        textColor={values.year ? colors?.text?.dimBlack : colors?.text?.grey}
                        errors={touched.year && errors.year}
                      />
                      <InputField
                        label="Model"
                        placeholder="Enter Model"
                        onChangeText={handleChange('model')}
                        onBlur={handleBlur('model')}
                        value={values.model}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Year"
                        placeholder="Year"
                        onChangeText={handleChange('year')}
                        onBlur={handleBlur('year')}
                        value={values.year}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                        keyboardType="decimal-pad"
                      />
                      <InputField
                        label="Engine"
                        placeholder="Enter Engine Info"
                        onChangeText={handleChange('engine')}
                        onBlur={handleBlur('engine')}
                        value={values.engine}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="VIN"
                        placeholder="Enter VIN"
                        onChangeText={handleChange('VIN')}
                        onBlur={handleBlur('VIN')}
                        value={values.VIN}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Oil Must be changed Every"
                        placeholder="Miles"
                        onChangeText={handleChange('changeOilEvery')}
                        onBlur={handleBlur('changeOilEvery')}
                        value={values.changeOilEvery}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <CustomDatePicker
                        label="Last Oil Change Date"
                        dateStyle={{ width: vw * 80, marginBottom: vh * 5 }}
                        date={
                          values.mileageDate ? new Date(values.mileageDate) : null
                        }
                        onDateChange={date =>
                          setFieldValue('mileageDate', date.toISOString())
                        }
                      />
                      <InputField
                        label="Miles at last oil change"
                        placeholder="Enter Miles"
                        onChangeText={handleChange('mileage')}
                        onBlur={handleBlur('mileage')}
                        value={values.mileage}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Next Due Oil Change"
                        placeholder="Enter Miles"
                        onChangeText={handleChange('nextOilChange')}
                        onBlur={handleBlur('nextOilChange')}
                        value={values.nextOilChange}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                    </>
                  )}

                  {item?.name === 'Heavy Equipment' && (
                    <>
                      <InputField
                        label="Type"
                        placeholder="e.g. Bulldozer, Loader"
                        onChangeText={handleChange('type')}
                        onBlur={handleBlur('type')}
                        value={values.type}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Model"
                        placeholder="Enter Model"
                        onChangeText={handleChange('model')}
                        onBlur={handleBlur('model')}
                        value={values.model}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Year"
                        placeholder="Year"
                        onChangeText={handleChange('year')}
                        onBlur={handleBlur('year')}
                        value={values.year}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                        keyboardType="decimal-pad"
                      />
                      <InputField
                        label="Engine"
                        placeholder="Enter Engine"
                        onChangeText={handleChange('engine')}
                        onBlur={handleBlur('engine')}
                        value={values.engine}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="VIN"
                        placeholder="Enter VIN"
                        onChangeText={handleChange('VIN')}
                        onBlur={handleBlur('VIN')}
                        value={values.VIN}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Change Oil Every (Hours)"
                        placeholder="Enter interval"
                        onChangeText={handleChange('changeOilEvery')}
                        onBlur={handleBlur('changeOilEvery')}
                        value={values.changeOilEvery}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <CustomDatePicker
                        label="Oil Change Date"
                        dateStyle={{ width: vw * 80, marginBottom: vh * 5, backgroundColor: '#fff' }}
                        date={
                          values.mileageDate ? new Date(values.mileageDate) : null
                        }
                        onDateChange={date =>
                          setFieldValue('mileageDate', date.toISOString())
                        }
                      />
                      <InputField
                        label="Hours"
                        placeholder="Enter Hours"
                        onChangeText={handleChange('hours')}
                        onBlur={handleBlur('hours')}
                        value={values.hours}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Next Oil Change (Hours)"
                        placeholder="Enter Next Oil Change Hours"
                        onChangeText={handleChange('nextHours')}
                        onBlur={handleBlur('nextHours')}
                        value={values.nextHours}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                    </>
                  )}

                  {item?.name === 'Farm and Ranch' && (
                    <>
                      <InputField
                        label="Type"
                        placeholder="e.g. Farm Tractor, Harvester"
                        onChangeText={handleChange('type')}
                        onBlur={handleBlur('type')}
                        value={values.type}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Model"
                        placeholder="Enter Model"
                        onChangeText={handleChange('model')}
                        onBlur={handleBlur('model')}
                        value={values.model}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Year"
                        placeholder="Year"
                        onChangeText={handleChange('year')}
                        onBlur={handleBlur('year')}
                        value={values.year}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                        keyboardType="decimal-pad"
                      />
                      <InputField
                        label="Engine"
                        placeholder="Enter Engine"
                        onChangeText={handleChange('engine')}
                        onBlur={handleBlur('engine')}
                        value={values.engine}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="VIN"
                        placeholder="Enter VIN"
                        onChangeText={handleChange('VIN')}
                        onBlur={handleBlur('VIN')}
                        value={values.VIN}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Change Oil Every (Hours)"
                        placeholder="Enter interval"
                        onChangeText={handleChange('changeOilEvery')}
                        onBlur={handleBlur('changeOilEvery')}
                        value={values.changeOilEvery}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <CustomDatePicker
                        label="Oil Change Date"
                        dateStyle={{ width: vw * 80, marginBottom: vh * 5, backgroundColor: '#fff' }}
                        date={
                          values.mileageDate ? new Date(values.mileageDate) : null
                        }
                        onDateChange={date =>
                          setFieldValue('mileageDate', date.toISOString())
                        }
                      />
                      <InputField
                        label="Hours"
                        placeholder="Enter Hours"
                        onChangeText={handleChange('hours')}
                        onBlur={handleBlur('hours')}
                        value={values.hours}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Next Oil Change (Hours)"
                        placeholder="Enter Next Oil Change Hours"
                        onChangeText={handleChange('nextHours')}
                        onBlur={handleBlur('nextHours')}
                        value={values.nextHours}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                    </>
                  )}

                  {item?.name === 'ATV /UTV / Boat' && (
                    <>
                      <InputField
                        label="Type"
                        placeholder="e.g. Boat, ATV, UTV"
                        onChangeText={handleChange('type')}
                        onBlur={handleBlur('type')}
                        value={values.type}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Model"
                        placeholder="Enter Model"
                        onChangeText={handleChange('model')}
                        onBlur={handleBlur('model')}
                        value={values.model}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Year"
                        placeholder="Year"
                        onChangeText={handleChange('year')}
                        onBlur={handleBlur('year')}
                        value={values.year}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                        keyboardType="decimal-pad"
                      />
                      <InputField
                        label="Engine"
                        placeholder="Enter Engine Info"
                        onChangeText={handleChange('engine')}
                        onBlur={handleBlur('engine')}
                        value={values.engine}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="VIN"
                        placeholder="Enter VIN"
                        onChangeText={handleChange('VIN')}
                        onBlur={handleBlur('VIN')}
                        value={values.VIN}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Change Oil Every (Hours)"
                        placeholder="Enter interval"
                        onChangeText={handleChange('changeOilEvery')}
                        onBlur={handleBlur('changeOilEvery')}
                        value={values.changeOilEvery}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <CustomDatePicker
                        label="Oil Change Date"
                        dateStyle={{ width: vw * 80, marginBottom: vh * 5, backgroundColor: '#fff' }}
                        date={
                          values.mileageDate ? new Date(values.mileageDate) : null
                        }
                        onDateChange={date =>
                          setFieldValue('mileageDate', date.toISOString())
                        }
                      />
                      <InputField
                        label="Hours"
                        placeholder="Enter Hours"
                        onChangeText={handleChange('hours')}
                        onBlur={handleBlur('hours')}
                        value={values.hours}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Next Oil Change (Hours)"
                        placeholder="Enter Next Oil Change Hours"
                        onChangeText={handleChange('nextHours')}
                        onBlur={handleBlur('nextHours')}
                        value={values.nextHours}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                    </>
                  )}

                  {item?.name === 'Other' && (
                    <InputField
                      label="Description"
                      placeholder="Enter Description"
                      multiline={true}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                    />
                  )}
                  <InputField
                    label="Turbo/Super charger"
                    placeholder="Type & Description"
                    onChangeText={handleChange('turboCharger')}
                    onBlur={handleBlur('turboCharger')}
                    value={values.turboCharger}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                    placeholderTextColor={colors?.text?.grey}
                  />
                  <InputField
                    label="Transmission"
                    placeholder="Type & Description"
                    onChangeText={handleChange('transmission')}
                    onBlur={handleBlur('transmission')}
                    value={values.transmission}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                    placeholderTextColor={colors?.text?.grey}
                  />
                  <InputField
                    label="Engine oil"
                    placeholder="Type & Description"
                    onChangeText={handleChange('engineOilType')}
                    onBlur={handleBlur('engineOilType')}
                    value={values.engineOilType}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                    placeholderTextColor={colors?.text?.grey}
                  />
                  <InputField
                    label="Comments"
                    placeholder="Enter Comments"
                    multiline={true}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                  />
                  {/* Image picker + submit */}
                  <DocumentImagePicker
                    label={'Add Photo/Attachment'}
                    handleImage={images => {
                      LOG('images', images);
                      setFieldValue('gallery', images);
                    }}
                    errors={touched.gallery && errors.gallery}
                  />

                  {isLoading ? (
                    <ActivityLoader
                      style={{ marginTop: spacing.medium }}
                      color={colors.theme.secondary}
                    />
                  ) : (
                    <View style={{ marginTop: spacing.medium }}>
                      <MainButtonWithGradient
                        title={'Save Vehicle Now'}
                        onPress={handleSubmit}
                        style={{ width: vw * 80, alignSelf: 'center' }}
                      />
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.hr} />

              <ModalComponent
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onPressCross={() => {
                  setModalVisible(false);
                  setTimeout(() => {
                    navigation?.pop(2);
                  }, 1000);
                }}
                title={`${item?.name} Added`}
                message={`You have successfully added your ${item?.name?.toLowerCase()}!`}
                buttonText="Got it"
                onButtonPress={() => {
                  setModalVisible(false);
                  setTimeout(() => {
                    navigation?.pop(2);
                  }, 1000);
                }}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default AddVehicleDetails;
