import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import fonts from '../../../Assets/fonts';
import CustomHeader from '../../../Components/CustomHeader';
import DropDown from '../../../Components/DropDown';
import InputField from '../../../Components/InputField';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import { colors } from '../../../theme/colors';
import { font } from '../../../theme/styles';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { categoryApi, useAddMutation } from '../../../Api/categoryApiSlice';
import { executeApiRequest } from '../../../Api/methods/method';
import ActivityLoader from '../../../Components/ActivityLoader';
import { MainButton } from '../../../Components/Buttons/MainButton';
import ModalComponent from '../../../Components/ModalComponent';
import { vw } from '../../../theme/units';
import { hasAttachments } from '../../../Utils/dummyData';
import { LOG } from '../../../Utils/helperFunction';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  hasAttachments: Yup.string().required('Attachment preference is required'),
});

const AddCustomRecord = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null); // State for single image

  const [add, { isLoading: addStoreLoading }] = useAddMutation();

  const [dateFields, setDateFields] = useState([{ id: 1, value: '' }]);
  const [textFields, setTextFields] = useState([{ id: 1, value: '' }]);
  const initialValues = {
    title: '',
    hasAttachments: '',
    fields: [''],
    description: '',
  };

  const addTextField = () => {
    const newId =
      textFields.length > 0 ? Math.max(...textFields.map(f => f.id)) + 1 : 1;
    setTextFields([...textFields, { id: newId, value: '' }]);
  };

  const removeTextField = id => {
    if (textFields.length > 1) {
      setTextFields(textFields.filter(field => field.id !== id));
    }
  };

  const addDateField = () => {
    const newId =
      dateFields.length > 0 ? Math.max(...dateFields.map(f => f.id)) + 1 : 1;
    setDateFields([...dateFields, { id: newId, value: '' }]);
  };

  const removeDateField = id => {
    if (dateFields.length > 1) {
      setDateFields(dateFields.filter(field => field.id !== id));
    }
  };
  const handleSubmit = async (values, { resetForm }) => {
    const fields = [];
    let attachment = false;

    // Add text fields
    textFields.forEach(field => {
      if (field.value.trim()) {
        fields.push({
          label: field.value,
          type: 'TEXT',
        });
      }
    });

    // Add date fields
    dateFields.forEach(field => {
      if (field.value.trim()) {
        fields.push({
          label: field.value,
          type: 'DATE',
        });
      }
    });
    if (values?.hasAttachments === 'YES') {
      attachment = true;
    } else {
      attachment = false;
    }

    LOG('ATTACHMENT BOOLEAN: ', attachment);

    const payload = {
      title: values.title,
      hasAttachments: attachment,
      fields: JSON.stringify(fields),
      description: values?.description,
      gallery: image
    };

    LOG('Final Payload ===>', payload);
    try {
      const response = await executeApiRequest({
        apiCallFunction: add,
        formData: true,
        body: payload,
        toast: true,
        timeout: 30000,
      });
      LOG('API Response from Add Store', response);
      if (response?.success || response?.data) {
        setModalVisible(true);
        resetForm();
        // Reset dynamic fields
        setTextFields([{ id: 1, value: '' }]);
        setDateFields([{ id: 1, value: '' }]);
      }
    } catch (error) {
      LOG('Error in Add Store API', error);
      setModalVisible(false);
    }
  };

  return (
    <>
      <CustomHeader routeName={routes.main.addcustomrecord} />
      <ScrollView>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              <View style={styles.barcontainer}>
                <InputField
                  label="Custom Category Title"
                  placeholder="Tap to Enter"
                  keyboardType={'default'}
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  errors={touched.title && errors.title}
                />
              </View>
              <View style={styles?.hr} />
              <View style={styles.barcontainer1}>
                <CustomText
                  text="Please Add Text Field"
                  size={font.xxlarge}
                  font={fonts.clash.regular}
                  color={colors.text.dimBlack}
                  style={{ marginBottom: 10, marginLeft: 10 }}
                />

                <View>
                  {textFields.map((field, index) => (
                    <View
                      key={field.id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <InputField
                        label={index === 0 ? 'Text Field Title' : ''}
                        placeholder="Enter field title"
                        keyboardType={'default'}
                        value={field.value}
                        onChangeText={text => {
                          const updatedFields = [...textFields];
                          updatedFields[index].value = text;
                          setTextFields(updatedFields);
                        }}
                        style={{ flex: 1 }}
                      />
                      {textFields.length > 1 && (
                        <TouchableOpacity
                          onPress={() => removeTextField(field.id)}>
                          <MyIcons
                            name="bin"
                            size={40}
                            color={colors.text.red}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}

                  <TouchableOpacity
                    style={[styles.addmore, { marginTop: 5 }]}
                    onPress={addTextField}>
                    <MyIcons name={'add'} size={15} />
                    <CustomText
                      text="Add More Fields"
                      font={fonts.benzin.regular}
                      size={font.medium}
                      color={colors.text.red}
                      style={{ marginTop: 5 }}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  {dateFields.map((field, index) => (
                    <View
                      key={field.id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <InputField
                        label={index === 0 ? 'Date Field Title' : ''}
                        placeholder="Enter date field title"
                        keyboardType={'default'}
                        value={field.value}
                        onChangeText={text => {
                          const updatedFields = [...dateFields];
                          updatedFields[index].value = text;
                          setDateFields(updatedFields);
                        }}
                        style={{ flex: 1 }}
                      />
                      {dateFields.length > 1 && (
                        <TouchableOpacity
                          onPress={() => removeDateField(field.id)}>
                          <MyIcons
                            name="bin"
                            size={40}
                            color={colors.text.red}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}

                  <TouchableOpacity
                    style={[styles.addmore, { marginTop: 5 }]}
                    onPress={addDateField}>
                    <MyIcons name={'add'} size={15} />
                    <CustomText
                      text="Add More Date Fields"
                      font={fonts.benzin.regular}
                      size={font.medium}
                      color={colors.text.red}
                      style={{ marginTop: 5 }}
                    />
                  </TouchableOpacity>
                </View>
{/* 
                <InputField
                  label="Description"
                  placeholder="Enter Description"
                  multiline={true}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  style={{ width: vw * 85 }}
                  errors={touched.description && errors.description}
                /> */}

                <DropDown
                  label={'Attachments'}
                  required={true}
                  placeholder={'Select'}
                  textColor={
                    values.hasAttachments
                      ? colors?.text?.dimBlack
                      : colors?.text?.grey
                  }
                  onValueChange={value =>
                    setFieldValue('hasAttachments', value)
                  }
                  dynamicData={hasAttachments}
                  errors={touched.hasAttachments && errors.hasAttachments}
                />
                <View style={{ alignItems: 'center' }}>

                  <DocumentImagePicker
                    maxLimit={1}
                    handleImage={images => {
                      console.log('imagesimages', images);
                      const selectedImage = images[0] || null;
                      setImage(selectedImage);
                    }}
                    label={"Upload Category Image"}
                  />
                </View>
                {addStoreLoading ? (
                  <ActivityLoader color={colors.theme.secondary} />
                ) : (
                  <MainButton
                    style={styles.submitButton}
                    title={'Add Category'}
                    onPress={handleSubmit}
                  />
                )}
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onPressCross={() => {
          setModalVisible(false);
          dispatch(categoryApi.util.resetApiState());
          setTimeout(() => {
            navigation?.goBack();
          }, 1000);
        }}
        title="System Message"
        message="Custom Record added successfully"
        buttonText="Go Back"
        onButtonPress={() => {
          setModalVisible(false);
          dispatch(categoryApi.util.resetApiState());
          setTimeout(() => {
            navigation?.goBack();
          }, 1000);
        }}
      />
    </>
  );
};

export default AddCustomRecord;


