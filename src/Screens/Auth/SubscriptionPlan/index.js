import {Alert, Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import routes from '../../../Navigation/routes';
import {font, spacing} from '../../../theme/styles';
import CustomHeader from '../../../Components/CustomHeader';
import MultiTabbar from '../../../Components/Tabs/MultiTabbar';
import {vh, vw} from '../../../theme/units';
import {colors} from '../../../theme/colors';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import fonts from '../../../Assets/fonts';
import MyIcons from '../../../Components/MyIcons';
import {MainButton} from '../../../Components/Buttons/MainButton';

const {width, height} = Dimensions?.get('screen');

const SubscriptionPlan = ({navigation}) => {
  const data = [
    {id: 0, title: 'Monthly'},
    {id: 1, title: 'Yearly'},
  ];
  const data2 = [
    {
      id: 0,
      type: 'Premium',
      price: '150.00',
      title: 'Add 2 vehicles, their parts and repair',
    },
    {
      id: 1,
      type: 'Personal',
      price: '400.00',
      title: 'Add 5 vehicles, their parts and repair',
    },
    {
      id: 2,
      type: 'Enterprise',
      price: '200.00',
      title: 'Add 10 vehicles, their parts and repair',
    },
  ];

  return (
    <>
      <CustomHeader routeName={routes?.main?.subscriptionplan} />
      <View style={styles.tabContainer}>
        <MultiTabbar labels={data} onPress={id => console.log(id)} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {data2.map(item => (
            <View key={item.id} style={styles.cardContainer}>
              <View style={styles.cardBackground}>
                <View style={styles.cardContent}>
                  <View
                    style={{
                      backgroundColor:
                        item.type === 'Personal'
                          ? '#FEEEEE'
                          : item.type === 'Enterprise'
                          ? '#DDECFF'
                          : item.type === 'Premium'
                          ? '#ffeed2'
                          : 'red',
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                    }}
                  />
                  {item.type === 'Premium' ? (
                    <View
                      style={{
                        position: 'absolute',
                        right: -5,
                      }}>
                      <MyIcons name={'popular'} size={vh * 14} />
                    </View>
                  ) : null}

                  <CustomText
                    text={`${item?.type} Plan`}
                    size={font.xxlarge}
                    font={fonts?.clash?.semibold}
                    color={colors?.text?.dimBlack}
                    numberOfLines={1}
                    style={{marginTop: vh * 1}}
                  />
                  <CustomText
                    text={item?.title}
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
                    }}>
                    <CustomText
                      text={`$${item.price}`}
                      size={font.h5}
                      font={fonts?.clash?.bold}
                      color={colors?.text?.dimBlack}
                      numberOfLines={1}
                    />
                    <CustomText
                      text={`/ per month`}
                      size={font.medium}
                      font={fonts?.benzin?.regular}
                      color={colors?.text?.dimBlack}
                      numberOfLines={1}
                      style={{top: vh * 0.8}}
                    />
                  </View>
                  <MainButton
                    title={'Choose Plan'}
                    style={styles.planbutton}
                    textStyle={{color: colors.text.dimBlack}}
                    hideIcon={true}
                    onPress={() => {
                      navigation?.navigate(routes?.auth?.payment);
                    }}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

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
    transform: [{rotate: '270deg'}],
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
