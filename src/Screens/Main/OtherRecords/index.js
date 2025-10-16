


import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
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
import { styles } from './styles';
import PaginatedList from '../../../Api/Pagination/List';
import { useFetchOtherRecordsByUserQuery } from '../../../Api/otherRecordsApiSlice';
import { useFetchCategoriesQuery } from '../../../Api/categoryApiSlice';

const VehicleParts = [
  { key: 0, displayValue: 'Travel', apiValue: 'TRAVEL', categoryId: '' },
  { key: 1, displayValue: 'Home Appliance', apiValue: 'HOME', categoryId: '' },
  { key: 2, displayValue: 'Heavy Equipment', apiValue: 'HEAVY', categoryId: '' },
  { key: 3, displayValue: 'Small Equipment', apiValue: 'SMALL', categoryId: '' },
  { key: 4, displayValue: 'Tools', apiValue: 'TOOL', categoryId: '' },
  { key: 5, displayValue: 'Pets', apiValue: 'PET', categoryId: '' },
  { key: 6, displayValue: 'Vet Record', apiValue: 'VET', categoryId: '' },
];

const FilterInputRender = ({ dob, setDob, setShowDatePicker, endDate, setEndDate, handleSearch, showDatePicker }) => {
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
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const formattedDate = selectedDate.toISOString().split('T')[0];
              setDob(formattedDate);
            }
          }}
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

      <MainButton
        title={'Search'}
        style={styles.searchbutton}
        onPress={handleSearch}
      />
    </View>
  );
};

const OtherRecords = () => {
  const ref = useRef();
  const navigation = useNavigation();

  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [dob, setDob] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filters, setFilters] = useState({});
  const [categories, setCategories] = useState(VehicleParts);
  console.log('categoriescategoriescategories', categories);
  console.log('selectedMechanicselectedMechanic', selectedMechanic);


  console.log('filtersfiltersfilters', filters);

  const {
    data: customCategory,
    isLoading: categoryLoading,
    isFetching,
    error,
    refetch,
  } = useFetchCategoriesQuery({ refetchOnFocus: true });

  // Merge categories when customCategory changes
  useEffect(() => {
    if (customCategory) {
      const formattedCustom = customCategory.map((item, index) => ({
        key: VehicleParts.length + index,
        displayValue: item.title,
        apiValue: 'CUSTOM',
        categoryId: item._id,
      }));
      setCategories([
        ...VehicleParts,
        ...formattedCustom.filter(
          (custom) => !VehicleParts.some((part) => part.categoryId === custom.categoryId)
        ),
      ]);
    }
  }, [customCategory]);

  const handleSearch = () => {
    if (!selectedMechanic && !dob && !endDate) {
      Alert.alert('Empty', 'Please fill at least one input.');
      return;
    }
    setIsFiltered(true);
    const newFilters = {
      type: selectedMechanic,
      startDate: dob,
      endDate: endDate,
      categoryId: selectedCategoryId
    };
    setFilters(newFilters);
  };

  const handleValueChange = (value, id, value2) => {
    console.log('valuvalue', value);
    console.log('idid', id);
    console.log('value2value2', value2);

    const selectedPart = categories.find((part) => part.displayValue === value?.value);
    const apiValue = selectedPart ? selectedPart.apiValue : null;
    setSelectedMechanic(apiValue);
    setSelectedCategoryId(value2);
    setFilters((prev) => {
      return ({
        ...prev,
        categoryId: value2
      })
    })
  };

  const RecentPurchaseTabRender = () => {
    const getHeaderText = () => {
      switch (selectedMechanic) {
        case 'TRAVEL':
          return 'Travel Logs';
        case 'HOME':
          return 'Home Appliances Logs';
        case 'HEAVY':
          return 'Heavy Equipment Logs';
        case 'SMALL':
          return 'Small Equipment Logs';
        case 'TOOL':
          return 'Tools Logs';
        case 'PET':
          return 'Pets Logs';
        case 'VET':
          return 'Vet Record Logs';
        case 'CUSTOM':
          return 'Custom Records';
        default:
          return 'Recent Records';
      }
    };

    return (
      <View style={styles.transheadercontainer}>
        <CustomText
          text={getHeaderText()}
          color={colors.text.dimBlack}
          size={font.xxlarge}
          font={fonts.clash.regular}
        />
      </View>
    );
  };

  const RecentPurchaseRender = () => {
    const getDisplayText = (item, selectedMechanic) => {
 
      const textMap = {
        TRAVEL: {
          primary: item?.from ? `From: ${item.from}` : 'From: N/A',
          secondary: item?.to ? `To: ${item.to}` : 'To: N/A',
          price: item?.flightExpense ? `Price: $${item.flightExpense}` : 'Price: N/A',
        },
        HOME: {
          primary: item?.equipmentName ? `Equipment: ${item.equipmentName}` : 'Equipment: N/A',
          secondary: item?.purchaseDate
            ? `Purchased on: ${new Date(item.purchaseDate).toLocaleDateString()}`
            : 'Purchased on: N/A',
          price: item?.price ? `Price: $${item.price}` : 'Price: N/A',
        },
        HEAVY: {
          primary: item?.equipmentName ? `Equipment: ${item.equipmentName}` : 'Equipment: N/A',
          secondary: item?.purchaseDate
            ? `Purchased on: ${new Date(item.purchaseDate).toLocaleDateString()}`
            : 'Purchased on: N/A',
          price: item?.price ? `Price: $${item.price}` : 'Price: N/A',
        },
        SMALL: {
          primary: item?.equipmentName ? `Equipment: ${item.equipmentName}` : 'Equipment: N/A',
          secondary: item?.purchaseDate
            ? `Purchased on: ${new Date(item.purchaseDate).toLocaleDateString()}`
            : 'Purchased on: N/A',
          price: item?.price ? `Price: $${item.price}` : 'Price: N/A',
        },
        TOOL: {
          primary: item?.equipmentName ? `Equipment: ${item.equipmentName}` : 'Equipment: N/A',
          secondary: item?.purchaseDate
            ? `Purchased on: ${new Date(item.purchaseDate).toLocaleDateString()}`
            : 'Purchased on: N/A',
          price: item?.price ? `Price: $${item.price}` : 'Price: N/A',
        },
        PET: {
          primary: item?.name ? `Name: ${item.name}` : 'Name: N/A',
          secondary: item?.specie ? `Species: ${item.specie}` : 'Species: N/A',
          price: item?.price ? `Price: $${item.price}` : 'Price: N/A',
        },
        VET: {
          primary: item?.pet?.name ? `Pet Name: ${item.pet.name}` : 'Pet Name: N/A',
          secondary: item?.checkupDate
            ? `Checkup: ${new Date(item.checkupDate).toLocaleDateString()}`
            : 'Checkup: N/A',
          price: item?.payment ? `Price: $${item.payment}` : 'Price: N/A',
        },
        CUSTOM: {
          primary: item?.name ? `Name: ${item.name}` : 'Name: N/A',
          secondary: item?.name ? `Name: ${item.name}` : 'Name: N/A',
          price: item?.price ? `Price: $${item.price}` : 'Price: N/A',
        },
      };

      return textMap[selectedMechanic] || {
        primary: 'Name: N/A',
        secondary: 'N/A',
        price: 'Price: N/A',
      };

    }
    return (
      <PaginatedList
        ref={ref}
        fetchData={useFetchOtherRecordsByUserQuery}
        scrollEnabled={false}
        payload={{ ...filters, page: 1, limit: 20 }}
        renderItem={({ item }) => {
          const { primary, secondary, price } = getDisplayText(item, selectedMechanic);
          return (
            <TouchableOpacity
              style={styles.recentpurchase}
              onPress={() =>
                navigation.navigate(routes.main.autoPartsDetails, {
                  selectedMechanic,
                  item,
                })
              }>
              <CustomText
                text={
                  item?.createdAt
                    ? `Log Created: ${new Date(item.createdAt).toLocaleDateString()}`
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
                    text={primary}
                    color={colors.text.blueGray}
                    size={font.small}
                    font={fonts.benzin.regular}
                    numberOfLines={2}

                  />
                </View>

                <View style={styles.border} />
                <View style={styles.boundries}>

                  <CustomText
                    text={secondary}
                    color={colors.text.blueGray}
                    size={font.small}
                    font={fonts.benzin.regular}
                    numberOfLines={2}
                  />
                </View>

                <View style={styles.border} />
                <View style={styles.boundries}>

                  <CustomText
                    text={price}
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

  if (categoryLoading || isFetching) {
    return (
      <View style={styles.container}>
        <CustomText text="Loading categories..." />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <CustomText text="Error fetching categories. Please try again." />
        <MainButton title="Retry" onPress={refetch} />
      </View>
    );
  }

  return (
    <>
      <CustomHeader
        routeName={routes?.tab.otherrecord}
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
          textColor={selectedMechanic ? colors?.text?.dimBlack : colors?.text?.grey}
          onValueChange={handleValueChange}
          dynamicData={categories.map((part) => ({
            key: part.key,
            value: part.displayValue,
            categoryId: part.categoryId,
          }))}
          style={{
            width: vw * 89,
            marginTop: vh * 3,
          }}
        />
        <FilterInputRender
          dob={dob}
          setDob={setDob}
          setShowDatePicker={setShowDatePicker}
          endDate={endDate}
          setEndDate={setEndDate}
          handleSearch={handleSearch}
          showDatePicker={showDatePicker}
        />
        {isFiltered && (
          <>
            <RecentPurchaseTabRender />
            <RecentPurchaseRender />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default OtherRecords;