import {BlurView} from '@react-native-community/blur';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import fonts from '../../../Assets/fonts';
import BottomSheet from '../../../Components/BottomSheet';
import {MainButton} from '../../../Components/Buttons/MainButton';
import CustomHeader from '../../../Components/CustomHeader';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import InputField from '../../../Components/InputField';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {font} from '../../../theme/styles';
import {vh} from '../../../theme/units';
import {styles} from './styles';
import ModalComponent from '../../../Components/ModalComponent';
import ActivityLoader from '../../../Components/ActivityLoader';
import {Formik} from 'formik';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import travelValidation from '../AddTravelRecord/travelValidation';
import {LOG} from '../../../Utils/helperFunction';
import {executeApiRequest} from '../../../Api/methods/method';
import {useAddMutation} from '../../../Api/equipmentApiSlice';
import equipmentValidation from './equipmentValidation';

const AddHeavyEquipmentRecord = ({route}) => {
  const editParams = route?.params;
  console.log('Edit: ', editParams);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false);
  const [add, {isLoading}] = useAddMutation();

  const handleSubmitForm = async values => {
    LOG('valuesGallery', values?.gallery);
    let payload = {
      ...values,
      storeId:""

    };

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
  return (
    <>
      <CustomHeader
        routeName={
          editParams
            ? routes?.main?.editheavyequipmentrecord
            : routes.main.addheavyequipmentrecord
        }
      />
      <ScrollView>
        <Formik
          initialValues={{
            equipmentName: '',
            equipmentType: 'HEAVY',
            purchaseDate: '',
            price: '',
            gallery: [],
          }}
          validationSchema={equipmentValidation}
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
                  <InputField
                    label="Heavy Equipment"
                    placeholder="Tap to Enter"
                    required
                    onChangeText={handleChange('equipmentName')}
                    onBlur={handleBlur('equipmentName')}
                    value={values.equipmentName}
                    errors={touched.equipmentName && errors.equipmentName}
                  />

                  <CustomDatePicker
                    label={'Purchase Date'}
                    labelStyle={{marginTop: vh * 2}}
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
                    text="Equipment Details"
                    size={font.xxlarge}
                    font={fonts.clash.regular}
                    color={colors.text.dimBlack}
                    style={{marginBottom: 10, marginLeft: 10}}
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

                  <View style={{alignItems: 'center', marginBottom: vh * 2}}>
                    <DocumentImagePicker
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
                    message="Do you want to add another heavy equipment record?"
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

export default AddHeavyEquipmentRecord;
