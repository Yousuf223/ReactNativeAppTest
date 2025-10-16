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
import { LOG } from '../../../Utils/helperFunction';
import { Formik } from 'formik';
import equipmentValidation from '../AddHeavyEquipmentRecord/equipmentValidation';
const AddToolRecord = ({ route }) => {
  const editParams = route?.params;
  console.log('EditParams: ', editParams);
  const navigation = useNavigation();
  const [add, { isLoading }] = useAddMutation();

  const [isModalVisible, setModalVisible] = useState(false);
  const handleSubmitForm = async values => {
    LOG('valuesGallery', values?.gallery);
    let payload = {
      ...values,
      storeId: ""
    };

    const response = await executeApiRequest({
      apiCallFunction: add,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
    });
    LOG('Tool Record Add Success:', response);
    setModalVisible(true);
  };
  return (
    <>
      <CustomHeader
        routeName={
          editParams ? routes?.main?.edittoolrecord : routes.main.addtoolrecord
        }
      />
      <ScrollView>
        <Formik
          initialValues={{
            equipmentName: '',
            equipmentType: 'TOOL',
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
                    label="Tool"
                    required={true}
                    placeholder="Tap to Enter"
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
                    text="Tool Details"
                    size={font.xxlarge}
                    font={fonts.clash.regular}
                    color={colors.text.dimBlack}
                    style={{ marginBottom: 10, marginLeft: 10 }}
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

                  <View style={{ alignItems: 'center', marginBottom: vh * 2 }}>
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
                    message="Do you want to add another tool record?"
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

export default AddToolRecord;
