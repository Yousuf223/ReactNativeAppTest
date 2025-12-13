
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { executeApiRequest } from '../../../Api/methods/method';
import CustomHeader from '../../../Components/CustomHeader';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import InputField from '../../../Components/InputField';
import DropDown from '../../../Components/DropDown';
import CustomDatePicker from '../../../Components/CustomDatePicker';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';
import ActivityLoader from '../../../Components/ActivityLoader';
import { MainButtonWithGradient } from '../../../Components/Buttons/MainButton';
import ModalComponent from '../../../Components/ModalComponent';
import { useEditMutation } from '../../../Api/vehiclesApiSlice';
import { imageServer } from '../../../Api/configs';
import vehicleValidation from '../AddVehicleDetails/vehicleValidation';
import styles from './styles'
import { font, spacing } from '../../../theme/styles';
import { colors } from '../../../theme/colors';
import { vh, vw } from '../../../theme/units';
import fonts from '../../../Assets/fonts';
import { year } from '../../../Utils/dummyData';
import { cylinderOptions, drivetrainTypes, fuelTypes, transmissionTypes } from '../../../Utils/dropdownItems';

const EditVehicleDetails = ({ route, navigation }) => {
  const vehicleDetails = route?.params?.vehicle;

  const [edit, { isLoading: isEditLoading, isError, error }] = useEditMutation();
 

  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
console.log('vehicleDetails?.recordType',deletedImages)
  const Warranty = [
    { key: '0', value: 'YES', id: 0 },
    { key: '1', value: 'NO', id: 1 },
    // { key: '2', value: 'N/A', id: 2 },
  ];

  const handleSubmitForm = async values => {
    setIsLoading(true);
    let payload = {
      ...values,
      vehicleType: vehicleDetails?.vehicleType?._id,
      hasTurboCharger: values?.hasTurboCharger ? true : false,
      gallery: newImages,
      deletedImages: JSON.stringify(deletedImages),
    };
    console.log('payloadpayload-----',payload)
    try {
      const response = await executeApiRequest({
        apiCallFunction: edit,
        body: payload,
        params: { id: vehicleDetails?._id },
        formData: true,
        toast: true,
        timeout: 30000,
      });
      console.log('Vehicle Update Success:', response);
      setModalVisible(true);
    } catch (error) {
      console.log('Vehicle Update Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const normalizeGallery = gallery => {
    if (!gallery || !Array.isArray(gallery)) {
      return [];
    }
    return gallery.map((item, index) => {
      if (typeof item === 'string') {
        const uri =
          item.startsWith('http') || item.startsWith('file://')
            ? item
            : `${imageServer}${item}`;
        return {
          uri,
          type: 'image/jpeg',
          name: `image${index}.jpg`,
        };
      }
      return item;
    });
  };

  const handleImageChange = (images, removedImage, setFieldValue) => {

    // Ensure images is an array
    console.log('removedImage',removedImage)
    const updatedImages = Array.isArray(images) ? images : [];
    setFieldValue('gallery', updatedImages);
    // Handle removed image
    if (removedImage) {
      setDeletedImages(prev => [...prev, removedImage]);
    }
    // Update newImages (only include images with file:// URI)
    const newImagesList = updatedImages.filter(img => img.uri?.startsWith('file://'));
    console.log('newImagesList', newImagesList);

    setNewImages(newImagesList);
  };

  return (
    <>
      <CustomHeader title={`EDIT`} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <Formik
          initialValues={{
            vehicleType: vehicleDetails?.vehicleType?.name || '',
            make: vehicleDetails?.vehicleDetails?.make || '',
            model: vehicleDetails?.vehicleDetails?.model || '',
            year: vehicleDetails?.vehicleDetails?.year?.toString() || '',
            VIN: vehicleDetails?.vehicleDetails?.VIN || '',
            purchaseDate: vehicleDetails?.vehicleDetails?.purchaseDate
              ? new Date(vehicleDetails.vehicleDetails.purchaseDate).toISOString()
              : new Date().toISOString(),
            description: vehicleDetails?.vehicleDetails?.description || '',
            warranty: vehicleDetails?.vehicleDetails?.warranty || 'NO',
            engineSize: vehicleDetails?.additionalDetails?.engineSize?.toString() || '',
            fuel: vehicleDetails?.additionalDetails?.fuel || '',
            driveTrain: vehicleDetails?.additionalDetails?.driveTrain || '',
            transmissionType: vehicleDetails?.additionalDetails?.transmissionType || '',
            transmissionSpeed: vehicleDetails?.additionalDetails?.transmissionSpeed?.toString() || '',
            carMilage: vehicleDetails?.additionalDetails?.carMilage?.toString() || '',
            notes: vehicleDetails?.additionalDetails?.notes || '',
            gallery: normalizeGallery(vehicleDetails?.gallery) || [],
            cylinders: vehicleDetails?.additionalDetails?.cylinders?.toString() || '',
            engineCoolantType: vehicleDetails?.additionalDetails?.engineCoolantType || '',
            transmissionFluidType: vehicleDetails?.additionalDetails?.transmissionFluidType || '',
            hasTurboCharger: vehicleDetails?.additionalDetails?.hasTurboCharger?.toString() || '',
            tireSize: vehicleDetails?.additionalDetails?.tireSize || '',
            tirePressure: vehicleDetails?.additionalDetails?.tirePressure?.toString() || '',
            turboCharger:vehicleDetails?.additionalDetails?.turboCharger || false,
            transmissionType:vehicleDetails?.additionalDetails?.transmissionType?.toString()|| "",
                engineOilType: vehicleDetails?.additionalDetails?.engineOilType || '',
          }}
          validationSchema={vehicleValidation}
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

            return (
              <View style={styles.container}>
                <View
                  style={[
                    styles.detailContainer,
                    { paddingHorizontal: spacing.large },
                  ]}>
                  <CustomText
                    text={`${vehicleDetails?.vehicleType?.name} Details`}
                    color={colors.text.dimBlack}
                    font={fonts.clash.regular}
                    size={font.xxlarge}
                  />
                  <View style={{ alignItems: 'center', marginTop: vh * 4 }}>
                    <InputField
                      label={`${vehicleDetails?.vehicleType?.name} Make`}
                      placeholder={`Enter ${vehicleDetails?.vehicleType?.name} Make`}
                      onChangeText={handleChange('make')}
                      onBlur={handleBlur('make')}
                      value={values.make}
                      style={{ width: vw * 85, marginBottom: vh * 0 }}
                      errors={touched.make && errors.make}
                    />
             
          
                    <InputField
                        label="Model"
                        placeholder="Enter Model"
                        onChangeText={handleChange('model')}
                        onBlur={handleBlur('model')}
                        value={values.model}
                        style={{ width: vw * 85, marginTop: vh * 5 }}
                      />
                            <InputField
                          label="Year"
                        placeholder="Year"
                        onChangeText={handleChange('year')}
                        onBlur={handleBlur('year')}
                        value={values.year}
                        style={{ width: vw * 85, marginTop: vh * 5 }}/>
                  </View>
                </View>

                {/* <View style={styles.hr} /> */}

                <View
                  style={[
                    styles.detailContainer,
                    { paddingHorizontal: spacing.large },
                  ]}>
                  <View style={{ alignItems: 'center', }}>
          
                {vehicleDetails?.vehicleType?.name === 'CAR / Motorcycle' && (
                    <>
                      <InputField
                        label="Engine"
                        placeholder="Enter Engine Info"
                        onChangeText={handleChange('engine')}
                        onBlur={handleBlur('engine')}
                        value={values.engine}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Cylinders"
                        placeholder="Enter Cylinder Type"
                        onChangeText={handleChange('cylinders')}
                        onBlur={handleBlur('cylinders')}
                        value={values.cylinders}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Drive Train"
                        placeholder="FWD / RWD / 4WD / AWD"
                        onChangeText={handleChange('driveTrain')}
                        onBlur={handleBlur('driveTrain')}
                        value={values.driveTrain}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="VIN"
                        placeholder="Enter VIN"
                        onChangeText={handleChange('VIN')}
                        onBlur={handleBlur('VIN')}
                        value={values.VIN}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Plate Number"
                        placeholder="Enter Plate Number"
                        onChangeText={handleChange('plateNumber')}
                        onBlur={handleBlur('plateNumber')}
                        value={values.plateNumber}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Tires"
                        placeholder="Enter Tire Brand/Size"
                        onChangeText={handleChange('tires')}
                        onBlur={handleBlur('tires')}
                        value={values.tires}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Tire Pressure"
                        placeholder="Enter Tire Pressure"
                        onChangeText={handleChange('tirePressure')}
                        onBlur={handleBlur('tirePressure')}
                        value={values.tirePressure}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                    </>
                  )}
          {vehicleDetails?.vehicleType?.name === 'Semi Truck / Truck' && (
                    <>
                      <DropDown
                        label="Type"
                        placeholder="Select Truck Type"
                        onValueChange={value =>
                          setFieldValue('type', value?.value)
                        }
                        dynamicData={[
                          { key: '0', value: 'Semi' },
                          { key: '1', value: 'Box Truck' },
                          { key: '2', value: 'Flatbed Truck' },
                          { key: '3', value: 'Dump Truck' },
                        ]}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                         textColor={ values.year ? colors?.text?.dimBlack : colors?.text?.grey }  
                        errors={touched.year && errors.year}
                      />
                      <InputField
                        label="Engine"
                        placeholder="Enter Engine Info"
                        onChangeText={handleChange('engine')}
                        onBlur={handleBlur('engine')}
                        value={values.engine}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="VIN"
                        placeholder="Enter VIN"
                        onChangeText={handleChange('VIN')}
                        onBlur={handleBlur('VIN')}
                        value={values.VIN}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Oil Must be changed Every"
                        placeholder="Miles"
                        onChangeText={handleChange('changeOilEvery')}
                        onBlur={handleBlur('changeOilEvery')}
                        value={values.changeOilEvery}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                        
                      />
                      <CustomDatePicker
                        label="Last Oil Change Date"
                        dateStyle={{ width: vw * 80, marginBottom: vh * 5 }}
                        date={
                          values.mileageDate ? new Date(values.mileageDate) : null
                        }
                        onDateChange={date =>
                          setFieldValue('mileageDate', date.toISOString())
                        }
                      />
                      <InputField
                        label="Miles at last oil changs"
                        placeholder="Enter Miles"
                        onChangeText={handleChange('mileage')}
                        onBlur={handleBlur('mileage')}
                        value={values.mileage}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Next Due Oil Change"
                      placeholder="Enter Miles"
                        onChangeText={handleChange('nextOilChange')}
                        onBlur={handleBlur('nextOilChange')}
                        value={values.nextOilChange}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                    </>
                  )}

                  {vehicleDetails?.vehicleType?.name === 'Heavy Equipment' && (
                    <>
                      <InputField
                        label="Type"
                        placeholder="e.g. Bulldozer, Loader"
                        onChangeText={handleChange('type')}
                        onBlur={handleBlur('type')}
                        value={values.type}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Engine"
                        placeholder="Enter Engine"
                        onChangeText={handleChange('engine')}
                        onBlur={handleBlur('engine')}
                        value={values.engine}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="VIN"
                        placeholder="Enter VIN"
                        onChangeText={handleChange('VIN')}
                        onBlur={handleBlur('VIN')}
                        value={values.VIN}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Change Oil Every (Hours)"
                        placeholder="Enter interval"
                        onChangeText={handleChange('changeOilEvery')}
                        onBlur={handleBlur('changeOilEvery')}
                        value={values.changeOilEvery}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <CustomDatePicker
                        label="Oil Change Date"
                        dateStyle={{ width: vw * 80, marginBottom: vh * 5,backgroundColor:'#fff' }}
                        date={
                          values.mileageDate ? new Date(values.mileageDate) : null
                        }
                        onDateChange={date =>
                          setFieldValue('mileageDate', date.toISOString())
                        }
                      />
                      <InputField
                        label="Hours"
                        placeholder="Enter Hours"
                        onChangeText={handleChange('hours')}
                        onBlur={handleBlur('hours')}
                        value={values.hours}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Next Oil Change (Hours)"
                        placeholder="Enter Next Oil Change Hours"
                        onChangeText={handleChange('nextHours')}
                        onBlur={handleBlur('nextHours')}
                        value={values.nextHours}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                    </>
                  )}

                  {vehicleDetails?.vehicleType?.name === 'Farm and Ranch' && (
                    <>
                      <InputField
                        label="Type"
                        placeholder="e.g. Farm Tractor, Harvester"
                        onChangeText={handleChange('type')}
                        onBlur={handleBlur('type')}
                        value={values.type}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Engine"
                        placeholder="Enter Engine"
                        onChangeText={handleChange('engine')}
                        onBlur={handleBlur('engine')}
                        value={values.engine}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="VIN"
                        placeholder="Enter VIN"
                        onChangeText={handleChange('VIN')}
                        onBlur={handleBlur('VIN')}
                        value={values.VIN}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Change Oil Every (Hours)"
                        placeholder="Enter interval"
                        onChangeText={handleChange('changeOilEvery')}
                        onBlur={handleBlur('changeOilEvery')}
                        value={values.changeOilEvery}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                        
                      />
                      <CustomDatePicker
                        label="Oil Change Date"
                        dateStyle={{ width: vw * 80, marginBottom: vh * 5,backgroundColor:'#fff' }}
                        date={
                          values.mileageDate ? new Date(values.mileageDate) : null
                        }
                        onDateChange={date =>
                          setFieldValue('mileageDate', date.toISOString())
                        }
                      />
                      <InputField
                        label="Hours"
                        placeholder="Enter Hours"
                        onChangeText={handleChange('hours')}
                        onBlur={handleBlur('hours')}
                        value={values.hours}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                        
                      />
                      <InputField
                        label="Next Oil Change (Hours)"
                        placeholder="Enter Next Oil Change Hours"
                        onChangeText={handleChange('nextHours')}
                        onBlur={handleBlur('nextHours')}
                        value={values.nextHours}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                        
                      />
                    </>
                  )}

                  {vehicleDetails?.vehicleType?.name === 'ATV /UTV / Boat' && (
                    <>
                      <InputField
                        label="Type"
                        placeholder="e.g. Boat, ATV, UTV"
                        onChangeText={handleChange('type')}
                        onBlur={handleBlur('type')}
                        value={values.type}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Engine"
                        placeholder="Enter Engine Info"
                        onChangeText={handleChange('engine')}
                        onBlur={handleBlur('engine')}
                        value={values.engine}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="VIN"
                        placeholder="Enter VIN"
                        onChangeText={handleChange('VIN')}
                        onBlur={handleBlur('VIN')}
                        value={values.VIN}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                      />
                      <InputField
                        label="Change Oil Every (Hours)"
                        placeholder="Enter interval"
                        onChangeText={handleChange('changeOilEvery')}
                        onBlur={handleBlur('changeOilEvery')}
                        value={values.changeOilEvery}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                        
                      />
                      <CustomDatePicker
                        label="Oil Change Date"
                        dateStyle={{ width: vw * 80, marginBottom: vh * 5,backgroundColor:'#fff' }}
                        date={
                          values.mileageDate ? new Date(values.mileageDate) : null
                        }
                        onDateChange={date =>
                          setFieldValue('mileageDate', date.toISOString())
                        }
                      />
                      <InputField
                        label="Hours"
                        placeholder="Enter Hours"
                        onChangeText={handleChange('hours')}
                        onBlur={handleBlur('hours')}
                        value={values.hours}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                        
                      />
                      <InputField
                        label="Next Oil Change (Hours)"
                        placeholder="Enter Next Oil Change Hours"
                        onChangeText={handleChange('nextHours')}
                        onBlur={handleBlur('nextHours')}
                        value={values.nextHours}
                        style={{ width: vw * 85, marginBottom: vh * 5 }}
                        
                      />
                    </>
                  )}

                  {vehicleDetails?.vehicleType?.name === 'Other' && (
                    <InputField
                      label="Description"
                      placeholder="Enter Description"
                      multiline={true}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                    />
                  )}

                   <InputField
                    label="Turbo/Super charger"
                    placeholder="Type & Description"
                    onChangeText={handleChange('turboCharger')}
                    onBlur={handleBlur('turboCharger')}
                    value={values.turboCharger}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                    placeholderTextColor={colors?.text?.grey}
                  />
                        <InputField
                    label="Transmission"
                    placeholder="Type & Description"
                    onChangeText={handleChange('transmission')}
                    onBlur={handleBlur('transmission')}
                    value={values.transmission}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                    placeholderTextColor={colors?.text?.grey}
                  />
                       <InputField
                    label="Engine oil"
                    placeholder="Type & Description"
                    onChangeText={handleChange('engineOilType')}
                    onBlur={handleBlur('engineOilType')}
                    value={values.engineOilType}
                    style={{ width: vw * 85, marginBottom: vh * 5 }}
                    placeholderTextColor={colors?.text?.grey}
                  />
                       <InputField
                      label="Comments"
                      placeholder="Enter Comments"
                      multiline={true}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                    />
                    <DocumentImagePicker
                      handleImage={(images, removedImage) =>
                        handleImageChange(images, removedImage, setFieldValue)
                      }
                      initialImages={values.gallery}
                      errors={touched.gallery && errors.gallery}
                      label="Vehicle Images"
                    />
                    {isLoading ? (
                      <ActivityLoader
                        style={{ marginTop: spacing.medium }}
                        color={colors.theme.secondary} />
                    ) : (
                      <View style={{ marginTop: spacing.medium ,marginBottom:20}}>
                        <MainButtonWithGradient
                          title={'Update Vehicle'}
                          onPress={handleSubmit}
                          style={{ width: vw * 80, alignSelf: 'center' }}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>

        <ModalComponent
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onPressCross={() => {
            setModalVisible(false);
            setTimeout(() => {
              navigation?.pop(2);
            }, 1000);
          }}
          title={`${vehicleDetails?.vehicleType?.name} Updated`}
          message={`You have successfully updated your ${vehicleDetails?.vehicleType?.name?.toLowerCase()}!`}
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

export default EditVehicleDetails;