//

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator, 
  Image// Added for loader
} from 'react-native';
import fonts from '../../../Assets/fonts';
import { appImages } from '../../../Assets/Images';
import CustomHeader from '../../../Components/CustomHeader';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import { colors } from '../../../theme/colors';
import { font, spacing } from '../../../theme/styles';
import { vh, vw } from '../../../theme/units';
import { useFetchVehicleTypesQuery } from '../../../Api/vehicleTypesApiSlice';
import { LOG } from '../../../Utils/helperFunction';
import { imageServer } from '../../../Api/configs';

const AddVehicles = () => {
  const navigation = useNavigation();
  const { data, isLoading, isFetching } = useFetchVehicleTypesQuery('', {
    refetchOnMountOrArgChange: true,
  });
  console.log('datadatadatadata', data);
  console.log('isLoading', isLoading);
  console.log('isFetching', isFetching);




  const handlePress = vehicle => {
    LOG('vehiclevehiclevehiclsse', vehicle);

    // navigation.navigate(routes.main.addVehicleDetails, {
    //   vehicleDetails: vehicle,
    // });
    navigation.navigate(routes.main.addVehicleDetails, {
      vehicleDetails: vehicle,
    });
  };

  // Show loader when data is loading or fetching
  if (isLoading || isFetching) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.theme.secondary} />
      </View>
    );
  }
console.log('vehiclevehiclevehiclevehicle',data)
  return (
    <>
      <CustomHeader routeName={routes?.main?.addVehicles} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {data?.map((vehicle, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={vehicle._id}
                onPress={() => handlePress(vehicle)}
                style={styles.vehicleContainer}>
                <ImageBackground
                  style={styles?.bgImage}
                  source={
                    appImages?.vehicleBG
                  }>
                  <CustomText
                    text={vehicle.name}
                    color={colors.text.dimBlack}
                    font={fonts.clash.semibold}
                    size={font.xxxlarge}
                    style={{ left: 16, top: 16, position:'absolute'}}
                  />
                  {/* <View style={vehicle?.vehicleStyle}> */}
                    {/* <MyIcons name={vehicle?.image} size={vehicle?.size} /> */}
                    <Image
                      source={{ uri: imageServer + vehicle?.image }}
                      // style={{ height: vehicle.name == "ATV/UTV" ? vh * 32 : vehicle.name == "Semi Tractor" ? vh * 34 : vh * 35, width: vehicle.name == "ATV/UTV" ? vh * 32 :vehicle.name == "Semi Tractor" ? vh * 34 : vh * 35, marginRight: 16 }}

                      style={{height:vh*34, width:vh*34 }}
                      resizeMode="contain"
                    />
                  {/* </View> */}
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
          
        </View>
      </ScrollView>
    </>
  );
};

export default AddVehicles;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.large,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.large,
    gap: spacing.large,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: vw * 2,
  },
  vehicleContainer: {
    height: vh * 26,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors?.theme?.border,
    overflow: 'hidden',

  },
  loaderContainer: {
    // Added loader container style
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage:{
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  }
});
