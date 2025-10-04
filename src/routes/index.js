// @app
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

// @navigations
import NavService from '../helpers/NavService';

import {
  saveCurrentUserLocation
} from '../redux/actions/appAction';
import AuthNavigation from './Auth/authNavigation';
import AppNavigation from './appStack/userStack'


class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.locationTimeInterval = null;
  }


  
componentDidMount() {
  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  // this.requestNotificationPermission();
  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Message handled in the background!', remoteMessage);
  //   // Perform background tasks or notifications
  // });
  
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 800);
  //   Orientation.lockToPortrait();
  //   loaderStopWithDispatch();
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Toast.show({
  //       text1: remoteMessage?.notification?.body,
  //       text2: remoteMessage?.notification?.body,
  //       type: 'success',
  //       visibilityTime: 3000,
  //     });
  //    console.log('remoteMessageremoteMessage',remoteMessage)
  //   });

  //   return unsubscribe;
  }
  componentWillUnmount() {
    clearInterval(this.locationTimeInterval);
  }



  render() {
    const loggedInUser = this.props?.user;
    // if (Platform.OS === 'ios') {
    //   return (
    //     <View style={styles.container}>
    //      <Splash/>
    //     </View>
    //   );
    // }
    return (
      <NavigationContainer ref={ref => NavService.setTopLevelNavigator(ref)}>

        <View style={styles.container}>

          {/* IF USER PROFILE STORE IS NOT EMPTY */}

          { loggedInUser ? (
            <AppNavigation initialRoute={undefined} />
          ) : (
            // <AppNavigation initialRoute={undefined} />
            <AuthNavigation initialRoute={undefined} />
          )}
          {/* IF USER PROFILE STORE IS EMPTY */}
        </View>
      </NavigationContainer>
    );
  }
}
function mapStateToProps({ authReducer: { user }, appReducer: { socket } }) {
  return {
    user,
    socket,
  };
}
const actions = { saveCurrentUserLocation };
export default connect(mapStateToProps, actions)(MainNavigation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
