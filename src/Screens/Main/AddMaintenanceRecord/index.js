import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { LogBox, ScrollView, TouchableOpacity, View ,Image} from 'react-native';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { executeApiRequestForQueryParams } from '../../../Api/methods/method';
import {
  useFetchStoreByIdQuery,
  useFetchStoreByUserIdQuery,
} from '../../../Api/storeApiSlice';
import { useFetchVehicleByUserQuery } from '../../../Api/vehiclesApiSlice';
import fonts from '../../../Assets/fonts';
import ActivityLoader from '../../../Components/ActivityLoader';
import { MainButton } from '../../../Components/Buttons/MainButton';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import CustomHeader from '../../../Components/CustomHeader';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import InputField from '../../../Components/InputField';
import ModalComponent from '../../../Components/ModalComponent';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import { colors } from '../../../theme/colors';
import { font, layout, spacing } from '../../../theme/styles';
import { vh } from '../../../theme/units';
import { LOG } from '../../../Utils/helperFunction';
import { styles } from './styles';
import {
  useAddMutation,
  useFetchMaintenanceAutopartsByUserQuery,
} from '../../../Api/mainteinanceAutopartsApiSlice';
import { useFetchRecordsByUserQuery } from '../../../Api/recordsApiSlice';
import DropDown from '../../../Components/DropDown/dropdown2';
import { useFetchMechanicsByUserQuery } from '../../../Api/mechanicApiSlice';

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  // vehicleId: Yup.string().required('Vehicle is required'),
  // storeId: Yup.string().required('Store/Shop is required'),
  // workerId: Yup.string().required('Mechanic/Attendant is required'),
  // serviceDate: Yup.string().required('Enter Date is required'),
  // partDetails: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       partNum: Yup.string().required('Part Number is required'),
  //       partDescription: Yup.string().required('Part Description is required'),
  //     }),
  //   )
  //   .min(1, 'At least one part number and description is required'),
});

const AddMaintenanceRecord = props => {
  const { attachments, draftId, vehicleIdPrefilled } = props.route.params || {};

  LOG('draftId', draftId);
  console.log('attachments', attachments);
  console.log('vehicleIdPrefilled', vehicleIdPrefilled);

  const navigation = useNavigation();

  const formikRef = useRef(null);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedMechanic, setSelectedMechanic] = useState('');
  const [selectedAutopart, setSelectedAutopart] = useState('');
  const [selectedAutoparts, setSelectedAutoparts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gallery, setGallery] = useState(attachments || []);

  LOG('selectedAutoparts', selectedAutoparts);

  const userDetails = useSelector(state => state?.auth?.user || {});
  const userId = userDetails?._id;

  // Fetch vehicles from API
  const {
    data: vehicleData,
    isLoading: vehicleLoading,
    isFetching: vehicleFetching,
    error: vehicleError,
    refetch: vehicleRefetch,
  } = useFetchVehicleByUserQuery();

  // Fetch stores from API
  const {
    data: storeData,
    isLoading: storeLoading,
    isFetching: storeFetching,
    error: storeError,
    refetch: storeRefetch,
  } = useFetchStoreByUserIdQuery();

  // Fetch selected store details (for mechanics)
  const {
    data: selectedStoreData,
    isLoading: selectedStoreLoading,
    isFetching: selectedStoreFetching,
    error: selectedStoreError,
    refetch: selectedStoreRefetch,
  } = useFetchStoreByIdQuery(selectedStore, {
    skip: !selectedStore,
  });

  // Fetch autoparts from API
  // const {
  //   data: autoParts,
  //   isLoading: autopartsLoading,
  //   isFetching: autopartsFetching,
  //   error: autopartsError,
  //   refetch: autopartsRefetch,
  // } = useFetchRecordsByUserQuery();

  const {
    data: autoParts,
    isLoading: autopartsLoading,
    isFetching: autopartsFetching,
    error: autopartsError,
    refetch: autopartsRefetch,
  } = useFetchMaintenanceAutopartsByUserQuery({ refetchOnFocus: true });

  LOG('autoParts:autoParts', autoParts);
  LOG('autopartsErrorautopartsError:', autopartsError);

  // Mutation for adding maintenance records
  const [addMaintenance, { isLoading: isAddingMaintenance }] = useAddMutation();

  LOG('data-vehicle', vehicleData);
  LOG('data-store', storeData);
  LOG('selected-store-data', selectedStoreData);
  LOG('autoParts', autoParts);

  // Process vehicle data for dropdown
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

  // Process store data for dropdown
  // let Stores = [];
  // if (Array.isArray(storeData) && storeData.length > 0) {
  //   Stores = storeData.map((store, index) => ({
  //     key: index,
  //     value: store?.storeName ?? '',
  //     id: store?._id ?? '',
  //   }));
  // }

  // Process autoparts data for dropdown
  let Autoparts = [];
  if (Array.isArray(autoParts?.docs) && autoParts.docs.length > 0) {
    Autoparts = autoParts.docs.map((part, index) => {
      console.log('partsss', part);
      console.log('indexindex', index);
      return {
        key: index,
        value: part?.partDetails?.partName ?? '',
        // value: part?.partBrand ?? '',
        id: part?._id ?? '',
      };
    });
  } else {
    Autoparts = [{ key: 0, value: 'No Item found', id: 'no_item_found' }];
  }

  // Process mechanics from selected store data
  // let Mechanics = [];
  // if (selectedStoreData) {
  //   const store = selectedStoreData;
  //   if (store.mechanics && store.mechanics.length > 0) {
  //     Mechanics = store.mechanics.map((mechanic, index) => ({
  //       key: index,
  //       value: mechanic.name ?? '',
  //       id: mechanic._id ?? '',
  //     }));
  //   } else {
  //     Mechanics.push({
  //       key: 0,
  //       value: 'No mechanics available',
  //       id: '',
  //     });
  //   }
  // } else if (selectedStore) {
  //   Mechanics.push({
  //     key: 0,
  //     value: 'No mechanics available',
  //     id: '',
  //   });
  // }

  let Conditions = [
    { key: '0', value: 'NEW', id: 0 },
    { key: '1', value: 'USED', id: 1 },
  ];
  let Warranty = [
    { key: '0', value: 'YES', id: 0 },
    { key: '1', value: 'NO', id: 1 },
    // { key: '2', value: 'N/A', id: 2 },
  ];

  useEffect(() => {
    if (vehicleIdPrefilled || true) {
      console.log('formikRef.current.setFieldValue', formikRef.current);

      formikRef.current.setFieldValue('vehicleId', vehicleIdPrefilled);
      setSelectedVehicle(vehicleIdPrefilled);
    }
  }, [vehicleIdPrefilled]);

  useEffect(() => {
    if (vehicleIdPrefilled && formikRef.current && Vehicles.length > 0) {
      // Find the vehicle in the Vehicles array that matches vehicleIdPrefilled
      const selectedVehicleObj = Vehicles.find(
        vehicle => vehicle.id === vehicleIdPrefilled,
      );

      if (selectedVehicleObj) {
        // Set the Formik field value
        formikRef.current.setFieldValue('vehicleId', vehicleIdPrefilled);
        // Update the selectedVehicle state to reflect in the DropDown
        setSelectedVehicle(vehicleIdPrefilled);
      } else {
        console.warn(
          'vehicleIdPrefilled does not match any vehicle in Vehicles array',
        );
      }
    }
  }, [vehicleIdPrefilled, Vehicles, formikRef]);

  const handleSubmitForm = async (values, { resetForm }) => {
    if (!selectedVehicle) {
      alert('Please select a vehicle');
      return;
    }
    // if (!selectedStore) {
    //   alert('Please select a store');
    //   return;
    // }
    // if (!selectedMechanic) {
    //   alert('Please select a mechanic');
    //   return;
    // }

    setIsSubmitting(true);
    try {
      const autoPartsIdss = selectedAutoparts.map(item => item.id);
      LOG('autoPartsIdss', autoPartsIdss);

      let payload = {
        ...values,
        vehicleId: selectedVehicle,
        // storeId: selectedStore,
        // workerId: selectedMechanic,
        enterDate:
          values?.enterDate || new Date().toISOString().split('T')[0],
        autoPartIds: JSON.stringify(autoPartsIdss),
        partDescription: JSON.stringify(values.partDetails),
        partBrand: values.partBrandName,
        currentMileage: values.carMileage,
        partDetails: JSON.stringify(values?.partDetails),
      };

      LOG('payloadddd', payload);

      // Uncomment when API is ready

      const result = await executeApiRequestForQueryParams({
        apiCallFunction: addMaintenance,
        body: payload,
        formData: true,
        queryParams: draftId ? { draftId } : '',
      });
      console.log('result', result);

      if (result?.status) {
        setIsTaskSuccess(true);
        setModalVisible(true);
        resetForm();
        setSelectedAutoparts([]);
      }
    } catch (error) {
      LOG('Error adding maintenance record', error);
      alert(error?.data?.message || 'Failed to add maintenance record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FilterInputRender = ({ values, setFieldValue, touched, errors }) => (
    <View style={styles.barcontainer}>
      <DropDown
        label={'Select Vehicle'}
        placeholder={'Select'}
        textColor={
          selectedVehicle ? colors?.text?.dimBlack : colors?.text?.grey
        }
        onValueChange={(value, id) => {
          setSelectedVehicle(id);
          setFieldValue('vehicleId', id);
        }}
        dynamicData={Vehicles}
        errors={touched.vehicleId && errors.vehicleId}
        initialValue={selectedVehicle}
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
          style={{ marginTop: 5 }}
        />
      </TouchableOpacity>

      <InputField
        label="Select Location/Shop"
        placeholder="Enter Location/Shop"
        keyboardType={'default'}
        value={values.location}
        onChangeText={text => setFieldValue('location', text)}
        errors={touched.location && errors.location}
      />
      {/* <DropDown
        label={'Select Store / Shop'}
        placeholder={'Select'}
        textColor={selectedStore ? colors?.text?.dimBlack : colors?.text?.grey}
        onValueChange={(value, id) => {
          setSelectedStore(id);
          setFieldValue('storeId', id);
          setSelectedMechanic('');
          // setTimeout(() => selectedStoreRefetch(), 100);
        }}
        dynamicData={Stores}
        errors={touched.storeId && errors.storeId}
      /> */}
      {/* <TouchableOpacity
        style={styles.addmore}
        onPress={() => navigation.navigate(routes.main.addastore)}>
        <MyIcons name={'add'} size={15} />
        <CustomText
          text="Add New Store / Shop"
          font={fonts.benzin.regular}
          size={font.medium}
          color={colors.text.red}
          style={{marginTop: 5}}
        />
      </TouchableOpacity> */}
      <CustomDatePicker
        label="Enter Date"
        date={values.enterDate ? new Date(values.enterDate) : null}
        onDateChange={date => setFieldValue('enterDate', date.toISOString())}
        errors={touched.enterDate && errors.enterDate}
      />
      <View style={{ height: 1 }} />

      {/* <DropDown
        label={'Select Mechanic / Attendant Name'}
        placeholder={'Select'}
        textColor={
          selectedMechanic ? colors?.text?.dimBlack : colors?.text?.grey
        }
        onValueChange={(value, id) => {
          setSelectedMechanic(id);
          setFieldValue('workerId', id);
        }}
        dynamicData={Mechanics}
        errors={touched.workerId && errors.workerId}
      /> */}
      {/* <TouchableOpacity
        style={styles.addmore}
        onPress={() =>
          navigation.navigate(routes.main.addnewmechanic, {
            storeId: selectedStore,
            returnTo: routes.main.addmaintenancerecord,
          })
        }>
        <MyIcons name={'add'} size={15} />
        <CustomText
          text="Add New Mechanic / Attendant Name"
          font={fonts.benzin.regular}
          size={font.medium}
          color={colors.text.red}
          style={{ marginTop: 5 }}
        />
      </TouchableOpacity> */}
      <InputField
        label="Brief Description"
        multiline={true}
        placeholder="Enter Description"
        keyboardType={'default'}
        value={values.description}
        onChangeText={text => setFieldValue('description', text)}
        errors={touched.description && errors.description}
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
    const addPartDetail = () => {
      setFieldValue('partDetails', [
        ...values.partDetails,
        { partNum: '', partDescription: '' },
      ]);
    };
    const tenYearsLater = new Date();
    tenYearsLater.setFullYear(tenYearsLater.getFullYear() + 10);

    const removePartDetail = index => {
      setFieldValue(
        'partDetails',
        values.partDetails.filter((_, i) => i !== index),
      );
    };

    return (
      <View style={styles.barcontainer1}>
        <CustomText
          text="Maintenance Details"
          size={font.xxlarge}
          font={fonts.clash.regular}
          color={colors.text.dimBlack}
          style={{ marginBottom: 10, marginLeft: 10 }}
        />

        {/* {selectedAutoparts.length > 0 && (
          <View style={{ marginBottom: 10 }}>
            <CustomText
              text="Select Component/Part replaced or repaired"
              size={font.medium}
              font={fonts.clash.regular}
              color={colors.text.dimBlack}
              style={{ marginBottom: 5 }}
            />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
              {selectedAutoparts.map((part, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.theme.secondary,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    marginRight: 5,
                    marginBottom: 5,
                  }}>
                  <CustomText
                    text={part.value}
                    size={font.small}
                    color={colors.text.white}
                    style={{ marginRight: 5 }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedAutoparts(prev =>
                        prev.filter(p => p.id !== part.id),
                      );
                    }}>
                    <MyIcons name="closed" size={15} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        <DropDown
          label={'Select Component/Part replaced or repaired'}
          placeholder={'Select'}
          textColor={
            selectedAutopart ? colors?.text?.dimBlack : colors?.text?.grey
          }
          onValueChange={(value, id) => {
            setSelectedAutopart(id);
            if (!selectedAutoparts.some(part => part.id === id)) {
              setSelectedAutoparts(prev => [
                ...prev,
                { id, value, key: prev.length },
              ]);
            }
            setSelectedAutopart('');
          }}
          dynamicData={Autoparts}
        /> */}
        {/* <TouchableOpacity
          style={styles.addmore}
          onPress={() => navigation.navigate(routes.main.addmaintenancerecord)}>
          <MyIcons name={'add'} size={15} />
          <CustomText
            text="Add New Autopart"
            font={fonts.benzin.regular}
            size={font.medium}
            color={colors.text.red}
            style={{ marginTop: 5 }}
          />
        </TouchableOpacity> */}
        {/* <InputField
          label="New Component / Part Brand Name"
          placeholder="Enter Component / Part Brand Name"
          keyboardType={'default'}
          value={values.partBrandName}
          onChangeText={text => setFieldValue('partBrandName', text)}
          errors={touched.partBrandName && errors.partBrandName}
        /> */}
        <InputField
          label="Component/Part replaced or repaired"
          placeholder="Enter Component/Part replaced or repaired"
          keyboardType={'default'}
          value={values.partName}
          onChangeText={text => setFieldValue('partName', text)}
          errors={touched.partName && errors.partName}
        />

        <InputField
          label="Current Car Mileage"
          placeholder="Enter Car Mileage"
          keyboardType={'numeric'}
          value={values.carMileage}
          onChangeText={text => setFieldValue('carMileage', text)}
          errors={touched.carMileage && errors.carMileage}
        />
        <InputField
          label="Estimated Maintenance/Repair Price"
          placeholder="Enter Estimated Maintenance/Repair Price"
          keyboardType={'numeric'}
          value={values.estimatedMaintenancePrice}
          onChangeText={text => setFieldValue('estimatedMaintenancePrice', text)}
          errors={touched.estimatedMaintenancePrice && errors.estimatedMaintenancePrice}
        />
        <InputField
          label="Actual Maintenance/Repair Price"
          placeholder="Enter Actual Maintenance/Repair Price"
          keyboardType={'numeric'}
          value={values.actualMaintenancePrice}
          onChangeText={text => setFieldValue('actualMaintenancePrice', text)}
          errors={touched.actualMaintenancePrice && errors.actualMaintenancePrice}
        />
        <DropDown
          label={'Condition'}
          placeholder={'Select'}
          textColor={
            selectedAutopart ? colors?.text?.dimBlack : colors?.text?.grey
          }
          onValueChange={(value, id) => setFieldValue('condition', value)}
          dynamicData={Conditions}
        />
        <View>
          {/* <CustomText
            text="Part Details"
            size={font.medium}
            font={fonts.clash.regular}
            color={colors.text.dimBlack}
            style={{ marginBottom: vh * 4 }}
          /> */}
          {values.partDetails.map((part, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <InputField
                  label={`Part Number ${index + 1}`}
                  placeholder="Enter Part Number"
                  keyboardType={'default'}
                  value={part.partNum}
                  onChangeText={text =>
                    setFieldValue(`partDetails[${index}].partNum`, text)
                  }
                  errors={
                    touched.partDetails?.[index]?.partNum &&
                    errors.partDetails?.[index]?.partNum
                  }
                />
                <InputField
                  label={`Part Description ${index + 1}`}
                  placeholder="Enter Part Description"
                  keyboardType={'default'}
                  value={part.partDescription}
                  onChangeText={text =>
                    setFieldValue(`partDetails[${index}].partDescription`, text)
                  }
                  errors={
                    touched.partDetails?.[index]?.partDescription &&
                    errors.partDetails?.[index]?.partDescription
                  }
                  style={{ marginTop: 10 }}
                />
              </View>
              <TouchableOpacity
                onPress={() => removePartDetail(index)}
                style={{ padding: 10 }}>
                <MyIcons name="closed" size={15} />
              </TouchableOpacity>
            </View>
          ))}
          {errors.partDetails && typeof errors.partDetails === 'string' && (
            <CustomText
              text={errors.partDetails}
              color={colors.text.red}
              size={font.small}
              style={{ marginBottom: 10 }}
            />
          )}
          {/* {values.partDetails.map((part, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <InputField
                  label={`Part Number ${index + 1}`}
                  placeholder="Enter Part Number"
                  keyboardType={'default'}
                  value={part.partNum}
                  onChangeText={text =>
                    setFieldValue(`partDetails[${index}].partNum`, text)
                  }
                  errors={
                    touched.partDetails?.[index]?.partNum &&
                    errors.partDetails?.[index]?.partNum
                  }
                />
                <InputField
                  label={`Part Description ${index + 1}`}
                  placeholder="Enter Part Description"
                  keyboardType={'default'}
                  value={part.partDescription}
                  onChangeText={text =>
                    setFieldValue(`partDetails[${index}].partDescription`, text)
                  }
                  errors={
                    touched.partDetails?.[index]?.partDescription &&
                    errors.partDetails?.[index]?.partDescription
                  }
                  style={{ marginTop: 10 }}
                />
              </View>
              <TouchableOpacity
                onPress={() => removePartDetail(index)}
                style={{ padding: 10 }}>
                <MyIcons name="closed" size={15} />
              </TouchableOpacity>
            </View>
          ))}
          {errors.partDetails && typeof errors.partDetails === 'string' && (
            <CustomText
              text={errors.partDetails}
              color={colors.text.red}
              size={font.small}
              style={{ marginBottom: 10 }}
            />
          )} */}
          <TouchableOpacity style={styles.addmore} onPress={addPartDetail}>
            <MyIcons name={'add'} size={15} />
            <CustomText
              text="Add Another Part"
              font={fonts.benzin.regular}
              size={font.medium}
              color={colors.text.red}
              style={{ marginTop: 5 }}
            />
          </TouchableOpacity>
        </View>
        <InputField
          label="Actual Labor Cost"
          placeholder="Enter Actual Labor Cost"
          keyboardType={'numeric'}
          value={values.laborCost}
          onChangeText={text => setFieldValue('laborCost', text)}
          errors={touched.laborCost && errors.laborCost}
        />
        <InputField
          label="Total Maintenance/Repair Cost"
          placeholder="Enter Total Maintenance/Repair Cost"
          keyboardType={'numeric'}
          value={values.totalMaintenanceCost}
          onChangeText={text => setFieldValue('totalMaintenanceCost', text)}
          errors={touched.totalMaintenanceCost && errors.totalMaintenanceCost}
        />
        <InputField
          label="Parts Cost"
          placeholder="Enter Parts Cost"
          keyboardType={'numeric'}
          value={values.partsCost}
          onChangeText={text => setFieldValue('partsCost', text)}
          errors={touched.partsCost && errors.partsCost}
        />
        <DropDown
          label={'Warranty'}
          placeholder={'Select'}
          textColor={
            selectedAutopart ? colors?.text?.dimBlack : colors?.text?.grey
          }
          onValueChange={(value, id) => setFieldValue('warranty', value)}
          dynamicData={Warranty}
        />
        <InputField
          label="Warranty/Extended Warranty Price"
          placeholder="Enter Warranty Price"
          keyboardType={'numeric'}
          value={values.warrantyPrice}
          onChangeText={text => setFieldValue('warrantyPrice', text)}
          errors={touched.warrantyPrice && errors.warrantyPrice}
        />
        <InputField
          label="Warranty Time"
          placeholder="Enter Warranty Time"
          keyboardType={'default'}
          value={values.warrantyTime}
          onChangeText={text => setFieldValue('warrantyTime', text)}
          errors={touched.warrantyTime && errors.warrantyTime}
        />
        <CustomDatePicker
          label="Warranty Expiration"
          date={
            values.warrantyExpiration
              ? new Date(values.warrantyExpiration)
              : null
          }
          maximumDate={tenYearsLater}
          onDateChange={date =>
            setFieldValue('warrantyExpiration', date.toISOString())
          }
          errors={touched.warrantyExpiration && errors.warrantyExpiration}
        />
        <InputField
          label="Brief Description/Comment"
          placeholder="Enter Brief Description/Comment"
          keyboardType={'default'}
          value={values.comment}
          onChangeText={text => setFieldValue('comment', text)}
          errors={touched.comment && errors.comment}
        />
        <View style={{ alignItems: 'center', marginBottom: vh * 2 }}>
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
                gallery.map(item => (
                  <View key={item?.image?.uri}>
                    <Image
                      source={{ uri: item?.image?.uri }}
                      style={{
                        height: vh * 9,
                        width: vh * 9,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                ))}
            </View>
          )}
          <DocumentImagePicker
            label="Add Invoice/Receipt/Photos"
            handleImage={images => setFieldValue('gallery', images)}
            errors={touched.gallery && errors.gallery}
          />
        </View>
        {vehicleLoading ||
          storeLoading ||
          selectedStoreLoading ||
          isSubmitting ||
          isAddingMaintenance ? (
          <ActivityLoader color={colors.theme.secondary} />
        ) : (
          <MainButton
            style={styles.submitButton}
            title="Add Record"
            disabled={isTaskSuccess}
            onPress={handleSubmit}
          />
        )}
      </View>
    );
  };

  return (
    <>
      <CustomHeader routeName={routes.main.addmaintenancerecord} longtitle />
      <ScrollView>
        <Formik
          innerRef={formikRef}
          initialValues={{
            vehicleId: '',
            // storeId: '',
            // workerId: '',
            serviceDate: '',
            partBrandName: '',
            carMileage: '',
            condition: 'NEW',
            partDetails: [{ partNum: '', partDescription: '' }],
            partsCost: '',
            laborCost: '',
            warranty: 'NO',
            warrantyPrice: '',
            description: '',
            gallery: [],
            comment: '',
            warrantyTime: '',
            warrantyExpiration: '',
            location: '',
            actualMaintenancePrice: "",
            estimatedMaintenancePrice: "",
            totalMaintenanceCost: '',
            partName: ''
          }}
          // validationSchema={validationSchema}
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
            LOG('formik errors', errors);
            return (
              <>
                {FilterInputRender({ values, setFieldValue, touched, errors })}
                <View style={styles?.hr} />
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
            );
          }}
        </Formik>
        <ModalComponent
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onPressCross={() => {
            setModalVisible(false);
            setTimeout(() => navigation?.goBack(), 1000);
          }}
          title="Record Added"
          message="Do you want to add another maintenance record?"
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

export default AddMaintenanceRecord;
