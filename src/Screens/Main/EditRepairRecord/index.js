import DateTimePicker from '@react-native-community/datetimepicker';
import React, {memo, useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import fonts from '../../../Assets/fonts';
import CustomHeader from '../../../Components/CustomHeader';
import DropDown from '../../../Components/DropDown';
import InputField from '../../../Components/InputField';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import {appShadow, colors} from '../../../theme/colors';
import {font} from '../../../theme/styles';
import {Vehicle, VehicleMech, VehicleStore} from '../../../Utils/dummyData';
import {styles} from './styles';
import DocumentImagePicker from '../../../Components/ImagePicker/DocumentImagePicker/DocumentImagePicker';

import {MainButton} from '../../../Components/Buttons/MainButton';
import {useNavigation} from '@react-navigation/native';

import ActivityLoader from '../../../Components/ActivityLoader';
import ModalComponent from '../../../Components/ModalComponent';
import CustomDatePicker from '../../../Components/CustomDatePicker';

export const LabelComponent = memo(({label, required}) => (
  <CustomText
    style={styles.label}
    color={colors.text.dimBlack}
    text={
      <>
        {label}
        {required && <CustomText text={' * '} style={styles.asterisk} />}
      </>
    }
    font={fonts.benzin.regular}
  />
));
const EditRepairRecord = () => {
  const navigation = useNavigation();
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedMechanic, setSelectedMechanic] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const sheetRef = useRef(null);
  const handleVisibility = () => setVisible(!visible);
  const onBackdropPress = () => handleVisibility();
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false); // State for disabling the button
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDob(formattedDate);
    }
  };
  const FilterInputRender = () => (
    <View style={styles.barcontainer}>
      <DropDown
        label={'Select Vehicle'}
        placeholder={'Select'}
        textColor={
          selectedVehicle ? colors?.text?.dimBlack : colors?.text?.grey
        }
        onValueChange={setSelectedVehicle}
        dynamicData={Vehicle}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.addmore}
        onPress={() => navigation?.navigate(routes?.main?.addVehicles)}>
        <MyIcons name={'add'} size={15} />
        <CustomText
          text="Add More"
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
        onValueChange={setSelectedStore}
        dynamicData={VehicleStore}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.addmore}
        onPress={() => navigation.navigate(routes.main.addastore)}>
        <MyIcons name={'add'} size={15} />
        <CustomText
          text="Add More"
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
        onValueChange={setSelectedMechanic}
        dynamicData={VehicleMech}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.addmore}
        onPress={() => navigation.navigate(routes.main.addnewmechanic)}>
        <MyIcons name={'add'} size={15} />
        <CustomText
          text="Add New Mechanic"
          font={fonts.benzin.regular}
          size={font.medium}
          color={colors.text.red}
          style={{marginTop: 5}}
        />
      </TouchableOpacity>

      <CustomDatePicker />
    </View>
  );
  const PartDetails = () => {
    return (
      <View style={[styles.barcontainer, {gap: 20}]}>
        <CustomText
          text="Parts Details"
          size={font.xxlarge}
          font={fonts.clash.regular}
          color={colors.text.dimBlack}
          style={{marginBottom: 10, marginLeft: 10}}
        />
        <DropDown
          label={'Enter Repairs'}
          placeholder={'Enter Engine Size'}
          textColor={
            selectedVehicle ? colors?.text?.dimBlack : colors?.text?.grey
          }
          onValueChange={setSelectedVehicle}
          dynamicData={Vehicle}
          style={styles.input}
        />
        <View>
          <View
            style={{
              zIndex: 999,
              left: 35,
              position: 'absolute',
              top: -15,
              backgroundColor: 'white',
              alignItems: 'center',
              paddingHorizontal: 5,
            }}>
            <LabelComponent label={'Auto Parts'} />
          </View>
          <MainButton
            title={'+ Add Auto Parts'}
            style={styles.editbutton}
            textStyle={{color: colors.text.red}}
            onPress={() => {
              navigation?.navigate(routes?.main?.addautopartrecord);
            }}
          />
        </View>
        <InputField
          label="Current Car Mileage"
          placeholder="Enter Mileage"
          keyboardType={'numeric'}
          style={styles.input}
        />
        <InputField
          label="Estimated Repair Cost ($)"
          placeholder="Enter Repair Cost"
          keyboardType={'numeric'}
          style={styles.input}
        />
        <InputField
          label="Actual Labor Cost ($)"
          placeholder="Enter Labor Cost"
          keyboardType={'numeric'}
          style={styles.input}
        />
        <InputField
          label="Repair Parts ($)"
          placeholder="Enter Repair Parts"
          keyboardType={'numeric'}
          style={styles.input}
        />
        <InputField
          label="Total Repair ($)"
          placeholder="Enter Repair Parts"
          keyboardType={'numeric'}
          style={styles.input}
        />

        <DocumentImagePicker
        // label={'Attachments'}
        // required
        />
        {isLoading ? (
          <ActivityLoader color={colors.theme.secondary} />
        ) : (
          <MainButton
            style={styles.submitButton}
            title={'Update Record'}
            disabled={isTaskSuccess}
            onPress={() => {
              setIsTaskSuccess(true);
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                setModalVisible(true); // Show the success modal
              }, 2000);
            }}
          />
        )}
      </View>
    );
  };
  return (
    <>
      <CustomHeader routeName={routes.main.editrepairrecord} />
      <ScrollView>
        {FilterInputRender && FilterInputRender()}
        <View style={styles?.hr} />
        {PartDetails && PartDetails()}
      </ScrollView>
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
        message={`Your record has been updated successfully!`}
        buttonText="Got it"
        onButtonPress={() => {
          setModalVisible(false);
          setTimeout(() => {
            navigation?.goBack();
          }, 1000);
        }}
      />
    </>
  );
};

export default EditRepairRecord;
