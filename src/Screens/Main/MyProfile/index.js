import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React, {useState} from 'react';
import {View} from 'react-native';
import fonts from '../../../Assets/fonts';
import {MainButton} from '../../../Components/Buttons/MainButton';
import CustomHeader from '../../../Components/CustomHeader';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {font, spacing} from '../../../theme/styles';
import {styles} from './styles';
import {appImages} from '../../../Assets/Images';
import {vh} from '../../../theme/units';
import {useSelector} from 'react-redux';
import {getFullName, getImageUrl, LOG} from '../../../Utils/helperFunction';
import {imageServer} from '../../../Api/configs';
import {useFetchPaymentByUserIDQuery} from '../../../Api/paymentApiSlice';
import { Image } from 'react-native';

const MyProfile = () => {
  const navigation = useNavigation();

  const {data, isLoading, isFetching, error, refetch} =
    useFetchPaymentByUserIDQuery();
  LOG('USER DATA: ', data);

  const subscriptionData = data || [];
  LOG('SUBS: ', subscriptionData);

  let userDetails = useSelector(state => state?.auth?.user || {});
  LOG('userDetails: ', userDetails);

  const renderProfileData = [
    {
      label: 'Name',
      labelValue: getFullName(userDetails?.firstName, userDetails?.lastName),
    },
    {label: 'Gender', labelValue: userDetails?.gender},
    {label: 'Email Address', labelValue: userDetails?.email},
    {label: 'Phone Number', labelValue: userDetails?.phone},
  ];

  let userImage = getImageUrl(userDetails?.image);

  const data2 = [
    {
      id: 0,
      type: 'Personal',
      price: '15.00',
      // title: 'Add 2 vehicles, their parts and repair',
      title: 'Personal Plan',
      desciption: 'Add 2 vehicles, their parts and repairs',
      expdate: 'Feb 24,2025',
    },
  ];
  const renderProfile = () => (
    <View style={{alignItems: 'center', paddingVertical: spacing.smallh}}>
      <View
        style={{
          borderRadius: 50,
          borderWidth: 1,
          borderColor: colors.theme.greyAlt2,
        }}>
        <Image source={userImage} style={styles?.profileStyles} />
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <CustomText
        text={item.label}
        color={colors.text.light}
        size={font.medium}
        font={fonts.benzin.regular}
      />
      <CustomText
        text={item.labelValue}
        color={colors.text.dimBlack}
        font={fonts.benzin.regular}
        size={font.small}
      />
    </View>
  );

  return (
    <>
      <CustomHeader
        routeName={routes.main.myProfile}
        OnEditPress={() => navigation.navigate(routes.main.editProfile)}
      />

      {renderProfile && renderProfile()}
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
                  style={{
                    backgroundColor: 'red',
                    width: '100%',
                    height: vh * 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
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
        <View style={styles.contentContainerStyle}>
          <FlashList
            scrollEnabled={false}
            data={renderProfileData}
            renderItem={renderItem}
            estimatedItemSize={42}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={{height: spacing?.large}} />
            )}
          />
        </View>
        <View style={{alignSelf: 'center'}}>
          <MainButton
            title={'Change Password'}
            style={styles.editbutton}
            textStyle={{color: colors.text.white}}
            hideIcon={false}
            onPress={() => {
              navigation?.navigate(routes?.main?.changePassword);
            }}
          />
        </View>
      </View>
    </>
  );
};

export default MyProfile;
