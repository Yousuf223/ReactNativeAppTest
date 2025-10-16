import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { executeApiRequest } from '../../../Api/methods/method';
import { useAddMutation } from '../../../Api/petApiSlice';
import ActivityLoader from '../../../Components/ActivityLoader';
import AuthTextButton from '../../../Components/AuthTextButton';
import { MainButton } from '../../../Components/Buttons/MainButton';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import CustomHeader from '../../../Components/CustomHeader';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import InputField from '../../../Components/InputField';
import ModalComponent from '../../../Components/ModalComponent';
import routes from '../../../Navigation/routes';
import { colors } from '../../../theme/colors';
import { vh } from '../../../theme/units';
import { LOG } from '../../../Utils/helperFunction';
import petValidation from './petValidation';
import { styles } from './styles';

const AddPetRecord = ({ route }) => {
  const editParams = route?.params;
  console.log('Edit: ', editParams);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [add, { isLoading }] = useAddMutation();

  const handleSubmitForm = async (values, { resetForm }) => {
    console.log('valuesjksjdkh', values);

    LOG('valuesGallery', values?.gallery);
    let payload = {
      ...values,
    };

    LOG(payload, 'payloaddd');

    const response = await executeApiRequest({
      apiCallFunction: add,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
    });
    LOG('Pet Record Add Success:', response);

    if (response.status) {
      resetForm();
    }
    setModalVisible(true);
  };
  return (
    <>
      <CustomHeader
        routeName={
          editParams ? routes?.main?.editpetrecord : routes.main.addpetrecord
        }
      />
      <ScrollView>
        <Formik
          initialValues={{
            specie: '',
            breed: '',
            dateOfBirth: '',
            purchaseDate: '',
            name: '',
            price: '',
            phone: '',
            gallery: [],
            description: [],
          }}
          validationSchema={petValidation}
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
                    required={true}
                    label="Pet Name"
                    placeholder="Tap to Enter"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    errors={touched.name && errors.name}
                  />
                  <InputField
                    label="Species"
                    placeholder="Tap to Enter"
                    onChangeText={handleChange('specie')}
                    onBlur={handleBlur('specie')}
                    value={values.specie}
                    errors={touched.specie && errors.specie}
                  />
                  <InputField
                    label="Breed"
                    placeholder="Tap to Enter"
                    onChangeText={handleChange('breed')}
                    onBlur={handleBlur('breed')}
                    value={values.breed}
                    errors={touched.breed && errors.breed}
                  />
                  <CustomDatePicker
                    customStyles={{ marginTop: -10 }}
                    label={'Date of Birth'}
                    // labelStyle={{marginTop: vh * 2}}
                    date={
                      values.dateOfBirth ? new Date(values.dateOfBirth) : null
                    }
                    onDateChange={date =>
                      setFieldValue('dateOfBirth', date.toISOString())
                    }
                    errors={touched.dateOfBirth && errors.dateOfBirth}
                  />
                  <InputField
                    label="Veterinarian Name"
                    placeholder="Tap to Enter"
                    onChangeText={handleChange('veterinarianName')}
                    onBlur={handleBlur('veterinarianName')}
                    value={values.veterinarianName}
                    errors={touched.veterinarianName && errors.veterinarianName}
                  />
                  <InputField
                    label="Veterinarian Phone"
                    placeholder="Tap to Enter"
                    onChangeText={handleChange('veterinarianPhone')}
                    onBlur={handleBlur('veterinarianPhone')}
                    value={values.veterinarianPhone}
                    errors={
                      touched.veterinarianPhone && errors.veterinarianPhone
                    }
                  />

                  <CustomDatePicker
                    customStyles={{ marginTop: 0 }}
                    label={'Date of Purchase'}
                    // labelStyle={{marginTop: vh * 2}}
                    date={
                      values.purchaseDate ? new Date(values.purchaseDate) : null
                    }
                    onDateChange={date =>
                      setFieldValue('purchaseDate', date.toISOString())
                    }
                    errors={touched.purchaseDate && errors.purchaseDate}
                  />

                  <InputField
                    label="Cost of Purchase"
                    placeholder="Tap to Enter"
                    keyboardType={'numeric'}
                    onChangeText={handleChange('price')}
                    onBlur={handleBlur('price')}
                    value={values.price}
                    errors={touched.price && errors.price}
                    style={{ marginTop: 12 }}
                  />
                  <InputField
                    label="Description/Comment"
                    placeholder="Tap to Enter"
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    errors={touched.description && errors.description}
                  />
                  <View style={{ alignItems: 'center', marginBottom: vh * 0.1 }}>
                    <DocumentImagePicker
                      handleImage={images => {
                        LOG('images', images);
                        setFieldValue('gallery', images);
                      }}
                      errors={touched.gallery && errors.gallery}
                    />
                  </View>
                </View>
                {/* <View style={styles?.hr} /> */}
                <View style={styles.barcontainer1}>
                  {/* <CustomText
                    text="Pet Details"
                    size={font.xxlarge}
                    font={fonts.clash.regular}
                    color={colors.text.dimBlack}
                    style={{marginBottom: 10, marginLeft: 10}}
                  /> */}

                  {isLoading ? (
                    <ActivityLoader color={colors.theme.secondary} />
                  ) : (
                    <>
                      <MainButton
                        style={styles.submitButton}
                        title={editParams ? 'Update Record' : 'Add Record'}
                        onPress={handleSubmit}
                      />
                      <View style={{ alignItems: 'center' }}>
                        <AuthTextButton
                          style={{ marginTop: -vh * 1 }}
                          buttonText={
                            editParams ? 'Update Vet Record' : 'Add Vet Record'
                          }
                          textColor={'#333333'}
                          underLine={true}
                          onPress={() => {
                            navigation?.navigate(
                              routes?.main?.addvetrecordforpet,
                            );
                          }}
                        />
                      </View>
                    </>
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
                    message="Do you want to add another pet animal record?"
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

export default AddPetRecord;
