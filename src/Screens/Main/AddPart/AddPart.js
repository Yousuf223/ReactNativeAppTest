import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { executeApiRequest } from '../../../Api/methods/method';
import { useAddMutation } from '../../../Api/vehiclesApiSlice';
import CustomHeader from '../../../Components/CustomHeader';
import InputField from '../../../Components/InputField';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import ModalComponent from '../../../Components/ModalComponent';
import { MainButtonWithGradient } from '../../../Components/Buttons/MainButton';
import ActivityLoader from '../../../Components/ActivityLoader';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import { colors } from '../../../theme/colors';
import { spacing, font } from '../../../theme/styles';
import { vh, vw } from '../../../theme/units';
import fonts from '../../../Assets/fonts';
import routes from '../../../Navigation/routes';
import { styles } from './styles';
import { LOG } from '../../../Utils/helperFunction';

// ✅ Validation Schema
const partValidation = Yup.object().shape({
  name: Yup.string().required('Part name is required'),
  forWhat: Yup.string().required('Please specify what this part is for'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Invalid price')
    .required('Price is required'),
  storeName: Yup.string().required('Store name is required'),
  storeAddress: Yup.string().required('Store address is required'),
  warranty: Yup.string().required('Warranty info required'),
  purchaseDate: Yup.date().required('Purchase date is required'),
  receiptImage: Yup.mixed().required('Receipt image required'),
  boxImage: Yup.mixed().required('Box image required'),
});

const AddPart = ({ navigation }) => {
  const [add, { isLoading }] = useAddMutation();
  const [isModalVisible, setModalVisible] = useState(false);
  const handleSubmitForm = async values => {
    const payload = {
      name: values.name,
      forWhat: values.forWhat,
      price: values.price,
      storeName: values.storeName,
      storeAddress: values.storeAddress,
      warranty: values.warranty,
      purchaseDate: values.purchaseDate,
      receiptImage: values.receiptImage,
      boxImage: values.boxImage,
    };

    LOG('Add Part Payload:', payload);

    // const response = await executeApiRequest({
    //   apiCallFunction: add,
    //   body: payload,
    //   formData: true,
    //   toast: true,
    //   timeout: 30000,
    // });

    // if (response) {
    //   LOG('Part Added Successfully:', response);
    //   setModalVisible(true);
    //   setTimeout(() => navigation.navigate(routes?.tab?.vehicles), 1000);
    // }
  };

  return (
    <>
      <CustomHeader title="Add Part" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <Formik
          initialValues={{
            name: '',
            forWhat: '',
            price: '',
            storeName: '',
            storeAddress: '',
            warranty: '',
            purchaseDate: '',
            receiptImage: null,
            boxImage: null,
          }}
          validationSchema={partValidation}
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
                  { paddingHorizontal: spacing.large },
                ]}>
                <CustomText
                  text="Part Details"
                  color={colors.text.dimBlack}
                  font={fonts.clash.regular}
                  size={font.xxlarge}
                />

                <View style={{ alignItems: 'center', marginTop: vh * 4 }}>
                  <InputField
                    required
                    label="Part Name"
                    placeholder="Enter Part Name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                    errors={touched.name && errors.name}
                  />

                  <InputField
                    required
                    label="For What Vehicle"
                    placeholder="Enter Vehicle Name (e.g., Honda Accord)"
                    onChangeText={handleChange('forWhat')}
                    onBlur={handleBlur('forWhat')}
                    value={values.forWhat}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                    errors={touched.forWhat && errors.forWhat}
                  />

                  <InputField
                    required
                    label="Price"
                    placeholder="Enter Price"
                    keyboardType="numeric"
                    onChangeText={handleChange('price')}
                    onBlur={handleBlur('price')}
                    value={values.price}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                    errors={touched.price && errors.price}
                  />

                  <InputField
                    required
                    label="Store Name"
                    placeholder="Enter Store Name"
                    onChangeText={handleChange('storeName')}
                    onBlur={handleBlur('storeName')}
                    value={values.storeName}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                    errors={touched.storeName && errors.storeName}
                  />

                  <InputField
                    required
                    label="Store Address"
                    placeholder="Enter Store Address"
                    onChangeText={handleChange('storeAddress')}
                    onBlur={handleBlur('storeAddress')}
                    value={values.storeAddress}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                    errors={touched.storeAddress && errors.storeAddress}
                  />

                  <InputField
                    required
                    label="Warranty"
                    placeholder="Enter Warranty (e.g., One Year)"
                    onChangeText={handleChange('warranty')}
                    onBlur={handleBlur('warranty')}
                    value={values.warranty}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                    errors={touched.warranty && errors.warranty}
                  />

                  <CustomDatePicker
                    dateStyle={{ width: vw * 80, marginBottom: vh * 5,backgroundColor:'#fff' }}
                    labelStyle={{ marginLeft: 20 }}
                    date={
                      values.purchaseDate
                        ? new Date(values.purchaseDate)
                        : null
                    }
                    label="Purchase Date"
                    onDateChange={date =>
                      setFieldValue('purchaseDate', date.toISOString())
                    }
                    errors={touched.purchaseDate && errors.purchaseDate}
                  />

                  <DocumentImagePicker
                    label="Upload Receipt Image"
                    handleImage={img => setFieldValue('receiptImage', img)}
                    errors={touched.receiptImage && errors.receiptImage}
                  />
                  <View style={{height:30}}></View>
                  <DocumentImagePicker
                    label="Upload Box Image"
                    handleImage={img => setFieldValue('boxImage', img)}
                    errors={touched.boxImage && errors.boxImage}
                  />

                  {isLoading ? (
                    <ActivityLoader
                      style={{ marginTop: spacing.medium }}
                      color={colors.theme.secondary}
                    />
                  ) : (
                    <View style={{ marginTop: spacing.medium }}>
                      <MainButtonWithGradient
                        title="Add Part"
                        onPress={handleSubmit}
                        style={{ width: vw * 80, alignSelf: 'center' }}
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        </Formik>

        {/* ✅ Success Modal */}
        <ModalComponent
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onPressCross={() => {
            setModalVisible(false);
            setTimeout(() => {
              navigation?.pop(2);
            }, 1000);
          }}
          title="Part Added"
          message="You have successfully added a new part!"
          buttonText="Got it"
          onButtonPress={() => {
            setModalVisible(false);
            setTimeout(() => {
              navigation?.pop(2);
            }, 1000);
          }}
        />
      </ScrollView>
    </>
  );
};

export default AddPart;
