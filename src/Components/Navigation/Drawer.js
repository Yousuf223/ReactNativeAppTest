import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {colors} from '../../theme/colors';
import {font, spacing} from '../../theme/styles';
import MyIcons from '../MyIcons';

import {vh, vw} from '../../theme/units';
import {MainButton} from '../Buttons/MainButton';

import routes from '../../Navigation/routes';

import {useDispatch, useSelector} from 'react-redux';
import fonts from '../../Assets/fonts';
import {useResetToScreen} from '../../Functions/resetToScreen';
import {clearAuth} from '../../Redux/slices/authSlice';
import {persistor} from '../../Redux/store';
import {getFullName, getImageUrl} from '../../Utils/helperFunction';
import ActivityLoader from '../ActivityLoader';
import ModalComponent from '../ModalComponent';
import CustomText from '../wrappers/Text/CustomText';
import {autopartsApi} from '../../Api/autopartsApiSlice';
import {recordsApi} from '../../Api/recordsApiSlice';
import {gasApi} from '../../Api/gasApiSlice';
import {profileApi} from '../../Api/profileApiSlice';
import {vehicleApi} from '../../Api/vehiclesApiSlice';
import {storeApi} from '../../Api/storeApiSlice';
import {mechanicApi} from '../../Api/mechanicApiSlice';
import {accidentApi} from '../../Api/accidentApiSlice';
import {travelApi} from '../../Api/travelApiSlice';
import {paymentApi} from '../../Api/paymentApiSlice';
import {maintenanceAutopartsApi} from '../../Api/mainteinanceAutopartsApiSlice';
import {equipmentApi} from '../../Api/equipmentApiSlice';
import {petApi} from '../../Api/petApiSlice';
import {vetApi} from '../../Api/vetApiSlice';
import {otherRecordsApi} from '../../Api/otherRecordsApiSlice';
import {draftsApi} from '../../Api/draftsApiSlice';
import {categoryApi} from '../../Api/categoryApiSlice';
import Feather from 'react-native-vector-icons/Feather'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
const {height} = Dimensions.get('screen');

const menuItems = [
  {
    icon: 'premium',
    title: 'My Subscriptions',
    nav: routes?.main?.subscriptionplan,
  },
  {
    icon: 'terms',
    title: 'Terms & Condition',
    nav: routes?.main.termAndConditions,
  },

  {
    icon: 'privacy',
    title: 'Privacy Policy',
    nav: routes?.main?.privacyPolicy,
  },
  {
    icon: 'callPhone',
    title: 'Contact Us',
    nav: routes?.main?.contactUs,
  },
];

const DrawerComp = ({navigation}) => {
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isTaskSuccess, setIsTaskSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {resetToScreen} = useResetToScreen();
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state?.auth?.user || {});
  let profileImage = getImageUrl(userDetails?.image);
  let fullName = getFullName(userDetails?.firstName, userDetails?.lastName);

  const logoutPopRef = useRef(null);
  const helpSuccess = () => {
    if (logoutPopRef.current) {
      logoutPopRef.current.close();
    }
    // dispatch(logoutUser());
  };
  const onNoPress = () => {
    if (logoutPopRef.current) {
      logoutPopRef.current.close();
    }
  };
  const renderItem = ({item, index}) => {
    const {title, icon, nav} = item;
    console.log('nav', nav);
    const handlePress = () => {
      if (title === 'Logout') {
        navigation.closeDrawer();
        setTimeout(() => {
          if (logoutPopRef.current) {
            logoutPopRef.current.open();
          }
        }, 600);
      } else if (item?.browser) {
        navigation.closeDrawer();
        Linking.openURL(item?.browser);
      } else {
        navigation.closeDrawer();
        navigation.navigate(nav);
      }
    };

    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePress}
          style={[styles.menuItem]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.xsmall,
            }}>
            <View
              style={{
                paddingVertical: spacing.small,
                borderWidth: 1.8,
                marginVertical: 8,
                borderRadius: 30,
                padding: vh * 1.15,
                borderColor: colors.theme.black,
              }}>
                {/* {icon} */}
                {/* <Image source={icon} style={{width:16,height:16}} /> */}
              <MyIcons name={icon} size={20} />
            </View>
            <Text style={styles.menuItemText}>{title}</Text>
          </View>
        </TouchableOpacity>
        {item?.title == 'Privacy Policy' && <></>}
        <View style={styles?.hr} />
      </View>
    );
  };
  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.header}
          activeOpacity={0.8}
          onPress={() => navigation.navigate(routes?.main?.myProfile)}>
          <View>
            <Image source={profileImage} style={styles?.profileStyles} />
            {/* <View style={styles?.onlineDot} /> */}
          </View>
          <CustomText
            text={fullName}
            style={{
              fontSize: font?.xxlarge,
              fontFamily: fonts?.benzin.semibold,
              color: colors?.text?.dimBlack,
            }}
          />
        </TouchableOpacity>
        <View style={{marginTop: spacing.medium, gap: spacing.medium}}>
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={menuItems}
            renderItem={renderItem}
            contentContainerStyle={{flexGrow: 1}}
          />
          {isLoading ? (
            <ActivityLoader color={colors.theme.secondary} />
          ) : (
            <MainButton
              title={'Sign out'}
              style={{
                width: vw * 55,
                marginTop: spacing?.medium,
                height: vh * 5.5,
              }}
              disabled={isTaskSuccess}
              onPress={() => {
                setIsTaskSuccess(true);
                setIsLoading(true);
                setTimeout(() => {
                  navigation.closeDrawer();
                  setIsLoading(false);
                  setModalVisible1(true);
                }, 2000);
              }}
            />
          )}
        </View>
        <ModalComponent
          isVisible={isModalVisible1}
          onClose={() => setModalVisible1(false)}
          onPressCross={() => {
            setModalVisible1(false);
            setIsTaskSuccess(false);
          }}
          title="System Message"
          message="Are you sure you want to logout?"
          doublemodal
          buttonText1="No"
          buttonText="Yes"
          onButtonPress={() => {
            setModalVisible1(false);
            setTimeout(async () => {
              dispatch(clearAuth());

              // Use for clear cache of api data
              dispatch(autopartsApi.util.resetApiState());
              dispatch(recordsApi.util.resetApiState());
              dispatch(gasApi.util.resetApiState());
              dispatch(profileApi.util.resetApiState());
              dispatch(vehicleApi.util.resetApiState());
              dispatch(storeApi.util.resetApiState());
              dispatch(mechanicApi.util.resetApiState());
              dispatch(accidentApi.util.resetApiState());
              dispatch(travelApi.util.resetApiState());
              dispatch(maintenanceAutopartsApi.util.resetApiState());
              dispatch(equipmentApi.util.resetApiState());
              dispatch(petApi.util.resetApiState());
              dispatch(vetApi.util.resetApiState());
              dispatch(otherRecordsApi.util.resetApiState());
              dispatch(recordsApi.util.resetApiState());
              dispatch(paymentApi.util.resetApiState());
              dispatch(draftsApi.util.resetApiState());
              dispatch(categoryApi.util.resetApiState());

              // Use for clear asyncStore or localStorage
              await persistor.purge();
              // resetToScreen(0, routes.mainStack.auth);
            }, 550);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default DrawerComp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'RGB(242, 242, 242)',
  },
  header: {
    gap: spacing.medium,
    marginTop: spacing.xxlarge,
    alignSelf: 'flex-start',
  },
  profileName: {
    color: colors.text.dimBlack,
    marginLeft: 10,
  },
  profileEmail: {
    color: colors.white,
    marginLeft: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemText: {
    marginLeft: 10,
    color: colors?.text.dimBlack,
    fontFamily: fonts?.benzin?.regular,
  },
  borderBottom: {
    borderBottomWidth: 0.3,
    borderColor: colors.progressBg,
  },
  profileStyles: {
    height: vw * 16,
    width: vw * 16,
    borderRadius: 100,
  },
  onlineDot: {
    width: vw * 3.5,
    height: vw * 3.5,
    borderRadius: 50,
    backgroundColor: colors?.background?.green,
    position: 'absolute',
    bottom: 0,
    left: 45,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.theme?.lightGray,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
    // marginTop: -20,
  },
});
