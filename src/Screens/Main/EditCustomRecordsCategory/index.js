


import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomHeader from '../../../Components/CustomHeader';
import InputField from '../../../Components/InputField';
import DropDown from '../../../Components/DropDown';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import ModalComponent from '../../../Components/ModalComponent';
import ActivityLoader from '../../../Components/ActivityLoader';
import { font, spacing } from '../../../theme/styles';
import { vw } from '../../../theme/units';
import routes from '../../../Navigation/routes';
import { styles } from './styles';
import { LOG } from '../../../Utils/helperFunction';
import { categoryApi, useEditMutation } from '../../../Api/categoryApiSlice';
import { executeApiRequest } from '../../../Api/methods/method';
import { hasAttachments } from '../../../Utils/dummyData';
import { colors } from '../../../theme/colors';
import fonts from '../../../Assets/fonts';
import { MainButton } from '../../../Components/Buttons/MainButton';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import { showToast } from '../../../Utils/toast';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  hasAttachments: Yup.string()
    .oneOf(['YES', 'NO'], 'Select a valid attachment preference')
    .required('Attachment preference is required'),
  description: Yup.string().optional(),
});

const EditCustomRecordsCategory = ({ route }) => {
  const { item } = route?.params || {}; // Safe destructuring
  LOG('EditCustomRecordsCategory ~ item:', item);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState( null); // Initialize with existing image
  const [edit, { isLoading: editStoreLoading }] = useEditMutation();
  const [textFields, setTextFields] = useState([{ id: 1, value: '' }]);
  const [dateFields, setDateFields] = useState([{ id: 1, value: '' }]);

  useEffect(() => {
    if (!item || !Array.isArray(item.fields)) {
      LOG('Warning: Invalid or missing item.fields', item);
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Error',
      //     text2: 'Invalid category data provided.',
      //   });
      return;
    }

    const initialTextFields = item.fields
      .filter(field => field.type === 'TEXT' && field.label)
      .map((field, index) => ({ id: index + 1, value: field.label }));
    const initialDateFields = item.fields
      .filter(field => field.type === 'DATE' && field.label)
      .map((field, index) => ({ id: index + 1, value: field.label }));

    setTextFields(initialTextFields.length > 0 ? initialTextFields : [{ id: 1, value: '' }]);
    setDateFields(initialDateFields.length > 0 ? initialDateFields : [{ id: 1, value: '' }]);
  }, [item]);

  const addTextField = () => {
    const newId = textFields.length > 0 ? Math.max(...textFields.map(f => f.id)) + 1 : 1;
    setTextFields([...textFields, { id: newId, value: '' }]);
  };

  const removeTextField = id => {
    if (textFields.length > 1) {
      setTextFields(textFields.filter(field => field.id !== id));
    }
  };

  const addDateField = () => {
    const newId = dateFields.length > 0 ? Math.max(...dateFields.map(f => f.id)) + 1 : 1;
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

    // Validate fields
    if (fields.length === 0) {
      showToast('At least one text or date field is required.')
      return;
    }

    if (values.hasAttachments === 'YES') {
      attachment = true;
    }

    const payload = {
      title: values.title,
      hasAttachments: attachment,
      fields: JSON.stringify(fields),
      gallery: image, // Include image in payload
    };

    LOG('Edit Payload ===>', payload);
    LOG('Edit item?.id  ===>', item?.id );

    try {
      const response = await executeApiRequest({
        apiCallFunction: edit,
        body: payload,
        toast: true,
        timeout: 30000,
        formData: true,
        params: { id: item?.id }, 
      });
      LOG('API Response from Edit Store', response);
      if (response?.success || response?.data) {
        setModalVisible(true);
        resetForm();
        setTextFields([{ id: 1, value: '' }]);
        setDateFields([{ id: 1, value: '' }]);
        setImage(null); // Reset image after successful update
      }
    } catch (error) {
      LOG('Error in Edit Store API', error);

    }
  };

  return (
    <>
      <CustomHeader routeName={routes.main.editcustomrecordscategory} />
      <ScrollView>
        <Formik
          initialValues={{
            title: item?.name || '',
            hasAttachments: item?.hasAttachments ? 'YES' : 'NO',
            // description: item?.description || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true} // Ensure form reinitializes when item changes
        >
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
              <View style={styles.barcontainer1}>


                <View style={{ flex: 1 }}>
                  {textFields.map((field, index) => (
                    <View
                      key={`text-${field.id}`}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
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
                        <TouchableOpacity onPress={() => removeTextField(field.id)}>
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
                    style={[styles.addmore]}
                    onPress={addTextField}
                  >
                    <MyIcons name={'add'} size={15} />
                    <CustomText
                      text="Add More Text Fields"
                      font={fonts.benzin.regular}
                      size={font.medium}
                      color={colors.text.red}
                      style={{ marginTop: 5 }}
                    />
                  </TouchableOpacity>
                </View>


                <View style={{ flex: 1 }}>
                  {dateFields.map((field, index) => (
                    <View
                      key={`date-${field.id}`}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
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
                        <TouchableOpacity onPress={() => removeDateField(field.id)}>
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
                    style={[styles.addmore]}
                    onPress={addDateField}
                  >
                    <MyIcons name={'add'} size={15} />
                    <CustomText
                      text="Add More Date Fields"
                      font={fonts.benzin.regular}
                      size={font.medium}
                      color={colors.text.red}
                    />
                  </TouchableOpacity>
                </View>

                {/* <InputField
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
                  onValueChange={value => setFieldValue('hasAttachments', value)}
                  dynamicData={hasAttachments}
                  value={values.hasAttachments}
                  errors={touched.hasAttachments && errors.hasAttachments}
                  style={{ paddingBottom: 10 }}
                />

                <View style={{ alignItems: 'center' }}>
                  <DocumentImagePicker
                    handleImage={image => {
                      LOG('Selected Image', image);
                      setImage(image); // Directly set the single image
                    }}
                    label={'Update Category Image'}
                    singleImage={true} // Ensure single image selection
                    initialImage={item?.image} // Pass existing image for display
                  />
                </View>

                {editStoreLoading ? (
                  <ActivityLoader color={colors.theme.secondary} />
                ) : (
                  <MainButton
                    title={'Update Category'}
                    onPress={handleSubmit}
                    style={{
                      marginTop: spacing.large,
                      alignSelf: 'center',
                      width: vw * 80,
                      borderRadius: 8,
                      paddingVertical: spacing.medium,
                    }}
                  />
                )}
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => {
          setModalVisible(false);
          dispatch(categoryApi.util.resetApiState());
         navigation.goBack()
        }}
        title="System Message"
        message="Custom Record updated successfully"
        buttonText="Go Back"
        onButtonPress={() => {
          setModalVisible(false);
          dispatch(categoryApi.util.resetApiState());
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'BottomTabs',
                state: {
                  type: 'tab', // 👈 necessary in some setups
                  routes: [
                    { name: routes?.tab?.addrecords },
                    { name: routes?.tab?.vehicles },
                    { name: routes?.tab?.records },
                    { name: routes?.tab?.otherrecord },
                    { name: routes?.tab?.home },
                  ],
                  index: 0, // 👈 the tab to focus
                },
              },
            ],
          });
          
          
        }}
      />
    </>
  );
};

export default EditCustomRecordsCategory;