import React, {useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import fonts from '../../../Assets/fonts';
import CustomHeader from '../../../Components/CustomHeader';
import DropDown from '../../../Components/DropDown';
import InputField from '../../../Components/InputField';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {font} from '../../../theme/styles';
import {PetRecord} from '../../../Utils/dummyData';
import {styles} from './styles';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import {vh, vw} from '../../../theme/units';
import {MainButton} from '../../../Components/Buttons/MainButton';
import {useNavigation} from '@react-navigation/native';
import ActivityLoader from '../../../Components/ActivityLoader';
import ModalComponent from '../../../Components/ModalComponent';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import {Formik} from 'formik';
import {LOG} from '../../../Utils/helperFunction';
import {useAddMutation} from '../../../Api/vetApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import {useFetchPetByUserQuery} from '../../../Api/petApiSlice';

const AddVetRecordForPet = ({route}) => {
  const {
    data,
    isLoading: vehicleLoading,
    isFetching,
    error,
    refetch,
  } = useFetchPetByUserQuery();
  LOG('data-pets', data);
  const editParams = route?.params;
  console.log('editParasm: ', editParams);
  const navigation = useNavigation();
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [add, {isLoading}] = useAddMutation();

  let Pets = [];

  if (Array.isArray(data?.docs) && data.docs.length > 0) {
    const uniquePets = data.docs.map(item => ({
      name: item?.name ?? '',
      id: item?._id ?? '',
    }));

    Pets = uniquePets.map((item, index) => ({
      key: index,
      value: item.name,
      id: item.id,
    }));
  }

  LOG('Pets--Pets', Pets);

  const handleSubmitForm = async values => {
    LOG('valuesGallery', values?.gallery);
    let payload = {
      ...values,
    };

    const response = await executeApiRequest({
      apiCallFunction: add,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
    });
    LOG('Vet Record Add Success:', response);
    setModalVisible(true);
  };
  return (
    <>
      <CustomHeader
        routeName={
          editParams
            ? routes?.main?.editvetrecordforpet
            : routes.main.addvetrecordforpet
        }
      />
      <ScrollView>
        <Formik
          initialValues={{
            petId: '',
            petName: '',
            checkupDate: '',
            payment: '',
            otherExpense: '',
            details: '',
            gallery: [],
          }}
          // validationSchema={petValidation}
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
                    label={'Pet'}
                    placeholder={'Select Pet'}
                    required={true}
                    textColor={
                      selectedVehicle
                        ? colors?.text?.dimBlack
                        : colors?.text?.grey
                    }
                    onValueChange={(value, id) => {
                      console.log('Selected Make:', value, 'ID:', id);
                      setFieldValue('petName', value);
                      setFieldValue('petId', id);
                    }}
                    dynamicData={Pets}
                  />
                  <TouchableOpacity
                    style={styles.addmore}
                    onPress={() =>
                      navigation.navigate(routes.main.addpetrecord)
                    }>
                    <MyIcons name={'add'} size={15} />
                    <CustomText
                      text="Add New Pet"
                      font={fonts.benzin.regular}
                      size={font.medium}
                      color={colors.text.red}
                      style={{marginTop: 5}}
                    />
                  </TouchableOpacity>

                  <CustomDatePicker
                    label={'Date of Birth'}
                    labelStyle={{marginTop: vh * 2}}
                    date={
                      values.checkupDate ? new Date(values.checkupDate) : null
                    }
                    onDateChange={date =>
                      setFieldValue('checkupDate', date.toISOString())
                    }
                    errors={touched.checkupDate && errors.checkupDate}
                  />
                </View>
                <View style={styles?.hr} />
                <View style={styles.barcontainer1}>
                  <CustomText
                    text="Vet Details"
                    size={font.xxlarge}
                    font={fonts.clash.regular}
                    color={colors.text.dimBlack}
                    style={{marginBottom: 10, marginLeft: 10}}
                  />
                  <InputField
                    label="Vet Payment ($)"
                    placeholder="Tap to Enter"
                    keyboardType={'numeric'}
                    required
                    onChangeText={handleChange('payment')}
                    onBlur={handleBlur('payment')}
                    value={values.payment}
                    errors={touched.payment && errors.payment}
                  />
                  <InputField
                    label="Other Purchases"
                    placeholder="Tap to Enter"
                    keyboardType={'numeric'}
                    required
                    onChangeText={handleChange('otherExpense')}
                    onBlur={handleBlur('otherExpense')}
                    value={values.otherExpense}
                    errors={touched.otherExpense && errors.otherExpense}
                  />

                  <InputField
                    label="Additional Details"
                    placeholder="Tap to enter"
                    multiline={true}
                    style={{marginBottom: vh * 5}}
                    required
                    onChangeText={handleChange('details')}
                    onBlur={handleBlur('details')}
                    value={values.details}
                    errors={touched.details && errors.details}
                  />
                  <View style={{alignItems: 'center', marginBottom: vh * 2}}>
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
                    message="Do you want to add another vet record for pet?"
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

export default AddVetRecordForPet;
