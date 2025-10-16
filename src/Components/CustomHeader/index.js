import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Platform, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import routes from '../../Navigation/routes';
import { layout, spacing } from '../../theme/styles';
import styles from './styles';
// import ActivityLoader from '../ActivityLoader';
import TopLeftBackButton from '../Buttons/TopLeftBackButton';
import TopLeftDrawerButton from '../Buttons/TopLeftDrawerButton';
import MyIcons from '../MyIcons';
import CustomText from '../wrappers/Text/CustomText';
import { colors } from '../../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const backButtonRoutes = [
  routes.main.privacyPolicy,
  routes.main.termAndConditions,
  routes.main.setting,
  routes.main.contactUs,
  // routes.main.myProfile,
  routes.main.changePassword,
  routes.main.editProfile,
  routes.main.subscriptionplan,
  routes.main.addVehicles,
  routes.main.addVehicleSubCategory,
  routes.main.mypurchase,
  routes.main.paymentDetails,
  routes.main.notification,
  routes.main.autoPartsDetails,
  routes.main.vehicleDetails,
  routes.main.vehicleAutoPart,
  routes.main.repairsdetails,
  routes.main.addautopartrecord,
  routes.main.addrepairrecord,
  routes.main.addastore,
  routes.main.addnewseller,
  routes.main.addnewmechanic,
  routes.main.editautoparts,
  routes.main.editrepairrecord,
  routes.main.editvechile,
  routes.main.myProfile,
  routes.main.addgasrecord,
  routes.main.editgasrecord,
  routes.main.addaccidentrecord,
  routes.main.editaccidentrecord,
  routes.main.addmaintenancerecord,
  routes.main.editmaintenancerecord,
  routes.main.addtravelrecord,
  routes.main.edittravelrecord,
  routes.main.addheavyequipmentrecord,
  routes.main.editheavyequipmentrecord,
  routes.main.addhomerecord,
  routes.main.edithomerecord,
  routes.main.addsmallequipmentrecord,
  routes.main.editsmallequipmentrecord,
  routes.main.addtoolrecord,
  routes.main.edittoolrecord,
  routes.main.addpetrecord,
  routes.main.editpetrecord,
  routes.main.addvetrecordforpet,
  routes.main.editvetrecordforpet,
  routes.main.addcustomrecord,
  routes.auth.payment,
  routes.auth.subscription,
  routes.main.addDynamicCustomRecords,
  routes.main.createdraft,
  routes.main.draftdetails,
  routes.main.editcustomrecordscategory,
];

const titleRoutes = {
  [routes.main.privacyPolicy]: 'Privacy Policy',
  [routes.main.termAndConditions]: 'Terms & Conditions',
  [routes.main.contactUs]: 'Contact Us',
  [routes.main.myProfile]: 'My Profile',
  [routes?.tab.vehicles]: 'My Vehicles',
  [routes.main.mypurchase]: 'My Subscription',
  [routes.main.changePassword]: 'Change Password',
  [routes.main.editProfile]: 'Edit Profile',
  [routes.main.repairsdetails]: 'Repair Details',
  [routes.main.addautopartrecord]: 'Add Auto Parts',
  [routes.main.addgasrecord]: 'Add Gas Record',
  [routes.main.editgasrecord]: 'Edit Gas Record',
  [routes.main.createdraft]: 'Create Draft',

  //PartsLogger
  // [routes.main.subscriptionplan]: 'Subscription Plan',
  [routes.auth.subscription]: 'Subscription Plan',
  [routes.auth.payment]: 'Payment Details',
  [routes.main.addVehicles]: 'Select Vehicle to Add',
  [routes.main.addVehicleSubCategory]: 'Select Vehicle Sub Category',
  [routes.main.vehicleDetails]: 'Vehicle Details',
  [routes.main.vehicleAutoPart]: 'Vehicle Details',

  [routes.main.subscriptionplan]: 'Subscription',
  [routes.main.paymentDetails]: 'Payment Details',
  [routes.main.notification]: 'Notification',
  [routes.main.autoPartsDetails]: 'Auto Parts Details',
  [routes.tab.addrecords]: 'Dashboard',
  [routes.tab.otherrecord]: 'Other Record',
  [routes.tab.records]: 'Vehicle Records',
  [routes.tab.vehicles]: 'My Vehicles',

  [routes.main.addrepairrecord]: 'Add Repair Record',
  [routes.main.addastore]: 'Add A Store',
  [routes.main.addnewseller]: 'Add New Seller',
  [routes.main.addnewmechanic]: 'Add New Mechanic',
  [routes.main.editautoparts]: 'Edit Auto Parts',
  [routes.main.editrepairrecord]: 'Edit Repair',
  [routes.main.addaccidentrecord]: 'Add Accident Record',
  [routes.main.editaccidentrecord]: 'Edit Accident Record',
  [routes.main.addmaintenancerecord]: 'Add Vehicle Maintenance/History',
  [routes.main.editmaintenancerecord]: 'Edit Maintenance Record',
  [routes.main.addtravelrecord]: 'Add Travel Record',
  [routes.main.edittravelrecord]: 'Edit Travel Record',
  [routes.main.addheavyequipmentrecord]: 'Add Heavy Equipment',
  [routes.main.editheavyequipmentrecord]: 'Edit Heavy Equipment',
  [routes.main.addhomerecord]: 'Add Home Record',
  [routes.main.edithomerecord]: 'Edit Home Record',
  [routes.main.addsmallequipmentrecord]: 'Add Small Equipment',
  [routes.main.editsmallequipmentrecord]: 'Edit Small Equipment',
  [routes.main.addtoolrecord]: 'Add Tool Record',
  [routes.main.edittoolrecord]: 'Edit Tool Record',
  [routes.main.addpetrecord]: 'Add Animal/Pet Record',
  [routes.main.editpetrecord]: 'Edit Animal/Pet Record',
  [routes.main.addvetrecordforpet]: 'Vet Record For Pet',
  [routes.main.editvetrecordforpet]: 'Edit Vet Record',
  [routes.main.addcustomrecord]: 'Add Custom Category',
  [routes.main.addDynamicCustomRecords]: 'Add Dynamic Custom Records',
  [routes.main.draftdetails]: 'Add Draft Details',
  [routes.main.editcustomrecordscategory]: 'Edit Category',
};

const subtitleRoutes = {
  [routes.plan.paymentMethod]:
    'Enter your credit card details to proceed with payment',
};

const getHeaderLeft = (routeName, navigation, title) => {
  // Show the back button if the title prop is present or if the routeName is in backButtonRoutes
  if (title || backButtonRoutes.includes(routeName)) {
    return <TopLeftBackButton />;
  } else if (
    routeName === routes.tab.home ||
    routeName === routes.tab.records ||
    routeName == routes.tab.otherrecord ||
    routeName === routes.tab.vehicles ||
    routeName === routes.tab.media ||
    routeName === routes.tab.calendars ||
    routeName === routes.tab.vehicles ||
    routeName === routes.tab.addrecords
  ) {
    return <TopLeftDrawerButton />;
  } else {
    return null;
  }
};

const GetTitle = ({ routeName, title, color, longtitle }) => {
  // Check for a passed title prop first, then check if the routeName matches the titleRoutes.
  const displayTitle = title || titleRoutes[routeName];

  if (routeName === routes.tab.home) {
    return (
      <View style={[{ gap: spacing.small, flexDirection: 'row' }]}>
        {/* Additional content for the home screen can be added here */}
      </View>
    );
  } else if (displayTitle) {
    return (
      <View style={{ alignSelf: 'center' }}>
        <CustomText
          style={[styles.title]}
          text={displayTitle}
          numberOfLines={2}
          color={color ? color : colors?.text?.dimBlack}
        />
        {/* {subtitleRoutes[routeName] && (
          <CustomText
            style={styles.subTitle}
            text={subtitleRoutes[routeName]}
          />
        )} */}
      </View>
    );
  } else {
    return null;
  }
};

const getHeaderRight = (
  routeName,
  onSubmitPost,
  title,
  isLoading,
  navigate,
  handleReel,
  selectedMessages,
  selectedMessagesDelete,
  handleVisibility,
  onIconPress,
  OnEditPress,
  OnDeletePress,
  disabled,
  longtitle,
) => {
  if (
    routeName == routes.tab.home ||
    routeName == routes.tab.records ||
    routeName == routes.tab.otherrecord ||
    routeName == routes.main.autoPartsDetails ||
    routeName == routes.main.draftdetails ||
    routeName == routes.main.vehicleDetails ||
    routeName == routes.main.repairsdetails ||
    routeName == routes.main.myProfile ||
    routeName == routes.tab.vehicles
  ) {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles?.rightIconWrapper}
          onPress={onIconPress}
          disabled={disabled}>
          {routeName == routes.main.autoPartsDetails ||
            routeName == routes.main.repairsdetails ||
            routeName == routes.main.draftdetails ||
            routeName == routes.main.myProfile ||
            routeName == routes.main.vehicleDetails ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={OnEditPress}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  backgroundColor: colors?.theme?.white,
                  borderRadius: 25,
                  borderColor: colors.text.grey,
                }}>
                <MyIcons name="edit" />
              </TouchableOpacity>
            </View>
          ) : (
            <Ionicons   name="notifications-outline" size={22} color={colors.theme.black}  />
            // <View style={{
            //   right: 25, height: 50, width: 50,backgroundColor:'red'
            // }} />
            // <MyIcons name="notifications" size={50} style={{right: 25}} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
  return null;
};

const CustomHeader = ({
  routeName,
  onSubmitPost,
  title,
  handleReel,
  selectedMessages,
  selectedMessagesDelete,
  onIconPress,
  titleStyle,
  OnEditPress,
  OnDeletePress,
  disabled,
  color,
  longtitle,
}) => {
  const isLoading = false;
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const { goBack, navigate } = useNavigation();
  const navigation = useNavigation();

  const handleVisibility = () => setVisible(!visible);

  return (
    <View>
      <View style={styles.headerContainer}>
        <View
          style={[
            layout.flexRow,
            styles.contentContainer,
            Platform.OS === 'ios' && { marginTop: insets.top },
            // routesWithBigHeader.includes(routeName) && styles.expandedHeader,
          ]}>
          <View style={[layout.flexRow, { justifyContent: 'space-between' }]}>
            {getHeaderLeft(routeName, navigation, title, longtitle)}
            {/* <SpaceLine /> */}
            <View style={[styles.titleContainer, titleStyle]}>
              <GetTitle
                routeName={routeName}
                title={title}
                color={color}
              //   username={profile?.fullName}
              />
            </View>
          </View>
          {getHeaderRight(
            routeName,
            onSubmitPost,
            title,
            isLoading,
            navigate,
            handleReel,
            selectedMessages,
            selectedMessagesDelete,
            handleVisibility,
            onIconPress,
            OnEditPress,
            OnDeletePress,
            disabled,
            longtitle,
          )}
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;
