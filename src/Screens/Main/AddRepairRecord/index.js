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
import {useFetchRecordsByUserQuery} from '../../../Api/recordsApiSlice';
import fonts from '../../../Assets/fonts';
import ActivityLoader from '../../../Components/ActivityLoader';
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
import {LOG} from '../../../Utils/helperFunction';
import {styles} from './styles';
import {useAddMutation} from '../../../Api/repairAutopartsApiSlice';

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  currentCarMileage: Yup.number()
    .typeError('Mileage must be a number')
    .positive('Mileage must be positive')
    .required('Mileage is required'),
  estimatedRepairCost: Yup.number()
    .typeError('Estimated Repair Cost must be a number')
    .positive('Estimated Repair Cost must be positive')
    .required('Estimated Repair Cost is required'),
  laborCost: Yup.number()
    .typeError('Actual Labor Cost must be a number')
    .positive('Actual Labor Cost must be positive')
    .required('Actual Labor Cost is required'),
  // repairs: Yup.string().required('Part Name is required'),
  repairPartsCost: Yup.number()
    .typeError('Repair Parts Cost must be a number')
    .positive('Repair Parts Cost must be positive')
    .required('Repair Parts Cost is required'),
  totalRepairCost: Yup.number()
    .typeError('Total Repair Cost must be a number')
    .positive('Total Repair Cost must be positive')
    .required('Total Repair Cost is required'),
  gallery: Yup.array()
    .min(1, 'At least one image is required')
    .required('Image is required'),
  repairDate: Yup.string().required('Repair Date is required'),
});

const AddRepairRecord = ({route}) => {
  const {attachments, draftId} = route?.params;
  const navigation = useNavigation();
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedMechanic, setSelectedMechanic] = useState('');
  const [selectedAutopart, setSelectedAutopart] = useState('');
  const [selectedAutoparts, setSelectedAutoparts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [repairFields, setRepairFields] = useState([{id: 1, value: ''}]);
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

  // Fetch autoparts from API
  const {
    data: autoParts,
    isLoading: autopartsLoading,
    isFetching: autopartsFetching,
    error: autopartsError,
    refetch: autopartsRefetch,
  } = useFetchRecordsByUserQuery();

  LOG('autoParts-data-get', autoParts);

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

  // Assuming a mutation for adding repair records
  const [addRepair, {isLoading: isAddingRepair}] = useAddMutation();

  LOG('data-vehicle', vehicleData);
  LOG('data-store', storeData);
  LOG('selected-store-data', selectedStoreData);
  LOG('autoparts-data', autoParts);

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
  let Stores = [];
  if (Array.isArray(storeData) && storeData.length > 0) {
    Stores = storeData.map((store, index) => ({
      key: index,
      value: store?.storeName ?? '',
      id: store?._id ?? '',
    }));
  }

  // Process autoparts data for dropdown
  let Autoparts = [];
  if (Array.isArray(autoParts?.docs) && autoParts.docs.length > 0) {
    Autoparts = autoParts.docs.map((part, index) => ({
      key: index,
      value: part?.partDetails?.partName ?? '',
      id: part?._id ?? '',
    }));
  } else {
    // Fallback to default autoparts if API doesn't return data
    Autoparts = [
      {key: 0, value: 'No Item found', id: 'no_item_found'},
      // {key: 1, value: 'Air Filter', id: 'air_filter'},
      // {key: 2, value: 'Suspension', id: 'suspension'},
      // {key: 3, value: 'Brake Pads', id: 'brake_pads'},
      // {key: 4, value: 'Oil Filter', id: 'oil_filter'},
      // {key: 5, value: 'Spark Plugs', id: 'spark_plugs'},
      // {key: 6, value: 'Alternator', id: 'alternator'},
      // {key: 7, value: 'Radiator', id: 'radiator'},
      // {key: 8, value: 'Transmission', id: 'transmission'},
      // {key: 9, value: 'Other', id: 'other'},
    ];
  }

  // Process mechanics from selected store data (assuming mechanics are part of store data)
  let Mechanics = [];
  if (selectedStoreData) {
    const store = selectedStoreData;
    if (store.mechanics && store.mechanics.length > 0) {
      // Adjust based on your API structure
      Mechanics = store.mechanics.map((mechanic, index) => ({
        key: index,
        value: mechanic.name ?? '',
        id: mechanic._id ?? '',
      }));
    } else {
      Mechanics.push({
        key: 0,
        value: 'No mechanics available',
        id: '',
      });
    }
  } else if (selectedStore) {
    Mechanics.push({
      key: 0,
      value: 'No mechanics available',
      id: '',
    });
  }

  // Function to add new repair field
  const addRepairFields = () => {
    const newId =
      repairFields.length > 0
        ? Math.max(...repairFields.map(f => f.id)) + 1
        : 1;
    setRepairFields([...repairFields, {id: newId, value: ''}]);
  };

  // Function to remove repair field
  const removeRepairFields = id => {
    if (repairFields.length > 1) {
      setRepairFields(repairFields.filter(field => field.id !== id));
    }
  };
  LOG('AUTO out function: ', selectedAutopart);
  const handleSubmitForm = async (values, {resetForm}) => {
    // if (!selectedVehicle) {
    //   alert('Please select a vehicle');
    //   return;
    // }
    // if (!selectedStore) {
    //   alert('Please select a store');
    //   return;
    // }
    // if (!selectedMechanic) {
    //   alert('Please select a mechanic');
    //   return;
    // }
    // if (!selectedAutopart) {
    //   alert('Please select an autopart');
    //   return;
    // }

    setIsSubmitting(true);
    try {
      const autoPartsIds = selectedAutoparts.map(item => item.id);
      const repairs = repairFields.map(field => field.value);
      let payload = {
        ...values,
        vehicleId: selectedVehicle,
        storeId: selectedStore,
        mechanicId: selectedMechanic,
        repairDate:
          values?.repairDate || new Date().toISOString().split('T')[0],
        repairs: JSON.stringify(repairs),
        autoParts: JSON.stringify(autoPartsIds),
      };

      LOG('Payload:', payload);

      const result = await executeApiRequestForQueryParams({
        apiCallFunction: addRepair,
        body: payload,
        formData: true,
        queryParams: draftId ? {draftId} : '',
      });

      if (result?.status) {
        setIsTaskSuccess(true);
        setModalVisible(true);
        resetForm();
      }
    } catch (error) {
      LOG('Error adding repair record', error);
      alert(error?.data?.message || 'Failed to add repair record');
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
          setSelectedMechanic('');
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
        label={'Select Mechanic'}
        placeholder={'Select'}
        textColor={
          selectedMechanic ? colors?.text?.dimBlack : colors?.text?.grey
        }
        onValueChange={(value, id) => setSelectedMechanic(id)}
        dynamicData={Mechanics}
      />
      <TouchableOpacity
        style={styles.addmore}
        onPress={() =>
          navigation.navigate(routes.main.addnewmechanic, {
            storeId: selectedStore,
            returnTo: routes.main.addrepairrecord,
          })
        }>
        <MyIcons name={'add'} size={15} />
        <CustomText
          text="Add New Mechanic"
          font={fonts.benzin.regular}
          size={font.medium}
          color={colors.text.red}
          style={{marginTop: 5}}
        />
      </TouchableOpacity>
      <CustomDatePicker
        date={values.repairDate ? new Date(values.repairDate) : null}
        onDateChange={date => setFieldValue('repairDate', date.toISOString())}
        errors={touched.repairDate && errors.repairDate}
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
        <CustomText
          text="Parts Details"
          size={font.xxlarge}
          font={fonts.clash.regular}
          color={colors.text.dimBlack}
          style={{marginBottom: 10, marginLeft: 10}}
        />

        {/* Repairs Name */}
        <View>
          {repairFields.map((field, index) => (
            <View
              key={field.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <InputField
                label={index === 0 ? 'Repairs Name' : ''}
                placeholder="Enter Repairs name"
                keyboardType={'default'}
                value={field.value}
                onChangeText={text => {
                  const updatedFields = [...repairFields];
                  updatedFields[index].value = text;
                  setRepairFields(updatedFields);
                }}
                // onChangeText={text => {
                //   setRepairFields(prevFields =>
                //     prevFields.map((item, idx) =>
                //       idx === index ? {...item, value: text} : item,
                //     ),
                //   );
                // }}
                style={{flex: 1}}
              />
              {repairFields.length > 1 && (
                <TouchableOpacity onPress={() => removeRepairFields(field.id)}>
                  <MyIcons name="bin" size={40} color={colors.text.red} />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity
            style={[styles.addmore, {marginTop: 5}]}
            onPress={addRepairFields}>
            <MyIcons name={'add'} size={15} />
            <CustomText
              text="Add More Repairs"
              font={fonts.benzin.regular}
              size={font.medium}
              color={colors.text.red}
              style={{marginTop: 5}}
            />
          </TouchableOpacity>
        </View>

        {/* Selected Autoparts */}
        {selectedAutoparts.length > 0 && (
          <View style={{marginBottom: 10}}>
            <CustomText
              text="Selected Autoparts"
              size={font.medium}
              font={fonts.clash.regular}
              color={colors.text.dimBlack}
              style={{marginBottom: 5}}
            />
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 5}}>
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
                    style={{marginRight: 5}}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedAutoparts(prev =>
                        prev.filter(p => p.id !== part.id),
                      );
                    }}>
                    <MyIcons
                      name="closed"
                      size={15}
                      // color={colors.text.white}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        <DropDown
          label={'Select Autopart'}
          placeholder={'Select'}
          textColor={
            selectedAutopart ? colors?.text?.dimBlack : colors?.text?.grey
          }
          onValueChange={(value, id) => {
            setSelectedAutopart(id);
            // Add to selected autoparts if not already selected
            if (!selectedAutoparts.some(part => part.id === id)) {
              setSelectedAutoparts(prev => [
                ...prev,
                {id, value, key: prev.length},
              ]);
            }
            setSelectedAutopart('');
          }}
          dynamicData={Autoparts}
        />
        <TouchableOpacity
          style={styles.addmore}
          onPress={() => navigation.navigate(routes.main.addautopartrecord)}>
          <MyIcons name={'add'} size={15} />
          <CustomText
            text="Add New Autopart"
            font={fonts.benzin.regular}
            size={font.medium}
            color={colors.text.red}
            style={{marginTop: 5}}
          />
        </TouchableOpacity>
        <InputField
          label="Current Car Mileage"
          placeholder="Enter Mileage"
          keyboardType={'numeric'}
          value={values.currentCarMileage}
          onChangeText={handleChange('currentCarMileage')}
          onBlur={handleBlur('currentCarMileage')}
          errors={touched.currentCarMileage && errors.currentCarMileage}
        />
        <InputField
          label="Estimated Repair Cost ($)"
          placeholder="Enter Repair Cost"
          keyboardType={'numeric'}
          value={values.estimatedRepairCost}
          onChangeText={handleChange('estimatedRepairCost')}
          onBlur={handleBlur('estimatedRepairCost')}
          errors={touched.estimatedRepairCost && errors.estimatedRepairCost}
        />
        <InputField
          label="Actual Labor Cost ($)"
          placeholder="Enter Labor Cost"
          keyboardType={'numeric'}
          value={values.laborCost}
          onChangeText={handleChange('laborCost')}
          onBlur={handleBlur('laborCost')}
          errors={touched.laborCost && errors.laborCost}
        />
        <InputField
          label="Repair Parts ($)"
          placeholder="Enter Repair Parts Cost"
          keyboardType={'numeric'}
          value={values.repairPartsCost}
          onChangeText={handleChange('repairPartsCost')}
          onBlur={handleBlur('repairPartsCost')}
          errors={touched.repairPartsCost && errors.repairPartsCost}
        />
        <InputField
          label="Total Repair ($)"
          placeholder="Enter Total Repair Cost"
          keyboardType={'numeric'}
          value={values.totalRepairCost}
          onChangeText={handleChange('totalRepairCost')}
          onBlur={handleBlur('totalRepairCost')}
          errors={touched.totalRepairCost && errors.totalRepairCost}
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
        autopartsLoading ||
        isSubmitting ||
        isAddingRepair ? (
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
      <CustomHeader routeName={routes.main.addrepairrecord} />
      <ScrollView>
        <Formik
          initialValues={{
            currentCarMileage: '',
            estimatedRepairCost: '',
            laborCost: '',
            repairPartsCost: '',
            totalRepairCost: '',
            gallery: [],
            repairDate: '',
            repairs: [''],
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
          }) => {
            LOG('errorserrors', errors);

            return (
              <>
                {FilterInputRender({values, setFieldValue, touched, errors})}
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
          message="Do you want to add another repair record?"
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

export default AddRepairRecord;
