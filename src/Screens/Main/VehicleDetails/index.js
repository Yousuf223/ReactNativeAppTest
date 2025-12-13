import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  useDeleteMutation,
  useFetchVehicleByIdQuery,
} from '../../../Api/vehiclesApiSlice';
import fonts from '../../../Assets/fonts';
import CustomHeader from '../../../Components/CustomHeader';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import {
  extractFileName,
  formatDate,
  getImageUrl,
  LOG,
} from '../../../Utils/helperFunction';
import { colors } from '../../../theme/colors';
import { font, spacing } from '../../../theme/styles';
import { vh, vw } from '../../../theme/units';
import MyIcons from '../../../Components/MyIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  Image as ImageCompressor,
  Video as VideoCompressor,
} from 'react-native-compressor';
import { MainButton } from '../../../Components/Buttons/MainButton';
import ActivityLoader from '../../../Components/ActivityLoader';
const { width, height } = Dimensions.get('window');
const carouselHeight = height * 0.35;

const VehicleDetails = ({ route, navigation }) => {
  const { vehicleId } = route.params || {};
  const {
    data: vehicle,
    isLoading,
    error,
    refetch,
  } = useFetchVehicleByIdQuery(vehicleId, { refetchOnFocus: true, refetchOnMountOrArgChange: true, refetchOnReconnect: true });
  LOG('vehicle::', vehicle?.gallery);

  const [
    deleteVehicle,
    { isLoading: deleteLoading, isError: deleteIsError, error: deleteError },
  ] = useDeleteMutation();
  //New work
  const [activeSlide, setActiveSlide] = useState(0);
  const [profileImages, setProfileImages] = useState([]);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  const renderItem = ({ item, index }) => {
    LOG('___item___::', item);
    let imgSrc = getImageUrl(item);
    console.log('imgSrc', imgSrc);

    return (
      <View style={styles.card}>
        <Image
          source={imgSrc}
          style={styles.image}
          resizeMode={Image.resizeMode.cover}
        />
      </View>
    );
  };
  const handleDelete = async () => {
    // try {
    //   await deleteVehicle(vehicleId).unwrap();
    //   LOG('Vehicle deleted successfully');
    //   // Optionally navigate back or refresh the vehicle list
    //   navigation.goBack();
    // } catch (err) {
    //   LOG('Delete error:', err);
    //   // Show error toast or alert
    // }

    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this vehicle?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteVehicle(vehicleId).unwrap();
              LOG('Vehicle deleted successfully');
              // Optionally navigate back or refresh the vehicle list
              navigation.goBack();
            } catch (err) {
              LOG('Delete error:', err);
              // Show error toast or alert
              Alert.alert('Error', 'Failed to delete vehicle. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.theme?.secondary} />
      </View>
    );
  }

  const onImageChange = (imagePaths, mime, type) => {
    console.log('Selected Images:', imagePaths);
    console.log('Selected mime:', mime);
    console.log('Selected type:', type);

    // if (profileImages.length + imagePaths.length > MAX_IMAGES) {
    //   Alert.alert(
    //     'Limit Reached',
    //     `You can only upload up to ${MAX_IMAGES} images.`,
    //   );
    //   return;
    // }

    // const newImages = imagePaths.map(path => {
    //   let img = extractFileName(path);
    //   return {
    //     uri: path,
    //     type: mime,
    //     name: img,
    //   };
    // });
    // const updatedImages = [...profileImages, ...newImages];

    // setProfileImages(updatedImages);
    // console.log('updatedImages', updatedImages);
    // if (handleImage) handleImage(updatedImages);
    let img = extractFileName(imagePaths[0]);
    let updatedImages = {
      uri: imagePaths[0],
      type: mime,
      name: img,
    };

    console.log('updatedImages', updatedImages);

    if (updatedImages) {
      navigation.navigate(routes.main.createdraft, {
        image: updatedImages,
        vehicleId: vehicleId,
      });
    }
  };
  const handleCamera = () => {
    ImageCropPicker.openCamera({
      mediaType: 'photo',
    }).then(async image => {
      // actionSheetRef.current.hide();
      const result = await ImageCompressor.compress(image.path, {
        maxHeight: 400,
        maxWidth: 400,
        quality: 1,
      });
      onImageChange([result], image.mime, 'photo'); 
    });
  };
console.log('vehiclevehicle',vehicle)
const labelProps = {
  color: colors.text.placeholder,
  font: fonts.benzin.light,
  size: font.medium,
};

const valueProps = {
  color: colors.text.dimBlack,
  font: fonts.benzin.regular,
  size: font.medium,
};

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            position: 'absolute',
            right: 0,
            zIndex: 999,
            top: 10,
            left: 0,
          }}>
          <CustomHeader
            color={colors?.theme?.white}
            routeName={routes?.main?.vehicleDetails}
            disabled={true}
            OnEditPress={() =>
              navigation.navigate(routes.main.editvechile, { vehicle })
            }
          />
        </View>
       
            {/* <View style={styles.card}>
        <Image
          source={vehicle?.gallery[0]}
          style={styles.image}
          // resizeMode={Image.resizeMode.cover}
        />
      </View> */}
        {/* <Carousel
          data={
            vehicle?.gallery.length > 0
              ? vehicle?.gallery
              : ['https://dummyimage.com/600x400/cccccc/000000.jpg']
          }
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width * 1}
          sliderHeight={carouselHeight}
          itemHeight={carouselHeight}
          autoPlay={false}
          onSnapToItem={index => setActiveSlide(index)}
        /> */}
        {/* <Pagination
          dotsLength={vehicle?.gallery?.length || 0}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        /> */}
      </View>
      <ScrollView
        style={{
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          position: 'relative',
          // top: 20,
          marginBottom: -20,
          marginTop:'23%'
        }}>
        <View
          style={{
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            backgroundColor: 'white',
            paddingVertical: spacing.medium,
            paddingHorizontal: spacing.medium,
          }}>
          {(vehicle?.vehicleDetails?.make ||
            vehicle?.vehicleDetails?.model) && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <CustomText
                  text={`${vehicle?.vehicleDetails?.make || ''} ${vehicle?.vehicleDetails?.model || ''
                    }`.trim()}
                  color={colors.text.dimBlack}
                  font={fonts.clash.regular}
                  size={font.xxxlarge}
                />
                <TouchableOpacity
                  style={{ padding: 5, right: 10 }}
                  onPress={handleCamera}>
                  <MyIcons name={'cameras'} size={25} />
                </TouchableOpacity>
              </View>
            )}

                <MainButton
            title={'Add Parts'}
                   hideIcon={true}
            onPress={() =>
              navigation.navigate(routes.main.AddPart, {
                vehicleIdPrefilled: vehicle?._id,
              })
            }
            style={{ width:130,height:44,marginVertical:10 }}
          />
          <View style={{flexDirection:"row",justifyContent:'space-between'}}>
           {deleteLoading ? (
            <ActivityLoader
              style={{ marginTop: spacing.large}}
              color={colors.theme.secondary}
            />
          ) : (
            <MainButton
              title={'Delete Vehicle'}
              onPress={handleDelete}
              style={{ width:130,height:44}}
              hideIcon={true}
              
            />
            
          )}
          <MainButton
            title={'Part Details'}
            onPress={() => navigation.navigate(routes.main.vehicleMaintenanceDetails, { id: vehicle?._id })}
            style={{width:123,height:44}}
                   hideIcon={true}
          />
          </View>
    
          <View style={styles.separator} />

          <View>
            <View style={styles.row}>
              <View style={styles.column}>
                <CustomText
                  text="Make"
                  color={colors.text.placeholder}
                  font={fonts.benzin.light}
                  size={font.medium}
                />
                <CustomText
                  text={vehicle?.vehicleDetails?.make}
                  color={colors.text.dimBlack}
                  font={fonts.benzin.regular}
                  size={font.medium}
                />
              </View>
              <View style={styles.column}>
                <CustomText
                  text="Model"
                  color={colors.text.placeholder}
                  font={fonts.benzin.light}
                  size={font.medium}
                />
                <CustomText
                  text={vehicle?.vehicleDetails?.model}
                  color={colors.text.dimBlack}
                  font={fonts.benzin.regular}
                  size={font.medium}
                />
              </View>
            </View>

            <View style={styles.row}>
             <View style={styles.column}>
                <CustomText
                  text="Has Turbo/Super Charger"
                  color={colors.text.placeholder}
                  font={fonts.benzin.light}
                  size={font.medium}
                />
                <CustomText
                  text={vehicle?.additionalDetails?.turboCharger ? 'Yes' : 'No'}
                  color={colors.text.dimBlack}
                  font={fonts.benzin.regular}
                  size={font.medium}
                />
              </View>
            <View style={styles.column}>
                <CustomText
                  text="Year"
                  color={colors.text.placeholder}
                  font={fonts.benzin.light}
                  size={font.medium}
                />
                <CustomText
                  text={vehicle?.vehicleDetails?.year}
                  color={colors.text.dimBlack}
                  font={fonts.benzin.regular}
                  size={font.medium}
                />
              </View>
            </View>

            <View style={styles.row}>
         
              <View style={styles.column}>
                <CustomText
                  text="Description"
                  color={colors.text.placeholder}
                  font={fonts.benzin.light}
                  size={font.medium}
                />
                <CustomText
                  text={vehicle?.vehicleDetails?.description}
                  color={colors.text.dimBlack}
                  font={fonts.benzin.regular}
                  size={font.medium}
                />
              </View>
                     <View style={styles.column}>
                <CustomText
                  text="Transmission"
                  color={colors.text.placeholder}
                  font={fonts.benzin.light}
                  size={font.medium}
                />
                <CustomText
                  text={
                    vehicle?.additionalDetails?.transmissionType
                      ? vehicle?.additionalDetails?.transmissionType
                      : 'N/A'
                  }
                  color={colors.text.dimBlack}
                  font={fonts.benzin.regular}
                  size={font.medium}
                />
              </View>
             
            </View>
               <View style={styles.column}>
                <CustomText
                  text="Engine Oil"
                  color={colors.text.placeholder}
                  font={fonts.benzin.light}
                  size={font.medium}
                />
                <CustomText
                  text={
                    vehicle?.additionalDetails?.engineOilType
                      ? vehicle?.additionalDetails?.engineOilType
                      : 'N/A'
                  }
                  color={colors.text.dimBlack}
                  font={fonts.benzin.regular}
                  size={font.medium}
                />
              </View>
          </View>
   
    
       
{vehicle?.vehicleType?.name === 'CAR / Motorcycle' && (
  <>
    <View style={styles.row}>
      <View style={styles.column}>
        <CustomText text="Fuel" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.fuel || 'N/A'} {...valueProps} />
      </View>

      <View style={styles.column}>
        <CustomText text="Drivetrain" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.driveTrain || 'N/A'} {...valueProps} />
      </View>
    </View>

    <View style={styles.row}>
      <View style={styles.column}>
        <CustomText text="Cylinders" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.cylinders || 'N/A'} {...valueProps} />
      </View>

      <View style={styles.column}>
        <CustomText text="Engine Size (L)" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.engineSize || 'N/A'} {...valueProps} />
      </View>
    </View>

    <View style={styles.row}>
      <View style={styles.column}>
        <CustomText text="Tire Size" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.tireSize || 'N/A'} {...valueProps} />
      </View>

      <View style={styles.column}>
        <CustomText text="Tire Pressure" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.tirePressure || 'N/A'} {...valueProps} />
      </View>
    </View>
  </>
)}

     {vehicle?.vehicleType?.name === 'Semi Truck / Truck' && (
  <>
    <View style={styles.row}>
      <View style={styles.column}>
        <CustomText text="Engine" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.engine || 'N/A'} {...valueProps} />
      </View>

      <View style={styles.column}>
        <CustomText text="Change Oil Every (Miles)" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.changeOilEvery || 'N/A'} {...valueProps} />
      </View>
    </View>

    <View style={styles.row}>
      <View style={styles.column}>
        <CustomText text="Miles at Last Oil Change" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.mileage || 'N/A'} {...valueProps} />
      </View>

      <View style={styles.column}>
        <CustomText text="Next Oil Change" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.nextOilChange || 'N/A'} {...valueProps} />
      </View>
    </View>
  </>
)}
{['Heavy Equipment', 'Farm and Ranch', 'ATV /UTV / Boat'].includes(vehicle?.vehicleType?.name) && (
  <>
    <View style={styles.row}>
      <View style={styles.column}>
        <CustomText text="Type" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.type || 'N/A'} {...valueProps} />
      </View>

      <View style={styles.column}>
        <CustomText text="Engine" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.engine || 'N/A'} {...valueProps} />
      </View>
    </View>

    <View style={styles.row}>
      <View style={styles.column}>
        <CustomText text="Hours" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.hours || 'N/A'} {...valueProps} />
      </View>

      <View style={styles.column}>
        <CustomText text="Next Oil Change (Hours)" {...labelProps} />
        <CustomText text={vehicle?.additionalDetails?.nextHours || 'N/A'} {...valueProps} />
      </View>
    </View>
  </>
)}

        </View>
      </ScrollView>
    </View>
  );
};

export default VehicleDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    width: width,
    height: carouselHeight,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    paddingVertical: 8,
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: colors.theme?.secondary,
  },
  inactiveDotStyle: {
    backgroundColor: colors.theme.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.medium,
    paddingVertical: spacing.small,
  },
  column: {
    flex: 2,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: colors.theme?.lightGray,
    marginVertical: spacing.small,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: vw * 10,
    borderRadius: vh * 10,
    width: vw * 10,
    backgroundColor: colors?.theme?.white,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#E8E6EA',
  },
});
