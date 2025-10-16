import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import fonts from '../../../Assets/fonts';
import ActivityLoader from '../../../Components/ActivityLoader';
import {MainButton} from '../../../Components/Buttons/MainButton';
import CustomHeader from '../../../Components/CustomHeader';
import DropDown from '../../../Components/DropDown';
import InputField from '../../../Components/InputField';
import ModalComponent from '../../../Components/ModalComponent';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {font} from '../../../theme/styles';
import {Vehicle} from '../../../Utils/dummyData';
import {styles} from './styles';
import {LOG} from '../../../Utils/helperFunction';
import {useAddMutation} from '../../../Api/storeApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  storeName: Yup.string().required('Store Name is required'),
  address: Yup.string().required('Store Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
});

const AddAStore = () => {
  const navigation = useNavigation();
  const sheetRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    success: false,
  });
  const [add, {isLoading: addStoreLoading}] = useAddMutation();

  // State for dynamic fields
  const [mechanicFields, setMechanicFields] = useState([{id: 1, value: ''}]);
  const [sellerFields, setSellerFields] = useState([{id: 1, value: ''}]);

  const initialValues = {
    storeName: '',
    address: '',
    city: '',
    state: '',
    mechanics: [''],
    sellers: [''],
  };

  // Function to add new mechanic field
  const addMechanicField = () => {
    const newId =
      mechanicFields.length > 0
        ? Math.max(...mechanicFields.map(f => f.id)) + 1
        : 1;
    setMechanicFields([...mechanicFields, {id: newId, value: ''}]);
  };

  // Function to add new seller field
  const addSellerField = () => {
    const newId =
      sellerFields.length > 0
        ? Math.max(...sellerFields.map(f => f.id)) + 1
        : 1;
    setSellerFields([...sellerFields, {id: newId, value: ''}]);
  };

  // Function to remove mechanic field
  const removeMechanicField = id => {
    if (mechanicFields.length > 1) {
      setMechanicFields(mechanicFields.filter(field => field.id !== id));
    }
  };

  // Function to remove seller field
  const removeSellerField = id => {
    if (sellerFields.length > 1) {
      setSellerFields(sellerFields.filter(field => field.id !== id));
    }
  };

  const handleSubmit = async (values, {resetForm}) => {
    // Convert mechanic and seller fields to arrays
    const mechanics = mechanicFields
      .map(field => field.value)
      .filter(value => value.trim() !== '');
    const sellers = sellerFields
      .map(field => field.value)
      .filter(value => value.trim() !== '');

    const payload = {
      ...values,
      mechanics,
      sellers,
    };

    LOG('payload with mechanics and sellers', payload);

    try {
      const response = await executeApiRequest({
        apiCallFunction: add,
        body: payload,
      });
      LOG('API Response from Add Store', response);

      if (response?.success || response?.data) {
        setModalData({
          title: 'Store Added',
          message: 'You have successfully added a store!',
          success: true,
        });
        setModalVisible(true);
        resetForm();
        // Reset dynamic fields
        setMechanicFields([{id: 1, value: ''}]);
        setSellerFields([{id: 1, value: ''}]);
      } else {
        setModalData({
          title: 'Error',
          message:
            response?.message || 'Failed to add store. Please try again.',
          success: false,
        });
        setModalVisible(true);
      }
    } catch (error) {
      LOG('Error in Add Store API', error);
      setModalData({
        title: 'Error',
        message: 'Something went wrong. Please try again.',
        success: false,
      });
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (modalData.success) {
      setTimeout(() => {
        navigation?.goBack();
      }, 500);
    }
  };

  return (
    <>
      <CustomHeader routeName={routes.main.addastore} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
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
            <View style={styles.container}>
              <View style={{alignSelf: 'center', marginTop: '10%', gap: 25}}>
                <InputField
                  label="Store Name"
                  placeholder="Enter store"
                  keyboardType={'default'}
                  value={values.storeName}
                  onChangeText={handleChange('storeName')}
                  onBlur={handleBlur('storeName')}
                  error={touched.storeName && errors.storeName}
                />

                <InputField
                  label="Store Address"
                  placeholder="Enter Address"
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  error={touched.address && errors.address}
                />

                <InputField
                  label="City"
                  placeholder="Enter City"
                  keyboardType={'default'}
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  error={touched.city && errors.city}
                />

                <InputField
                  label="State"
                  placeholder="Enter State"
                  keyboardType={'default'}
                  value={values.state}
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  error={touched.state && errors.state}
                />

                {/* Mechanics Section */}
                <View>
                  {mechanicFields.map((field, index) => (
                    <View
                      key={field.id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <InputField
                        label={index === 0 ? 'Mechanic Name' : ''}
                        placeholder="Enter mechanic name"
                        keyboardType={'default'}
                        value={field.value}
                        onChangeText={text => {
                          const updatedFields = [...mechanicFields];
                          updatedFields[index].value = text;
                          setMechanicFields(updatedFields);
                        }}
                        style={{flex: 1}}
                      />
                      {mechanicFields.length > 1 && (
                        <TouchableOpacity
                          onPress={() => removeMechanicField(field.id)}>
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
                    style={[styles.addmore, {marginTop: 5}]}
                    onPress={addMechanicField}>
                    <MyIcons name={'add'} size={15} />
                    <CustomText
                      text="Add More Mechanics"
                      font={fonts.benzin.regular}
                      size={font.medium}
                      color={colors.text.red}
                      style={{marginTop: 5}}
                    />
                  </TouchableOpacity>
                </View>

                {/* Sellers Section */}
                <View>
                  {sellerFields.map((field, index) => (
                    <View
                      key={field.id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <InputField
                        label={index === 0 ? 'Seller Name' : ''}
                        placeholder="Enter seller name"
                        keyboardType={'default'}
                        value={field.value}
                        onChangeText={text => {
                          const updatedFields = [...sellerFields];
                          updatedFields[index].value = text;
                          setSellerFields(updatedFields);
                        }}
                        style={{flex: 1}}
                      />
                      {sellerFields.length > 1 && (
                        <TouchableOpacity
                          onPress={() => removeSellerField(field.id)}>
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
                    style={[styles.addmore, {marginTop: 5}]}
                    onPress={addSellerField}>
                    <MyIcons name={'add'} size={15} />
                    <CustomText
                      text="Add More Sellers"
                      font={fonts.benzin.regular}
                      size={font.medium}
                      color={colors.text.red}
                      style={{marginTop: 5}}
                    />
                  </TouchableOpacity>
                </View>

                {addStoreLoading ? (
                  <ActivityLoader color={colors.theme.secondary} />
                ) : (
                  <MainButton
                    style={styles.submitButton}
                    title={'Add Store'}
                    disabled={addStoreLoading}
                    onPress={handleSubmit}
                  />
                )}
              </View>
            </View>
          )}
        </Formik>

        <ModalComponent
          isVisible={isModalVisible}
          onClose={handleModalClose}
          onPressCross={handleModalClose}
          title={modalData.title}
          message={modalData.message}
          buttonText="Okay"
          onButtonPress={handleModalClose}
        />
      </ScrollView>
    </>
  );
};

export default AddAStore;
