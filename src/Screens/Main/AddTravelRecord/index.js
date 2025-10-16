import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import fonts from '../../../Assets/fonts';
import CustomHeader from '../../../Components/CustomHeader';
import DropDown from '../../../Components/DropDown';
import InputField from '../../../Components/InputField';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import { colors } from '../../../theme/colors';
import { font, spacing } from '../../../theme/styles';
import { Vehicle, VehicleMech, VehicleStore } from '../../../Utils/dummyData';
import { styles } from './styles';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import { vh, vw } from '../../../theme/units';
import {
  MainButton,
  MainButtonWithGradient,
} from '../../../Components/Buttons/MainButton';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '../../../Components/BottomSheet';
import { BlurView } from '@react-native-community/blur';
import ActivityLoader from '../../../Components/ActivityLoader';
import ModalComponent from '../../../Components/ModalComponent';
import { Formik } from 'formik';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import { LOG } from '../../../Utils/helperFunction';
import { executeApiRequest } from '../../../Api/methods/method';
import { useAddMutation } from '../../../Api/travelApiSlice';
import accidentValidation from '../AddAccidentRecord/accidentValidation';
import travelValidation from './travelValidation';
import ButtonWithIcon from '../../../Components/Buttons/ButtonWIthIcon';

const AddTravelRecord = ({ route }) => {
  const editParams = route?.params;
  console.log('Edit: ', editParams);
  const navigation = useNavigation();
  const formikRef = useRef(null);
  const imagePickerRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false);
  const [add, { isLoading }] = useAddMutation();
  const handleReset = () => {
    if (imagePickerRef.current) {
      imagePickerRef.current.reset();
    }
  };
  const handleSubmitForm = async values => {
    LOG('valuesGallery', values?.gallery);
    let payload = {
      ...values,
      flightInfo: JSON.stringify(values.flightInfo),
    };

    LOG('payloadfromtravel', payload)

    const response = await executeApiRequest({
      apiCallFunction: add,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
    });
    LOG('Travel Record Add Success:', response);
    setModalVisible(true);
  };
  return (
    <>
      <CustomHeader
        routeName={
          editParams
            ? routes?.main?.edittravelrecord
            : routes.main.addtravelrecord
        }
      />
      <ScrollView>
        <Formik
          innerRef={formikRef}
          initialValues={{
            flightInfo: [
              { from: '', to: '', departureDate: '', arrivalDate: '' }
            ],
            flightExpense: '',
            hotelExpense: '',
            carRentalExpense: '',
            otherExpense: '',
            mealExpense: '',
            gallery: [],
            documentDescription: '',
          }}
          validationSchema={travelValidation}
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
                  {values.flightInfo.map((segment, idx) => (
                    <View key={idx} style={{ marginBottom: 10 }}>
                      <InputField
                        label={`Travelling From ${idx + 1}`}
                        placeholder="Add Origin"
                        required
                        onChangeText={text => {
                          const updated = [...values.flightInfo];
                          updated[idx].from = text;
                          setFieldValue('flightInfo', updated);
                        }}
                        onBlur={handleBlur(`flightInfo[${idx}].from`)}
                        value={segment.from}
                        errors={touched.flightInfo?.[idx]?.from && errors.flightInfo?.[idx]?.from}
                      />
                      <View style={{ height: 10 }} />

                      <InputField
                        label={`Travelling To ${idx + 1}`}
                        placeholder="Add Destination"
                        required
                        onChangeText={text => {
                          const updated = [...values.flightInfo];
                          updated[idx].to = text;
                          setFieldValue('flightInfo', updated);
                        }}
                        onBlur={handleBlur(`flightInfo[${idx}].to`)}
                        value={segment.to}
                        errors={touched.flightInfo?.[idx]?.to && errors.flightInfo?.[idx]?.to}
                      />
                      <View style={{ height: 8 }} />
                      <CustomDatePicker
                      required
                        label="Departure Date"
                        date={segment.departureDate ? new Date(segment.departureDate) : null}
                        onDateChange={date => {
                          const updated = [...values.flightInfo];
                          updated[idx].departureDate = date.toISOString();
                          setFieldValue('flightInfo', updated);

                        }}
                        errors={touched.flightInfo?.[idx]?.departureDate && errors.flightInfo?.[idx]?.departureDate}
                        
                      />
                      <View style={{ height: 24 }} />
                      <CustomDatePicker
                      required

                        label="Arrival Date"
                        date={segment.arrivalDate ? new Date(segment.arrivalDate) : null}
                        onDateChange={date => {
                          const updated = [...values.flightInfo];
                          updated[idx].arrivalDate = date.toISOString();
                          setFieldValue('flightInfo', updated);
                        }}
                        errors={touched.flightInfo?.[idx]?.arrivalDate && errors.flightInfo?.[idx]?.arrivalDate}
                      />
                    </View>
                  ))}
                  <TouchableOpacity
                    onPress={() => setFieldValue('flightInfo', [...values.flightInfo, { from: '', to: '', departureDate: '', arrivalDate: '' }])}
                    style={{ marginVertical: 10, alignSelf: 'flex-start' }}
                  >
                    <CustomText text="+ Add More" color={colors.theme.primary} />
                  </TouchableOpacity>
                </View>
                <View style={styles?.hr} />
                <View style={styles.barcontainer1}>
                  <CustomText
                    text="Travel Details"
                    size={font.xxlarge}
                    font={fonts.clash.regular}
                    color={colors.text.dimBlack}
                    style={{ marginBottom: 10, marginLeft: 10 }}
                  />
                  <InputField
                    label="Flight Expense ($)"
                    placeholder="Tap to Enter"
                    keyboardType={'numeric'}
                    onChangeText={handleChange('flightExpense')}
                    onBlur={handleBlur('flightExpense')}
                    value={values.flightExpense}
                    errors={touched.flightExpense && errors.flightExpense}
                  />
                  <InputField
                    label="Hotel Expense ($)"
                    placeholder="Tap to Enter"
                    keyboardType={'numeric'}
                    onChangeText={handleChange('hotelExpense')}
                    onBlur={handleBlur('hotelExpense')}
                    value={values.hotelExpense}
                    errors={touched.hotelExpense && errors.hotelExpense}
                  />

                  <InputField
                    label="Car Rental Expense ($)"
                    placeholder="Tap to Enter"
                    keyboardType={'numeric'}
                    onChangeText={handleChange('carRentalExpense')}
                    onBlur={handleBlur('carRentalExpense')}
                    value={values.carRentalExpense}
                    errors={touched.carRentalExpense && errors.carRentalExpense}
                  />

                  <InputField
                    label="Meal Expense ($)"
                    placeholder="Tap to Enter"
                    keyboardType={'numeric'}
                    onChangeText={handleChange('mealExpense')}
                    onBlur={handleBlur('mealExpense')}
                    value={values.mealExpense}
                    errors={touched.mealExpense && errors.mealExpense}
                  />
                  <InputField
                    label="Other Expenses ($)"
                    placeholder="Tap to Enter"
                    keyboardType={'numeric'}
                    onChangeText={handleChange('otherExpense')}
                    onBlur={handleBlur('otherExpense')}
                    value={values.otherExpense}
                    errors={touched.otherExpense && errors.otherExpense}
                  />
                  <InputField
                    label="Description / Additional Information"
                    placeholder="Add Document Description"
                    onChangeText={handleChange('documentDescription')}
                    onBlur={handleBlur('documentDescription')}
                    value={values.documentDescription}
                    errors={touched.documentDescription && errors.documentDescription}
                  />
                </View>
                <View style={{ alignItems: 'center', marginBottom: vh * 2, marginHorizontal: 10, }}>
                  <DocumentImagePicker
                    ref={imagePickerRef}
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
                    // disabled={isTaskSuccess}
                    onPress={handleSubmit}
                  />
                )}
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
                      if (formikRef.current) {
                        handleReset()
                        formikRef.current?.resetForm()
                      }
                      setModalVisible(false);
                      setTimeout(() => {
                        navigation?.goBack();
                      }, 1000);
                    }}
                    title="Record Added"
                    message="Do you want to add another travel record?"
                    doublemodal
                    buttonText1="No"
                    buttonText="Yes"
                    onButtonPress={() => {
                      if (formikRef.current) {
                        handleReset()
                        formikRef.current?.resetForm()
                      }
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

export default AddTravelRecord;
