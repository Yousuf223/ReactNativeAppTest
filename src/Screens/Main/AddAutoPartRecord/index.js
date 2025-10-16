import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View,Image} from 'react-native';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import {
  executeApiRequest,
  executeApiRequestForQueryParams,
} from '../../../Api/methods/method';
import {
  useFetchStoreByIdQuery,
  useFetchStoreByUserIdQuery,
} from '../../../Api/storeApiSlice';
import {useFetchVehicleByUserQuery} from '../../../Api/vehiclesApiSlice';
import fonts from '../../../Assets/fonts';
import ActivityLoader from '../../../Components/ActivityLoader';
import ButtonWithIcon from '../../../Components/Buttons/ButtonWIthIcon';
import {MainButton} from '../../../Components/Buttons/MainButton';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import CustomHeader from '../../../Components/CustomHeader';
import DropDown from '../../../Components/DropDown';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import InputField from '../../../Components/InputField';
import ModalComponent from '../../../Components/ModalComponent';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {font, spacing} from '../../../theme/styles';
import {vh, WIDTH} from '../../../theme/units';
import {ConditionRecord} from '../../../Utils/dummyData';
import {LOG} from '../../../Utils/helperFunction';
import {styles} from './styles';
import {useAddMutation} from '../../../Api/autopartsApiSlice';

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  partName: Yup.string().required('Part Name is required'),
  brand: Yup.string().required('Brand Name is required'),
  condition: Yup.string().required('Condition is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
  partNumber: Yup.string().required('Part Number is required'),
  warrantyManufacture: Yup.string().required(
    'Warranty Manufacture is required',
  ),
  extendedWarrantee: Yup.string().required('Extended Warranty is required'),
  extendedWarrantyPrice: Yup.number()
    .typeError('Warranty Price must be a number')
    .positive('Warranty Price must be positive')
    .required('Warranty Price is required'),
  currentCarMileage: Yup.number()
    .typeError('Mileage must be a number')
    .positive('Mileage must be positive')
    .required('Mileage is required'),
  receiptNum: Yup.string().required('Receipt Number is required'),
  gallery: Yup.array()
    .min(1, 'At least one image is required')
    .required('Image is required'),
  buyingDate: Yup.string().required('Buying Date is required'),
});

const AddAutoPartRecord = ({route}) => {
  const {attachments, draftId} = route?.params;

  LOG('draftId', draftId);
  const navigation = useNavigation();
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedSeller, setSelectedSeller] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gallery, setGallery] = useState(attachments || []);

  const userDetails = useSelector(state => state?.auth?.user || {});
  const userId = userDetails?._id;

  const {
    data: vehicleData,
    isLoading: vehicleLoading,
    isFetching: vehicleFetching,
    error: vehicleError,
    refetch: vehicleRefetch,
  } = useFetchVehicleByUserQuery();

  const [addAutoPart, {isLoading: isAddingAutoPart}] = useAddMutation();

  const {
    data: storeData,
    isLoading: storeLoading,
    isFetching: storeFetching,
    error: storeError,
    refetch: storeRefetch,
  } = useFetchStoreByUserIdQuery();

  const {
    data: selectedStoreData,
    isLoading: selectedStoreLoading,
    isFetching: selectedStoreFetching,
    error: selectedStoreError,
    refetch: selectedStoreRefetch,
  } = useFetchStoreByIdQuery(selectedStore, {
    skip: !selectedStore,
  });

  LOG('data-vehicle', vehicleData);
  LOG('data-store', storeData);
  LOG('selected-store-data', selectedStoreData);

  let Vehicles = [];
  if (Array.isArray(vehicleData) && vehicleData.length > 0) {
    const uniqueMakes = [
      ...new Set(
        vehicleData.map(item => ({
          make: item?.vehicleDetails?.make,
          id: item?._id,
        })),
      ),
    ];
    Vehicles = uniqueMakes.map((item, index) => ({
      key: index,
      value: item?.make ?? '',
      id: item?.id ?? '',
    }));
  }

  let Stores = [];
  if (Array.isArray(storeData) && storeData.length > 0) {
    Stores = storeData.map((store, index) => ({
      key: index,
      value: store?.storeName ?? '',
      id: store?._id ?? '',
    }));
  }

  let Sellers = [];
  if (selectedStoreData) {
    const store = selectedStoreData;
    if (store.sellers && store.sellers.length > 0) {
      Sellers = store.sellers.map((seller, index) => ({
        key: index,
        value: seller.name ?? '',
        id: seller._id ?? '',
      }));
    } else {
      Sellers.push({
        key: 0,
        value: 'No sellers available',
        id: '',
      });
    }
  } else if (selectedStore) {
    Sellers.push({
      key: 0,
      value: 'No sellers available',
      id: '',
    });
  }

  const handleSubmitForm = async (values, {resetForm}) => {
    if (!selectedVehicle) {
      alert('Please select a vehicle');
      return;
    }
    if (!selectedStore) {
      alert('Please select a store');
      return;
    }
    if (!selectedSeller) {
      alert('Please select a seller');
      return;
    }

    setIsSubmitting(true);
    try {
      let payload = {
        ...values,
        vehicleId: selectedVehicle,
        storeId: selectedStore,
        sellerId: selectedSeller,
        buyingDate:
          values?.buyingDate || new Date().toISOString().split('T')[0],
      };

      LOG('payloadpayloadpayloadpayload', payload);

      const result = await executeApiRequestForQueryParams({
        apiCallFunction: addAutoPart,
        body: payload,
        formData: true,
        queryParams: draftId ? {draftId} : '',
      });
      LOG('result', result);
      if (result?.status) {
        setIsTaskSuccess(true);
        setModalVisible(true);
        resetForm();
      }
    } catch (error) {
      LOG('Error adding auto part', error);
      alert(error?.data?.message || 'Failed to add auto part record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FilterInputRender = ({values, setFieldValue, touched, errors}) => (
    <View style={styles.barcontainer}>
      <DropDown
        label={'Select Vehicle'}
        placeholder={'Select'}
        textColor={
          selectedVehicle ? colors?.text?.dimBlack : colors?.text?.grey
        }
        onValueChange={(value, id) => setSelectedVehicle(id)}
        dynamicData={Vehicles}
      />
      <TouchableOpacity
        style={styles.addmore}
        onPress={() => navigation.navigate(routes.main.addVehicles)}>
        <MyIcons name={'add'} size={15} />
        <CustomText
          text="Add New Vehicle"
          font={fonts.benzin.regular}
          size={font.medium}
          color={colors.text.red}
          style={{marginTop: 5}}
        />
      </TouchableOpacity>
      <DropDown
        label={'Select Store'}
        placeholder={'Select'}
        textColor={selectedStore ? colors?.text?.dimBlack : colors?.text?.grey}
        onValueChange={(value, id) => {
          setSelectedStore(id);
          setSelectedSeller('');
          setTimeout(() => selectedStoreRefetch(), 100);
        }}
        dynamicData={Stores}
      />
      <TouchableOpacity
        style={styles.addmore}
        onPress={() => navigation.navigate(routes.main.addastore)}>
        <MyIcons name={'add'} size={15} />
        <CustomText
          text="Add New Store"
          font={fonts.benzin.regular}
          size={font.medium}
          color={colors.text.red}
          style={{marginTop: 5}}
        />
      </TouchableOpacity>
      <DropDown
        label={'Select Seller'}
        placeholder={'Select'}
        textColor={selectedSeller ? colors?.text?.dimBlack : colors?.text?.grey}
        onValueChange={(value, id) => setSelectedSeller(id)}
        dynamicData={Sellers}
      />
      <TouchableOpacity
        style={styles.addmore}
        onPress={() =>
          navigation.navigate(routes.main.addnewseller, {
            storeId: selectedStore,
            returnTo: routes.main.addautopartrecord,
          })
        }>
        <MyIcons name={'add'} size={15} />
        <CustomText
          text="Add New Seller"
          font={fonts.benzin.regular}
          size={font.medium}
          color={colors.text.red}
          style={{marginTop: 5}}
        />
      </TouchableOpacity>
      <CustomDatePicker
        date={values.buyingDate ? new Date(values.buyingDate) : null}
        onDateChange={date => setFieldValue('buyingDate', date.toISOString())}
        errors={touched.buyingDate && errors.buyingDate}
      />
    </View>
  );

  const PartDetails = ({
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  }) => {
    return (
      <View style={styles.barcontainer1}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <CustomText
            text="Parts Details"
            size={font.xxlarge}
            font={fonts.clash.regular}
            color={colors.text.dimBlack}
            style={{marginBottom: 10, marginLeft: 10}}
          />
          <ButtonWithIcon
            iconName={'scan'}
            title={'Scan Qr Code'}
            style={{width: WIDTH - 220, height: 40, top: -5}}
          />
        </View>
        <InputField
          label="Part Name"
          placeholder="Enter Part Name"
          value={values.partName}
          onChangeText={handleChange('partName')}
          onBlur={handleBlur('partName')}
          errors={touched.partName && errors.partName} // Pass error directly
        />
        <InputField
          label="Brand Name"
          placeholder="Enter Brand Name"
          value={values.brand}
          onChangeText={handleChange('brand')}
          onBlur={handleBlur('brand')}
          errors={touched.brand && errors.brand} // Pass error directly
        />
        <DropDown
          label={'Conditions'}
          placeholder={'Select'}
          textColor={
            values.condition ? colors?.text?.dimBlack : colors?.text?.grey
          }
          onValueChange={value => setFieldValue('condition', value)}
          dynamicData={ConditionRecord}
          errors={touched.condition && errors.condition}
        />

        <InputField
          label="Price ($)"
          placeholder="Enter Price"
          keyboardType={'numeric'}
          value={values.price}
          onChangeText={handleChange('price')}
          onBlur={handleBlur('price')}
          errors={touched.price && errors.price} // Pass error directly
        />
        <InputField
          label="Part Number"
          placeholder="Enter Part Number"
          keyboardType={'numeric'}
          value={values.partNumber}
          onChangeText={handleChange('partNumber')}
          onBlur={handleBlur('partNumber')}
          errors={touched.partNumber && errors.partNumber} // Pass error directly
        />
        <InputField
          label="Warranty Manufacture"
          placeholder="Enter Manufacture"
          keyboardType={'numeric'}
          value={values.warrantyManufacture}
          onChangeText={handleChange('warrantyManufacture')}
          onBlur={handleBlur('warrantyManufacture')}
          errors={touched.warrantyManufacture && errors.warrantyManufacture} // Pass error directly
        />
        <InputField
          label="Extended Warrantee"
          placeholder="Enter Warrantee"
          value={values.extendedWarrantee}
          keyboardType={'numeric'}
          onChangeText={handleChange('extendedWarrantee')}
          onBlur={handleBlur('extendedWarrantee')}
          errors={touched.extendedWarrantee && errors.extendedWarrantee} // Pass error directly
        />
        <InputField
          label="Warrantee Price ($)"
          placeholder="Enter Warrantee"
          keyboardType={'numeric'}
          value={values.extendedWarrantyPrice}
          onChangeText={handleChange('extendedWarrantyPrice')}
          onBlur={handleBlur('extendedWarrantyPrice')}
          errors={touched.extendedWarrantyPrice && errors.extendedWarrantyPrice} // Pass error directly
        />
        <InputField
          label="Current Car Mileage"
          placeholder="Enter Mileage"
          keyboardType={'numeric'}
          value={values.currentCarMileage}
          onChangeText={handleChange('currentCarMileage')}
          onBlur={handleBlur('currentCarMileage')}
          errors={touched.currentCarMileage && errors.currentCarMileage} // Pass error directly
        />
        <InputField
          label="Receipt Number"
          placeholder="Enter Receipt"
          keyboardType={'numeric'}
          value={values.receiptNum}
          onChangeText={handleChange('receiptNum')}
          onBlur={handleBlur('receiptNum')}
          errors={touched.receiptNum && errors.receiptNum} // Pass error directly
        />
        <View style={{alignItems: 'center', marginBottom: vh * 2}}>
          {gallery.length > 0 && (
            <CustomText
              text="Draft Images:"
              style={{
                alignSelf: 'flex-start',
                marginBottom: spacing.small,
              }}
            />
          )}
          {gallery.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: spacing.small,
                alignItems: 'flex-start',
                width: '100%',
                marginBottom: vh * 4,
              }}>
              {gallery?.length > 0 &&
                gallery.map(item => {
                  return (
                    <View>
                      <Image
                        source={{uri: item?.image?.uri}}
                        style={{
                          height: vh * 9,
                          width: vh * 9,
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  );
                })}
            </View>
          )}
          <DocumentImagePicker
            handleImage={images => setFieldValue('gallery', images)}
            errors={touched.gallery && errors.gallery}
          />
        </View>
        {/* <View style={{alignItems: 'center', marginBottom: vh * 2}}>
          <DocumentImagePicker
            handleImage={images => setFieldValue('gallery', images)}
            errors={touched.gallery && errors.gallery}
          />
        </View> */}
        {vehicleLoading ||
        storeLoading ||
        selectedStoreLoading ||
        isSubmitting ||
        isAddingAutoPart ? (
          <ActivityLoader color={colors.theme.secondary} />
        ) : (
          <MainButton
            style={styles.submitButton}
            title={'Add Record'}
            disabled={isTaskSuccess}
            onPress={handleSubmit}
          />
        )}
      </View>
    );
  };

  return (
    <>
      <CustomHeader routeName={routes.main.addautopartrecord} />
      <ScrollView>
        <Formik
          initialValues={{
            vehicleId: '',
            partName: '',
            brand: '',
            condition: '',
            price: '',
            partNumber: '',
            warrantyManufacture: '',
            extendedWarrantee: '',
            extendedWarrantyPrice: '',
            currentCarMileage: '',
            receiptNum: '',
            gallery: [],
            buyingDate: '',
          }}
          validationSchema={validationSchema}
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
            <>
              {FilterInputRender({values, setFieldValue, touched, errors})}
              <View style={[styles?.hr]} />
              <PartDetails
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                handleSubmit={handleSubmit}
                errors={errors}
                touched={touched}
              />
            </>
          )}
        </Formik>
        <ModalComponent
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onPressCross={() => {
            setModalVisible(false);
            setTimeout(() => navigation?.goBack(), 1000);
          }}
          title="Record Added"
          message="Do you want to add another auto-part record?"
          doublemodal
          buttonText1="No"
          buttonText="Yes"
          onButtonPress={() => {
            setModalVisible(false);
            setIsTaskSuccess(false);
          }}
        />
      </ScrollView>
    </>
  );
};

export default AddAutoPartRecord;
