import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import fonts from '../../../Assets/fonts';
import CustomHeader from '../../../Components/CustomHeader';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {font, spacing} from '../../../theme/styles';
import {vh, vw} from '../../../theme/units';
import {styles} from './styles';
import {useFetchPaymentByUserIDQuery} from '../../../Api/paymentApiSlice';
import {LOG} from '../../../Utils/helperFunction';
import {MainButton} from '../../../Components/Buttons/MainButton';
import ActivityLoader from '../../../Components/ActivityLoader';
const {width, height} = Dimensions?.get('screen');

const MyPurchase = () => {
  const {data, isLoading, isFetching, error, refetch} =
    useFetchPaymentByUserIDQuery();
  LOG('USER DATA: ', data);
  const subscriptionData = data || [];
  LOG('SUBS: ', subscriptionData);
  return (
    <>
      <CustomHeader
        routeName={routes?.main?.mypurchase}
        titleStyle={{width: vw * 70}}
      />
      {isLoading &&  <ActivityLoader color={colors.theme.secondary} />}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {subscriptionData.map(item => (
            <View key={item._id} style={styles.cardContainer}>
              <View style={styles.cardBackground}>
                <View style={styles.cardContent}>
                  <View
                    style={{
                      backgroundColor:
                        item.subscriptionId.planName === 'Personal'
                          ? '#FEEEEE'
                          : item.subscriptionId.planName === 'Enterprise'
                          ? '#DDECFF'
                          : item.subscriptionId.planName === 'Exclusive'
                          ? '#ffeed2'
                          : 'red',
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                    }}
                  />

                  {item.subscriptionId.planName === 'Premium' ? (
                    <View style={{position: 'absolute', right: -5}}>
                      <MyIcons name={'popular'} size={vh * 14} />
                    </View>
                  ) : null}

                  <CustomText
                    text={`${item.subscriptionId.planName} Plan`}
                    size={font.xxlarge}
                    font={fonts?.clash?.semibold}
                    color={colors?.text?.dimBlack}
                    numberOfLines={1}
                    style={{marginTop: vh * 1}}
                  />
                  <CustomText
                    text={`Add ${item.subscriptionId.vehicleLimit} vehicles, their parts and repair`}
                    size={font.medium}
                    font={fonts?.benzin?.regular}
                    color={colors?.text?.red}
                    numberOfLines={1}
                  />
                </View>

                <View style={styles.cardStyle}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: vh * 3,
                    }}>
                    <CustomText
                      text={`$${item.subscriptionId.planCharges}`}
                      size={font.h5}
                      font={fonts?.clash?.bold}
                      color={colors?.text?.dimBlack}
                      numberOfLines={1}
                    />
                    <CustomText
                      text={
                        item.subscriptionId.planType === 'MONTHLY'
                          ? `/ per month`
                          : `/ per year`
                      }
                      size={font.medium}
                      font={fonts?.benzin?.regular}
                      color={colors?.text?.dimBlack}
                      numberOfLines={1}
                      style={{top: vh * 0.8, textAlign: 'flex-Start'}}
                    />
                  </View>
                  <View
                    style={{backgroundColor: 'red', width: '100%', height: vh*6 ,alignItems: 'center', justifyContent :'center'}}>
                    <CustomText
                      text={
                        item?.expiresAt
                          ? `Expire on: ${new Date(
                              item?.createdAt,
                            ).toLocaleDateString()}`
                          : 'Date Not Available'
                      }
                      color={colors.text.white}
                      size={font.large}
                      font={fonts?.benzin.regular}
                      style={{marginLeft: 10}}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default MyPurchase;
