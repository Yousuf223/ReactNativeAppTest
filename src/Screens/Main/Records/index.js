import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { useFetchVehicleByUserQuery } from '../../../Api/vehiclesApiSlice';
import fonts from '../../../Assets/fonts';
import { MainButton } from '../../../Components/Buttons/MainButton';
import CustomHeader from '../../../Components/CustomHeader';
import DropDown from '../../../Components/DropDown';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import { colors } from '../../../theme/colors';
import { font } from '../../../theme/styles';
import { vh, vw } from '../../../theme/units';
import { ShopData } from '../../../Utils/dummyData';
import { styles } from './styles';

import PaginatedList from '../../../Api/Pagination/List';

import { useDispatch } from 'react-redux';
import { useFetchDraftRecordsByUserQuery } from '../../../Api/draftsApiSlice';
import { useFetchRecordsByUserQuery } from '../../../Api/recordsApiSlice';
import { LOG } from '../../../Utils/helperFunction';

const VehicleParts = [
  // {key: 0, displayValue: 'Auto Parts', apiValue: 'AUTOPART'},
  // {key: 1, displayValue: 'Repair', apiValue: 'REPAIR'},
  // {key: 1, displayValue: 'Maintenance', apiValue: 'MAINTENANCE'},
  { key: 0, displayValue: 'Vehicle Maintenance', apiValue: 'VEHICLE_SERVICE' },
  { key: 1, displayValue: 'Accident', apiValue: 'ACCIDENT' },
  { key: 2, displayValue: 'Gas', apiValue: 'GAS' },
  { key: 3, displayValue: 'Drafts', apiValue: 'DRAFT' },
];

const Records = () => {
  const {
    data,
    isLoading: vehicleLoading,
    isFetching,
    error,
    refetch,
  } = useFetchVehicleByUserQuery();

  const {
    data: draftData,
    isLoading: draftLoading,
    isFetching: draftFetching,
    error: draftError,
    refetch: refetchDrafts,
  } = useFetchDraftRecordsByUserQuery();

  const navigation = useNavigation();
  const ref = useRef();

  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedVehicleID, setSelectedVehicleID] = useState('');
  const [selectedVehicle1, setSelectedVehicle1] = useState('');

  const [selectedStore, setSelectedStore] = useState('');
  const [selectedMechanic, setSelectedMechanic] = useState('');
  const [dob, setDob] = useState('');
  const [endDate, setEndDate] = useState('');
  const [resetKey, setResetKey] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  console.log('selectedMechanic', selectedMechanic);

  let Vehicles = [];
  let vehicleID = '';
  let vehicleName = '';

  if (Array.isArray(data) && data.length > 0) {
    const uniqueMakes = [
      ...new Set(
        data.map(item => ({
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
  LOG('VehiclesVehicles', Vehicles);

  const handleSearch = () => {
    if (!selectedMechanic && !dob) {
      Alert.alert(
        'Empty',
        'All inputs are empty. Please fill at least one input.',
      );
    } else if (selectedMechanic === 'DRAFT' && vehicleID === '') {
      Alert.alert(
        'Missing Vehicle',
        'Please select a vehicle when type is DRAFT.',
      );
      return;
    } else {
      setIsFiltered(true);
      if (selectedMechanic !== 'DRAFT') {
        const newFilters = {
          type: selectedMechanic,
          startDate: dob,
          endDate: endDate,
          vehicleId: vehicleID,
          storeId: '',
        };
        setFilters(newFilters);
        LOG('FILTERS: ', newFilters);
      } else {
        const newFilters = {
          startDate: dob,
          endDate: endDate,
          vehicleId: vehicleID,
          storeId: '',
        };
        setFilters(newFilters);
        LOG('FILTERS: ', newFilters);
      }
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDob(formattedDate);
    }
  };
  const handleClearList = () => {
    setResetKey(Date.now()); // generates a new key every time
  };
  const handleValueChange = value => {
    LOG(':value:::', value);
    // Find the selected item based on the display value
    const selectedPart = VehicleParts.find(part => part.displayValue === value?.value);
    const apiValue = selectedPart ? selectedPart.apiValue : null; // Get the corresponding API value
    // LOG('API Value:', apiValue); // Use this value for your API call

    setSelectedMechanic(apiValue);
    // handleClearList()
  };

  const FilterInputRender = () => {
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const handleEndDateChange = (event, selectedDate) => {
      setShowEndDatePicker(false);
      if (selectedDate) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        setEndDate(formattedDate);
      }
    };

    return (
      <View style={styles.barcontainer}>
        {/* <DropDown
          label={'Vehicle'}
          placeholder={'Select'}
          textColor={
            selectedVehicle ? colors?.text?.dimBlack : colors?.text?.grey
          }
          onValueChange={setSelectedVehicle}
          dynamicData={Vehicle}
          style={{width: vw * 85}}
        /> */}
        <DropDown
          label={'Select Vehicle'}
          placeholder={'Select'}
          textColor={
            selectedVehicle ? colors?.text?.dimBlack : colors?.text?.grey
          }
          // onValueChange={setSelectedVehicle}
          onValueChange={(value, id) => {
            console.log(value,'asdsadsadsa')
            vehicleID = value?.id;
            vehicleName = value?.value;
            console.log('VEHICLE ID: ', vehicleID);
          }}
          dynamicData={Vehicles}
          style={{ width: vw * 85 }}
        />
        {/* {['VEHICLE_SERVICE'].includes(selectedMechanic) && (
          <DropDown
            label={'Shop'}
            placeholder={'Select Shop/Store'}
            textColor={
              selectedVehicle1 ? colors?.text?.dimBlack : colors?.text?.grey
            }
            onValueChange={setSelectedVehicle1}
            dynamicData={ShopData}
            style={{ width: vw * 85 }}
          />
        )} */}
        {selectedMechanic !== "ACCIDENT" && (<>
          <View style={styles.doblabel}>
            <CustomText
              text="Start Date"
              font={fonts.benzin.regular}
              size={font.small}
              color={colors.text.dimBlack}
            />
          </View>
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={() => setShowDatePicker(true)}>
            <CustomText
              text={dob ? dob : 'Start Date'}
              font={fonts.benzin.regular}
              size={font.small}
              color={colors.text.dimBlack}
            />
            <MyIcons name={'calendar'} />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dob ? new Date(dob) : new Date()}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={handleDateChange}
            />
          )}

          <View style={styles.doblabel}>
            <CustomText
              text="End Date"
              font={fonts.benzin.regular}
              size={font.small}
              color={colors.text.dimBlack}
            />
          </View>
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={() => setShowEndDatePicker(true)}>
            <CustomText
              text={endDate ? endDate : 'End Date'}
              font={fonts.benzin.regular}
              size={font.small}
              color={colors.text.dimBlack}
            />
            <MyIcons name={'calendar'} />
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate ? new Date(endDate) : new Date()}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={handleEndDateChange}
            />
          )}
        </>
        )
        }
        <MainButton
          title={'Search'}
          style={styles.searchbutton}
          onPress={handleSearch}
        />
      </View>
    );
  };

  const RecentPurchaseTabRender = () => {
    const getHeaderText = () => {
      switch (selectedMechanic) {
        case 'AUTOPART':
        //   return 'Recent Purchases';
        // case 'REPAIR':
        //   return 'Recent Services';
        case 'VEHICLE_SERVICE':
          return 'Recent Services';
        case 'ACCIDENT':
          return 'Accident Services';
        case 'GAS':
          return 'Gas Details';
        default:
          return 'Recent Records';
      }
    };
    return (
      <View style={styles.transheadercontainer}>
        <CustomText
          text={getHeaderText()}
          color={colors.text.dimBlack}
          size={font.large}
          font={fonts.clash.semibold}
        />
      </View>
    );
  };

  const RecentPurchaseRender = () => {
    return (
      <PaginatedList
        ref={ref}
        resetKey={resetKey}
        fetchData={
          selectedMechanic === 'DRAFT'
            ? useFetchDraftRecordsByUserQuery
            : useFetchRecordsByUserQuery
        }
        scrollEnabled={false}
        payload={{ ...filters, page: 1, limit: 1000 }}
        renderItem={({ item, index }) => {
          LOG('itemitem:::jddj', item);
          LOG('indexindex', index);
          return (
            <TouchableOpacity
              style={[styles.recentpurchase]}
              onPress={() => {
                if (selectedMechanic === 'DRAFT') {
                  navigation.navigate(routes.main.draftdetails, {
                    selectedMechanic,
                    item,
                  });
                } else {
                  navigation.navigate(routes.main.autoPartsDetails, {
                    selectedMechanic,
                    item,
                  });
                }
              }}>
              <CustomText
                text={
                  item?.createdAt
                    ? `Log Created: ${new Date(
                      item?.createdAt,
                    ).toLocaleDateString()}`
                    : 'Date Not Available'
                }
                color={colors.text.dimBlack}
                size={font.large}
                font={fonts.clash.regular}
                style={{ marginLeft: 10 }}
              />
              <View style={styles.cardcontainer}>
                <View style={styles.boundries}>
                  <CustomText
                    text={
                      selectedMechanic === 'AUTOPART'
                        ? item?.partDetails?.partName
                        : selectedMechanic === 'REPAIR'
                          ? item?.store?.storeName
                          : selectedMechanic === 'VEHICLE_SERVICE'
                            ? item?.condition ? `Condition: ${item?.condition}` : `Condition: N/A`
                            : selectedMechanic === 'ACCIDENT'
                              ? item?.location ? `Location: ${item?.location}` : `Location: N/A`
                              : selectedMechanic === 'GAS'
                                ? item?.gallons ? `Gallons: ${item?.gallons}` : `Gallons: N/A`
                                : selectedMechanic === 'DRAFT'
                                  ? `Draft ${index + 1}`
                                  : item?.name // Fallback if no match
                    }
                    color={colors.text.blueGray}
                    size={font.small}
                    font={fonts.benzin.regular}
                    numberOfLines={2}
                  />
                </View>
                <View style={styles.border} />
                <View style={styles.boundries}>
                  <CustomText
                    text={
                      selectedMechanic === 'AUTOPART'
                        ? item?.vehicle?.vehicleDetails?.make
                        : selectedMechanic === 'REPAIR'
                          ? item?.vehicle?.vehicleDetails?.make
                          : selectedMechanic === 'VEHICLE_SERVICE'
                            ? item?.vehicle?.vehicleDetails?.make ? `Make: ${item?.vehicle?.vehicleDetails?.make}` : `Make: N/A`
                            : selectedMechanic === 'ACCIDENT'
                              ? item?.vehicleDetails?.make ? `Make: ${item?.vehicleDetails?.make}` : `Make: N/A`
                              : selectedMechanic === 'GAS'
                                ? item?.vehicleDetails?.make ? `Make: ${item?.vehicleDetails?.make}` : `Make: N/A`
                                : selectedMechanic === 'DRAFT'
                                  ? item?.vehicle?.vehicleDetails?.make
                                  : item?.name // Fallback if no match
                    }

                    color={colors.text.blueGray}
                    size={font.small}
                    font={fonts.benzin.regular}
                    numberOfLines={2}

                  />
                </View>

                <View style={styles.border} />
                <View style={styles.boundries}>
                  <CustomText
                    text={
                      selectedMechanic === 'AUTOPART'
                        ? item?.partDetails?.price ? `Price: $${item?.partDetails?.price}` : `Price: N/A`
                        : selectedMechanic === 'REPAIR'
                          ? item?.repairPartDetails?.totalRepairCost ? `Total Repair Cost: $${item?.repairPartDetails?.totalRepairCost}` : `Total Repair Cost: N\A`
                          : selectedMechanic === 'VEHICLE_SERVICE'
                            ? item?.partsCost == null ? 'Price: N/A' : `Price: $${item?.partsCost}`
                            : selectedMechanic === 'ACCIDENT'
                              ? item?.involvedDriverName ? `Involve Driver Name: $${item?.involvedDriverName}` : 'Involve Driver Name: N/A'
                              : selectedMechanic === 'GAS'
                                ? item?.price ? `Price: $${item?.price}` : `Price: N/A`
                                : selectedMechanic === 'DRAFT'
                                  ? item?.vehicle?.vehicleType
                                  : item?.name // Fallback if no match
                    }
                    color={colors.text.blueGray}
                    size={font.small}
                    font={fonts.benzin.regular}
                    numberOfLines={2}

                  />
                </View>

              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  return (
    <>
      <CustomHeader
        routeName={routes?.tab.records}
        onIconPress={() => navigation.navigate(routes.main.notification)}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <CustomText
          text="Select record to show"
          color={colors.text.dimBlack}
          font={fonts.clash.regular}
          size={font.xlarge}
        />
        <DropDown
          label={'Select'}
          placeholder={'Select Record'}
          textColor={
            selectedMechanic ? colors?.text?.dimBlack : colors?.text?.grey
          }
          onValueChange={handleValueChange} 
          dynamicData={VehicleParts.map(part => ({
            key: part.key,
            value: part.displayValue,
          }))} // Use display values for the dropdown
          style={{
            width: vw * 89,
            marginTop: vh * 3,
          }}
        />
        <FilterInputRender />
        {isFiltered && (
          <View>
            <RecentPurchaseTabRender />
            <RecentPurchaseRender />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Records;
