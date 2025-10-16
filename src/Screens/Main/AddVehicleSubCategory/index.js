
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator, // Added for loader
} from 'react-native';
import fonts from '../../../Assets/fonts';
import {appImages} from '../../../Assets/Images';
import CustomHeader from '../../../Components/CustomHeader';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {font, spacing} from '../../../theme/styles';
import {vh, vw} from '../../../theme/units';
import {useFetchVehicleTypesQuery} from '../../../Api/vehicleTypesApiSlice';
import {LOG} from '../../../Utils/helperFunction';
import {imageServer} from '../../../Api/configs';

const AddVehicleSubCategory = props => {
  const {vehicleDetails} = props?.route?.params || {};
  LOG('vehicleDetails:"::::::', vehicleDetails);
  const navigation = useNavigation();
  const {data, isLoading, isFetching} = useFetchVehicleTypesQuery(
    vehicleDetails?._id,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  console.log('datadatadatadata', data);
  console.log('isLoading', isLoading);
  console.log('isFetching', isFetching);

  const vehicles = [
    {
      id: '1',
      name: 'Car',
      image: 'carIcon',
      size: 280,
      vehicleStyle: {
        position: 'absolute',
        right: -20,
        zIndex: 999,
        top: -30,
      },
      details: {type: 'Car', capacity: 4, model: 'Sedan', title: ''},
    },
    {
      id: '2',
      name: 'Truck',
      image: 'truckIcon',
      size: 310,
      details: {type: 'Truck', capacity: 2, model: 'Pickup', title: ''},
      vehicleStyle: {
        position: 'absolute',
        right: -25,
        zIndex: 999,
        top: -25,
      },
    },
    {
      id: '3',
      name: 'Semi',
      image: 'tractorIcon',
      size: 270,
      details: {type: 'Semi', capacity: 1, model: 'Agriculture', title: ''},
      vehicleStyle: {
        position: 'absolute',
        right: -30,
        zIndex: 999,
        top: -20,
      },
    },
    {
      id: '4',
      name: 'Tractor',
      image: 'tractorIcon',
      size: 270,
      details: {type: 'Tractor', capacity: 1, model: 'Agriculture', title: ''},
      vehicleStyle: {
        position: 'absolute',
        right: -30,
        zIndex: 999,
        top: -20,
      },
    },
    {
      id: '5',
      name: 'UTV',
      image: 'tractorIcon',
      size: 270,
      details: {type: 'UTV', capacity: 1, model: 'Agriculture', title: ''},
      vehicleStyle: {
        position: 'absolute',
        right: -30,
        zIndex: 999,
        top: -20,
      },
    },
    {
      id: '6',
      name: 'Others',
      image: 'tractorIcon',
      size: 270,
      details: {type: 'Others', capacity: 1, model: 'Agriculture', title: ''},
      vehicleStyle: {
        position: 'absolute',
        right: -30,
        zIndex: 999,
        top: -20,
      },
    },
  ];

  // data.forEach(vehicle => {
  //   LOG(JSON.stringify(vehicle), 'vehiclevehiclevehicle');
  //   return (vehicle.details.title = `Add A ${vehicle.name}`);
  // });

  const handlePress = vehicle => {
    LOG('vehiclevehiclevehiclsse', vehicle);

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

  return (
    <>
      <CustomHeader routeName={routes?.main?.addVehicleSubCategory} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {data?.length > 1 ? (
            data?.map((vehicle, index) => {
              if (!vehicle?.parentId) {
                return null;
              }
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={vehicle._id}
                  onPress={() => handlePress(vehicle)}
                  style={styles.vehicleContainer}>
                  <ImageBackground
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                    source={
                      appImages?.vehicleBG
                      // vehicle?.name === 'Car'
                      //   ? appImages?.categoryCar
                      //   : vehicle?.name === 'Truck'
                      //   ? appImages?.categoryTruck
                      //   : vehicle?.name === 'Utv'
                      //   ? appImages?.categoryUtv
                      //   : vehicle?.name === 'Tractor'
                      //   ? appImages?.categoryTractor
                      //   : vehicle?.name === 'Semi'
                      //   ? appImages?.categorySemi
                      //   : appImages?.categoryCar
                    }>
                    <CustomText
                      text={vehicle.name}
                      color={colors.text.dimBlack}
                      font={fonts.clash.regular}
                      size={font.h5}
                      style={{left: 10}}
                    />
                    <View style={vehicle?.vehicleStyle}>
                      {/* <MyIcons name={vehicle?.image} size={vehicle?.size} /> */}
                      <Image
                        source={{uri: imageServer + vehicle?.image}}
                        style={{height: 200, width: 200}}
                        resizeMode="contain"
                      />
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.loaderContainer}>
              <CustomText
                text="No Vehicle Sub-Category Found"
                color={colors.text.placeholder}
                font={fonts.clash.light}
                size={font.small}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default AddVehicleSubCategory;

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
});
