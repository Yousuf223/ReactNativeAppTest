import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import routes from '../../../Navigation/routes';
import { font, spacing } from '../../../theme/styles';
import CustomHeader from '../../../Components/CustomHeader';
import MultiTabbar from '../../../Components/Tabs/MultiTabbar';
import { vh, vw } from '../../../theme/units';
import { colors } from '../../../theme/colors';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import fonts from '../../../Assets/fonts';
import MyIcons from '../../../Components/MyIcons';
import { MainButton } from '../../../Components/Buttons/MainButton';
import {
  useFetchPaymentByUserIDQuery,
  useFetchPaymentByUserQuery,
} from '../../../Api/paymentApiSlice';
import { LOG } from '../../../Utils/helperFunction';
import ActivityLoader from '../../../Components/ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { executeApiRequest } from '../../../Api/methods/method';
import { useAddMutation } from '../../../Api/vehiclesApiSlice';
const { width, height } = Dimensions?.get('screen');


const SubscriptionPlan = ({ navigation,route }) => {
  const { data, isLoading, isFetching, error, refetch } =
    useFetchPaymentByUserQuery({ refetchOnMountOrArgChange: true });

  const {
    data: IsPaymentData,
    isLoading: isPaymentLoading,
    isFetching: isPaymentFetching,
    error: isPaymentError,
    refetch: isPaymentRefetch,
  } = useFetchPaymentByUserIDQuery();
  const { subscriptionId, payload, from } = route.params || {};
  const [add] = useAddMutation();
console.log('payload',payload)
  const handlePaymentSuccess = async () => {
    try {
      // 1️⃣ Mark payment as done
      await AsyncStorage.setItem('AddPayment', 'true');
      if (from === 'AddVehicleDetails' && payload) {
        const response = await executeApiRequest({
          apiCallFunction: add,
          body: payload,
          formData: true,
          toast: true,
          timeout: 30000,
        });

        if (response) {
        navigation?.pop(2)
        }
      } else {
        // Otherwise just go back to home or confirmation
        navigation?.navigate(routes?.main?.paymentDetails, {
          subscriptionId: item?._id,
        });
      }
    } catch (err) {
      console.error('Payment handling error:', err);
    }
  };



  const [selectedPlanType, setSelectedPlanType] = useState('MONTHLY');

  const subscriptionData = data?.data || [];

  // Filtered plans by selected tab
  const filteredPlans = subscriptionData.filter(
    item => item.planType === selectedPlanType,
  );

  const data3 = [
    { id: 0, title: 'Monthly' },
    { id: 1, title: 'Yearly' },
  ];

  return (
    <>
      <CustomHeader routeName={routes?.main?.subscriptionplan} />
      <View style={styles.tabContainer}>
        <MultiTabbar
          labels={data3}
          onPress={id => {
            const planType = id === 0 ? 'MONTHLY' : 'YEARLY';
            setSelectedPlanType(planType);
          }}
        />
      </View>

      {isLoading && <ActivityLoader color={colors.theme.secondary} />}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {filteredPlans.map(item => {
            console.log('itemdkjdjkdjk', item);

            return (
              <View key={item._id} style={styles.cardContainer}>
                <View style={styles.cardBackground}>
                  <View style={styles.cardContent}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          backgroundColor:
                            item.planName === 'Personal'
                              ? '#FEEEEE'
                              : item.planName === 'Enterprise'
                                ? '#DDECFF'
                                : item.planName === 'Exclusive'
                                  ? '#ffeed2'
                                  : 'red',
                          width: 22,
                          height: 22,
                          borderRadius: 5,
                        }}
                      />
                      {IsPaymentData &&
                        item._id === IsPaymentData[0]?.subscriptionId?._id && (
                          <MyIcons name={'check'} />
                        )}
                    </View>

                    {item.planName === 'Premium' ? (
                      <View
                        style={{
                          position: 'absolute',
                          right: -5,
                        }}>
                        <MyIcons name={'popular'} size={vh * 14} />
                      </View>
                    ) : null}

                    <CustomText
                      text={`${item?.planName} Plan`}
                      size={font.xxlarge}
                      font={fonts?.clash?.semibold}
                      color={colors?.text?.dimBlack}
                      numberOfLines={1}
                      style={{ marginTop: vh * 1 }}
                    />
                    <CustomText
                      text={`Add ${item?.vehicleLimit} vehicles, their parts and repair`}
                      size={font.medium}
                      font={fonts?.benzin?.regular}
                      color={colors?.text?.red}
                      numberOfLines={1}
                    />
                  </View>

                  <View style={styles.cardStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <CustomText
                        text={`$${item.planCharges}`}
                        size={font.h5}
                        font={fonts?.clash?.bold}
                        color={colors?.text?.dimBlack}
                        numberOfLines={1}
                      />
                      <CustomText
                        text={
                          selectedPlanType === 'MONTHLY'
                            ? `/ per month`
                            : `/ per year`
                        }
                        size={font.medium}
                        font={fonts?.benzin?.regular}
                        color={colors?.text?.dimBlack}
                        numberOfLines={1}
                        style={{ top: vh * 0.8 }}
                      />
                    </View>

                    <MainButton
                      title={'Choose Plan'}
                      style={styles.planbutton}
                      textStyle={{ color: colors.text.dimBlack }}
                      hideIcon={true}
                      onPress={() => {
                        handlePaymentSuccess()

                      }}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

// export default SubscriptionPlan;
export default SubscriptionPlan;

const styles = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: width * 0.12,
    marginTop: vh * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    marginTop: spacing.large,
    alignItems: 'center',
    paddingHorizontal: width * 0.07,
  },
  cardContainer: {
    padding: vh * 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  rotatedLabel: {
    position: 'absolute',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#FF2E00',
    zIndex: 999,
    transform: [{ rotate: '270deg' }],
    left: -vw * 13.5,
    top: vh * 10,
    height: vh * 4,
    width: width * 0.27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBackground: {},
  cardContent: {
    backgroundColor: colors.text.white,
    gap: 5,
    width: vw * 80,
    borderWidth: 2,
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: '#FFDFDF',
  },
  planbutton: {
    width: vw * 65,
    backgroundColor: colors.text.white,
    borderWidth: 1,
    borderColor: colors.background.header,
    alignSelf: 'center',
  },
  cardStyle: {
    backgroundColor: '#FEF8EE',
    padding: vh * 3,
    paddingVertical: vh * 4,
    width: vw * 80,
    gap: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
