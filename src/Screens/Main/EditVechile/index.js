
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
import { useEditMutation } from '../../../Api/recordsApiSlice';
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
    console.log('Payload:', payload);
    console.log('New Images:', newImages);
    console.log('Deleted Images:', deletedImages);


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
      <CustomHeader title={`Edit ${vehicleDetails?.vehicleType?.name}`} />
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
            engineOilType: vehicleDetails?.additionalDetails?.engineOilType || '',
            engineCoolantType: vehicleDetails?.additionalDetails?.engineCoolantType || '',
            transmissionFluidType: vehicleDetails?.additionalDetails?.transmissionFluidType || '',
            hasTurboCharger: vehicleDetails?.additionalDetails?.hasTurboCharger?.toString() || '',
            tireSize: vehicleDetails?.additionalDetails?.tireSize || '',
            tirePressure: vehicleDetails?.additionalDetails?.tirePressure?.toString() || '',
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
                      label="Vehicle Category"
                      placeholder="Enter Vehicle Category"
                      required
                      value={values.vehicleType}
                      editable={false}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.vehicleType && errors.vehicleType}
                    />
                    <InputField
                      label={`${vehicleDetails?.vehicleType?.name} Make`}
                      placeholder={`Enter ${vehicleDetails?.vehicleType?.name} Make`}
                      onChangeText={handleChange('make')}
                      onBlur={handleBlur('make')}
                      value={values.make}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.make && errors.make}
                    />
                    <InputField
                      label="Select Model"
                      placeholder="Enter Model"
                      onChangeText={handleChange('model')}
                      onBlur={handleBlur('model')}
                      value={values.model}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.model && errors.model}
                    />
                    <DropDown
                      label={'Select Year'}
                      textColor={
                        values.year ? colors.text.dimBlack : colors.text.grey
                      }
                      placeholder={'Select'}
                      onValueChange={value => setFieldValue('year', value)}
                      dynamicData={year}
                      initialValue={values.year}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.year && errors.year}
                    />
                    <InputField
                      label="Current Mileage"
                      placeholder="Enter Current Mileage"
                      onChangeText={handleChange('carMilage')}
                      onBlur={handleBlur('carMilage')}
                      value={values.carMilage}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.carMilage && errors.carMilage}
                      keyboardType="numeric"
                    />
                    <InputField
                      label="VIN or Serial Number"
                      placeholder="Enter VIN or Serial Number"
                      onChangeText={handleChange('VIN')}
                      onBlur={handleBlur('VIN')}
                      value={values.VIN}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.VIN && errors.VIN}
                    />
                    <CustomDatePicker
                      dateStyle={{ width: vw * 80, marginBottom: vh * 5 }}
                      labelStyle={{ marginLeft: 20 }}
                      date={
                        values.purchaseDate &&
                          !isNaN(new Date(values.purchaseDate))
                          ? new Date(values.purchaseDate)
                          : new Date()
                      }
                      label="Date of Purchase"
                      onDateChange={date =>
                        setFieldValue('purchaseDate', date.toISOString())
                      }
                      errors={touched.purchaseDate && errors.purchaseDate}
                    />
                    <DropDown
                      label={'Warranty'}
                      placeholder={'Select'}
                      textColor={
                        values.warranty
                          ? colors.text.dimBlack
                          : colors.text.grey
                      }
                      onValueChange={(value, id) =>
                        setFieldValue('warranty', value)
                      }
                      dynamicData={Warranty}
                      initialValue={values.warranty}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.warranty && errors.warranty}
                    />
                    <InputField
                      label="Description/Comment"
                      placeholder="Enter Description"
                      multiline={true}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                      style={{ width: vw * 85 }}
                      errors={touched.description && errors.description}
                    />
                  </View>
                </View>

                <View style={styles.hr} />

                <View
                  style={[
                    styles.detailContainer,
                    { paddingHorizontal: spacing.large },
                  ]}>
                  <CustomText
                    text={`Additional Details`}
                    color={colors.text.dimBlack}
                    font={fonts.clash.regular}
                    size={font.xxlarge}
                  />
                  <View style={{ alignItems: 'center', marginTop: vh * 4 }}>
                    <DropDown
                      label={'Fuel Type'}
                      textColor={
                        values.fuel ? colors.text.dimBlack : colors.text.grey
                      }
                      placeholder={'Select'}
                      onValueChange={value =>
                        setFieldValue('fuel', value.toUpperCase())
                      }
                      dynamicData={fuelTypes}
                      initialValue={values.fuel}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.fuel && errors.fuel}
                    />
                    <DropDown
                      label={'Has Turbo/Super Charger'}
                      textColor={
                        values.hasTurboCharger
                          ? colors.text.dimBlack
                          : colors.text.grey
                      }
                      placeholder={'Select'}
                      onValueChange={value =>
                        setFieldValue('hasTurboCharger', value)
                      }
                      dynamicData={[
                        { key: '0', value: 'No' },
                        { key: '1', value: 'Turbo Charger' },
                        { key: '2', value: 'Super Charger' },
                      ]}
                      initialValue={values.hasTurboCharger}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.hasTurboCharger && errors.hasTurboCharger}
                    />
                    <DropDown
                      label={'Transmission Type'}
                      textColor={
                        values.transmissionType
                          ? colors.text.dimBlack
                          : colors.text.grey
                      }
                      placeholder={'Select'}
                      onValueChange={value =>
                        setFieldValue('transmissionType', value)
                      }
                      dynamicData={transmissionTypes}
                      initialValue={values.transmissionType}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={
                        touched.transmissionType && errors.transmissionType
                      }
                    />
                    <InputField
                      label="Transmission Speed"
                      placeholder="Enter Transmission Speed"
                      onChangeText={handleChange('transmissionSpeed')}
                      onBlur={handleBlur('transmissionSpeed')}
                      value={values.transmissionSpeed}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={
                        touched.transmissionSpeed && errors.transmissionSpeed
                      }
                    />
                    <InputField
                      label="Tire Size"
                      placeholder="Enter Tire Size"
                      onChangeText={handleChange('tireSize')}
                      onBlur={handleBlur('tireSize')}
                      value={values.tireSize}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.tireSize && errors.tireSize}
                      keyboardType={'default'}
                    />
                    <InputField
                      label="Engine Size (L)"
                      placeholder="Enter Engine Size"
                      onChangeText={handleChange('engineSize')}
                      onBlur={handleBlur('engineSize')}
                      value={values.engineSize}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.engineSize && errors.engineSize}
                      keyboardType="numeric"
                    />
                    <DropDown
                      label={'Number of Cylinders'}
                      textColor={
                        values.cylinders
                          ? colors.text.dimBlack
                          : colors.text.grey
                      }
                      placeholder={'Select'}
                      onValueChange={value => setFieldValue('cylinders', value)}
                      dynamicData={cylinderOptions}
                      initialValue={values.cylinders}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.cylinders && errors.cylinders}
                    />
                    <InputField
                      label="Recommended Engine Oil Type"
                      placeholder="Enter Recommended Engine Oil Type"
                      onChangeText={handleChange('engineOilType')}
                      onBlur={handleBlur('engineOilType')}
                      value={values.engineOilType}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.engineOilType && errors.engineOilType}
                    />
                    <InputField
                      label="Recommended Engine Coolant Type"
                      placeholder="Enter Recommended Engine Coolant Type"
                      onChangeText={handleChange('engineCoolantType')}
                      onBlur={handleBlur('engineCoolantType')}
                      value={values.engineCoolantType}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={
                        touched.engineCoolantType && errors.engineCoolantType
                      }
                    />
                    <InputField
                      label="Transmission Fluid Type"
                      placeholder="Enter Transmission Fluid Type"
                      onChangeText={handleChange('transmissionFluidType')}
                      onBlur={handleBlur('transmissionFluidType')}
                      value={values.transmissionFluidType}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={
                        touched.transmissionFluidType &&
                        errors.transmissionFluidType
                      }
                    />


                    <DropDown
                      label={'Drivetrain'}
                      textColor={
                        values.driveTrain
                          ? colors.text.dimBlack
                          : colors.text.grey
                      }
                      placeholder={'Select'}
                      onValueChange={value =>
                        setFieldValue('driveTrain', value)
                      }
                      dynamicData={drivetrainTypes}
                      initialValue={values.driveTrain}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.driveTrain && errors.driveTrain}
                    />

                    <InputField
                      label="Tire Pressure"
                      placeholder="Enter Tire Pressure"
                      onChangeText={handleChange('tirePressure')}
                      onBlur={handleBlur('tirePressure')}
                      value={values.tirePressure}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.tirePressure && errors.tirePressure}
                      keyboardType={'numeric'}
                    />
                    <InputField
                      label="Notes"
                      placeholder="Enter Notes"
                      multiline={true}
                      onChangeText={handleChange('notes')}
                      onBlur={handleBlur('notes')}
                      value={values.notes}
                      style={{ width: vw * 85, marginBottom: vh * 5 }}
                      errors={touched.notes && errors.notes}
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
                      <View style={{ marginTop: spacing.medium }}>
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