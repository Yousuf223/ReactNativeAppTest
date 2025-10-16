import {
  Alert,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomHeader from '../../../Components/CustomHeader';
import routes from '../../../Navigation/routes';

import {colors} from '../../../theme/colors';
import {font, spacing} from '../../../theme/styles';
import fonts from '../../../Assets/fonts';
import {FlashList} from '@shopify/flash-list';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import {styles} from '../VehicleDetails/styles';
import {useNavigation} from '@react-navigation/native';
import MyIcons from '../../../Components/MyIcons';
import {vh} from '../../../theme/units';
import {appImages} from '../../../Assets/Images';

const VehicleAutoPart = ({route}) => {
  const navigation = useNavigation();
  const {carDetails, carType, screenType} = route.params;
  console.log('CAR: ', carDetails);
  console.log('CARTYPE: ', carType);
  console.log('scrren: ', screenType);
  const item = carDetails;
  const firstSixDetails = item.slice(0, 6);

  const recentPurchases = [
    {id: '1', name: 'Battery', price: '200.00'},
    {id: '2', name: 'Air Filter', price: '999.00'},
    {id: '3', name: 'Suspension', price: '850.00'},
  ];
  const recentService = [
    {id: '1', name: 'Tuning', price: '200.00'},
    {id: '2', name: 'Wash', price: '999.00'},
    {id: '3', name: 'Interior Polish', price: '850.00'},
  ];
  const BatteryDataRender = ({item}) => {
    return (
      <View style={{marginHorizontal: 5}}>
        <CustomText
          text={item.title}
          color={colors.text.dimBlack}
          size={font.medium}
          font={fonts.benzin.semibold}
        />
        <CustomText
          text={item.detail}
          color={colors.text.dimBlack}
          size={font.small}
          font={fonts.benzin.regular}
        />
      </View>
    );
  };
  const BatteryDetailsRender = () => {
    const mainBatteryDetails = firstSixDetails.slice(
      0,
      firstSixDetails.length - 2,
    );
    return (
      <View style={styles.batterycontainer}>
        <View style={styles.heading}>
          <CustomText
            text={`Vehicle Category: ${carType} `}
            color={colors.text.dimBlack}
            font={fonts.clash.semibold}
            size={font.xxlarge}
          />
          <View style={styles.line} />
        </View>
        <FlashList
          scrollEnabled={false}
          data={mainBatteryDetails}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={BatteryDataRender}
          estimatedItemSize={50}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{height: spacing?.large}} />
          )}
        />
      </View>
    );
  };
  const RecentPurchaseTabRender = () => {
    return (
      <View style={styles.transheadercontainer}>
        <CustomText
          text={screenType === 'Auto' ? 'Auto Part History' : 'Repair History'}
          color={colors.text.dimBlack}
          size={font.large}
          font={fonts.benzin.light}
        />
        <View style={styles.headerline} />
      </View>
    );
  };
  const RecentPurchaseRender = () => {
    return (
      <View style={{width: '100%', paddingVertical: vh * 1}}>
        <FlashList
          scrollEnabled={false}
          data={screenType === 'Auto' ? recentPurchases : recentService}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingVertical: 10}}
          ItemSeparatorComponent={() => (
            <View style={{height: spacing?.mediumh}} />
          )}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.recentpurchase}
              onPress={() => {
                if (screenType === 'Auto') {
                  navigation.navigate(routes.main.autoPartsDetails);
                } else {
                  // navigation.navigate(routes.main.addVehicles)
                  navigation.navigate(routes.main.repairsdetails);
                }
              }}>
              <View style={styles.recentcontainer}>
                <Image
                  source={appImages?.repair}
                  resizeMode="contain"
                  style={{width: '70%', height: '70%'}}
                />
              </View>
              <View style={{marginLeft: 10}}>
                <CustomText
                  text={item.name}
                  color={colors.text.dimBlack}
                  size={font.medium}
                  font={fonts.benzin.semibold}
                />
                <CustomText
                  text={`$${item.price}`}
                  color={colors.text.dimBlack}
                  size={font.medium}
                  font={fonts.benzin.regular}
                />
              </View>
            </TouchableOpacity>
          )}
          estimatedItemSize={50}
        />
      </View>
    );
  };

  return (
    <>
      <CustomHeader routeName={routes?.main?.vehicleAutoPart} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          {BatteryDetailsRender && BatteryDetailsRender()}
          {RecentPurchaseTabRender && RecentPurchaseTabRender()}
          {RecentPurchaseRender && RecentPurchaseRender()}
        </View>
      </ScrollView>
    </>
  );
};

export default VehicleAutoPart;
