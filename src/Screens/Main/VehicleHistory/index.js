import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomHeader from '../../../Components/CustomHeader';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import {colors} from '../../../theme/colors';
import {font, spacing} from '../../../theme/styles';
import fonts from '../../../Assets/fonts';
import {FlashList} from '@shopify/flash-list';
import {styles} from './styles';
import routes from '../../../Navigation/routes';
import {vh} from '../../../theme/units';

const VehicleHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {vehicleItem, selectedItem} = route.params || {};

  console.log('Vehicle Item2:', vehicleItem);
  const firstSixDetails = vehicleItem?.details.slice(0, 6);
  console.log('Selected Item:', selectedItem);

  const selectedMechanic = selectedItem?.name;

  const BatteryDataRender = ({item}) => {
    return (
      <View>
        <CustomText
          text={item.title}
          color={colors.text.light}
          size={font.medium}
          font={fonts.benzin.regular}
        />
        <CustomText
          text={item.detail}
          color={colors.text.dimBlack}
          size={font.medium}
          font={fonts.benzin.regular}
        />
      </View>
    );
  };
  const BatteryDetailsRender = () => {
    return (
      <View style={styles.batterycontainer}>
        <FlashList
          scrollEnabled={false}
          contentContainerStyle={{padding: 20}}
          data={firstSixDetails}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={BatteryDataRender}
          estimatedItemSize={42}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{height: spacing?.medium}} />
          )}
        />
      </View>
    );
  };

  const RecentPurchaseTabRender = () => {
    const getHeaderText = () => {
      switch (selectedMechanic) {
        case 'Auto Part':
          return 'Auto Parts History';
        case 'Repair':
          return 'Repairs History';
        case 'Maintenance':
          return 'Maintenance History';
        case 'Accident':
          return 'Accident History';
        case 'Gas':
          return 'Gas History';
        default:
          return 'Recent Records';
      }
    };
    return (
      <View style={styles.transheadercontainer}>
        <CustomText
          text={getHeaderText()}
          color={colors.text.dimBlack}
          size={vh * 2.4}
          font={fonts.clash.semibold}
        />
      </View>
    );
  };

  const RecentPurchaseRender = () => {
    const recentPurchases = [
      {
        id: '1',
        name: 'Toyota Land Cruiser',
        price: '200.00',
        subname: 'ABC Auto Parts',
      },
      {
        id: '2',
        name: 'Toyota Land Cruiser',
        price: '999.00',
        subname: 'ABC Auto Parts',
      },
      {
        id: '3',
        name: 'Toyota Land Cruiser',
        price: '850.00',
        subname: 'ABC Auto Parts',
      },
    ];
    return (
      <FlashList
        scrollEnabled={false}
        data={recentPurchases}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingVertical: 10}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.recentpurchase}
            onPress={() => {
              if (
                selectedMechanic === 'Auto Part' ||
                selectedMechanic === 'Repair' ||
                selectedMechanic === 'Maintenance'
              ) {
                navigation.navigate(routes.main.autoPartsDetails, {
                  selectedMechanic,
                });
              } else if (
                selectedMechanic === 'Accident' ||
                selectedMechanic === 'Gas'
              ) {
                navigation.navigate(routes.main.repairsdetails, {
                  selectedMechanic,
                });
              } else {
                Alert.alert('Error');
              }
            }}>
            <CustomText
              text={`Car Tuning`}
              color={colors.text.dimBlack}
              size={font.xlarge}
              font={fonts.clash.regular}
              style={{marginLeft: 10}}
            />
            <View style={styles.cardcontainer}>
              <CustomText
                text={item.subname}
                color={colors.text.blueGray}
                size={font.small}
                font={fonts.benzin.regular}
              />
              <View style={styles.border} />
              <CustomText
                text={item.name}
                color={colors.text.blueGray}
                size={font.small}
                font={fonts.benzin.regular}
              />
              <View style={styles.border} />
              <CustomText
                text={`$${item.price}`}
                color={colors.text.blueGray}
                size={font.small}
                font={fonts.benzin.regular}
              />
            </View>
          </TouchableOpacity>
        )}
        estimatedItemSize={42}
      />
    );
  };
  return (
    <>
      <CustomHeader title={`${selectedItem?.name} History`} />
      <ScrollView contentContainerStyle={{gap: 10, paddingBottom: 20}}>
        {BatteryDetailsRender && BatteryDetailsRender()}
        <View style={{marginHorizontal: 20}}>
          {RecentPurchaseTabRender && RecentPurchaseTabRender()}
          {RecentPurchaseRender && RecentPurchaseRender()}
        </View>
      </ScrollView>
    </>
  );
};

export default VehicleHistory;
