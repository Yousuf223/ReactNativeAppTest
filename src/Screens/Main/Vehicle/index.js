import React, { useState, useCallback, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  View,
  RefreshControl,
  ActivityIndicator,
  Image
} from 'react-native';
import { useFetchVehicleByUserQuery } from '../../../Api/vehiclesApiSlice';
import fonts from '../../../Assets/fonts';
import { MainButtonWithGradient } from '../../../Components/Buttons/MainButton';
import CustomCard from '../../../Components/CustomCard';
import CustomHeader from '../../../Components/CustomHeader';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import { font } from '../../../theme/styles';
import { LOG } from '../../../Utils/helperFunction';
import { showToast } from '../../../Utils/toast';
import styles from '../Home/styles';
import { colors } from '../../../theme/colors';
import { useFocusEffect } from '@react-navigation/native';
import { appImages } from '../../../Assets/Images';

const { width, height } = Dimensions.get('screen');

const Vehicle = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, isFetching, error, refetch } =
    useFetchVehicleByUserQuery();

  // Log only in development
  LOG('Vehicle-data', data);
  LOG('Vehicle-error', error);

  useEffect(() => {
    if (error) {
      showToast(error?.data?.message);
    }
  }, [error]);

  // Pull to refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
      showToast('Refreshed Successfully');
    } catch (err) {
      showToast('Refresh Failed');
      console.error('Refresh Error:', err);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  // Navigation handlers
  const handleVehiclePress = useCallback(
    item => {
      navigation.navigate(routes?.main?.vehicleDetails, { vehicleId: item?._id });
    },
    [navigation],
  );

  const handleAddVehicle = useCallback(() => {
    navigation.navigate(routes?.main?.addVehicles);
  }, [navigation]);

  // const handleAddPart = useCallback(() => {
  //   navigation.navigate(routes?.main?.AddPart);
  // }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  // Loading component
  const LoadingComponent = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <ActivityIndicator size="large" color={colors.theme.secondary} />
      <CustomText
        text="Loading Vehicles..."
        size={font.large}
        font={fonts?.benzin?.regular}
        style={{ marginTop: 10 }}
      />
    </View>
  );

  // Error component
  const ErrorComponent = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <MyIcons name="error" size={100} color="#FF0000" />
      <CustomText
        text="Failed to load vehicles. Please check if you are subscribed"
        size={font.xlarge}
        font={fonts?.benzin?.regular}
        style={{
          color: '#FF0000',
          marginTop: 10,
          textAlign: 'center',
          marginBottom: 25,
        }}
      />
      <MainButtonWithGradient
        title="Retry"
        onPress={refetch}
        style={{ width: width * 0.5 }}
      />
    </View>
  );

  // Empty state component
  const EmptyComponent = () => (
    <View style={{ alignItems: 'center', paddingVertical: 20 }}>
      <MainButtonWithGradient
        title={'Add Vehicle Now'}
        onPress={handleAddVehicle}
      style={{marginTop: 10}}
      />
      {/* <MyIcons name={'noVehicles'} size={370} /> */}
      <Image source={appImages?.errors} style={styles.errorsStyles} resizeMode='cover' />
      <CustomText
        text={'No Vehicles Added'}
        size={font.large}
        font={fonts?.benzin?.regular}
        color={colors.text.altGrey}
        style={{ marginTop: 10 }}
      />
    </View>
  );

  // Vehicles list component
  const VehiclesList = () => (
    <View style={{ width: '100%', gap: 10, paddingBottom: height * 0.18 }}>
      <FlatList
        contentContainerStyle={{
          justifyContent: 'center',
          paddingVertical: 20,
        }}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <CustomCard
            couponCard={true}
            item={item}
            onPress={() => handleVehiclePress(item)}
          />
        )}
        keyExtractor={(item, index) => `${item?.id || index}`}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        scrollEnabled={false}
        // ListFooterComponent={
        //   isFetching && !refreshing ? (
        //     <ActivityIndicator
        //       size="small"
        //       color="#4048BF"
        //       style={{ marginVertical: 10 }}
        //     />
        //   ) : null
        // }
      />
      <MainButtonWithGradient
        title={'Add Vehicle'}
        onPress={handleAddVehicle}
      />
      <View style={{marginTop:10}}>
            <MainButtonWithGradient
        title={'Add Part'}
        onPress={()=> navigation.navigate(routes?.main?.AddPart)}
      />
      </View>
    </View>
  );

  return (
    <>
      <CustomHeader
        routeName={routes?.tab.vehicles}
        // onIconPress={() => navigation.navigate(routes.main.notification)}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#4048BF']}
            tintColor="#4048BF"
          />
        }>
        <View style={styles.container}>
          {isLoading ? (
            <LoadingComponent />
          ) : error ? (
            <ErrorComponent />
          ) : data && data.length > 0 ? (
            <VehiclesList />
          ) : (
            <EmptyComponent />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Vehicle;
