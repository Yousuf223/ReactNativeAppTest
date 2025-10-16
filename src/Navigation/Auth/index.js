import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPassword from '../../Screens/Auth/ForgotPassword';
import LoginScreen from '../../Screens/Auth/Login';
import SignupScreen from '../../Screens/Auth/SignUp';
import routes from '../routes';
import AppStarter from '../../Screens/AppStatrter';
import AgeCreation from '../../Screens/Auth/AgeCreation';
import GenderSelection from '../../Screens/Auth/GenderSelection';
import HeightCreation from '../../Screens/Auth/HeightCreation';
import WeightCreation from '../../Screens/Auth/WeightCreation';
import PaymentDetails from '../../Screens/Auth/PaymentDetails';
import SubscriptionPlan from '../../Screens/Auth/SubscriptionPlan';
import {reduxStorage} from '../../Redux/mmkv';
import {LOG} from '../../Utils/helperFunction';
import WelcomeScreen from '../../Screens/Auth/WelcomeScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const Auth = () => {
  const [isStarter, setIsStarter] = useState(false);

  useEffect(() => {
    const checkStarter = async () => {
      try {
        const starter = await AsyncStorage.getItem('isStarter');
        const isStarterFlag = starter ? JSON.parse(starter) : false;
        console.log('isStarterisStarter', isStarterFlag);
        setIsStarter(isStarterFlag);
      } catch (e) {
        console.log('Error fetching isStarter', e);
        setIsStarter(false);
      }
    };
    checkStarter();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={   isStarter ? routes.auth.login : routes.auth.AppStarter}
      screenOptions={{headerShown: false}}>
      {!isStarter && (
        <Stack.Screen name={routes.auth.AppStarter} component={AppStarter} />
      )}
      {/* <Stack.Screen name={routes.auth.welcome} component={WelcomeScreen} /> */}
      <Stack.Screen name={routes.auth.login} component={LoginScreen} />
      <Stack.Screen name={routes.auth.signup} component={SignupScreen} />
      <Stack.Screen name={routes.auth.forgot} component={ForgotPassword} />
      <Stack.Screen name={routes.auth.genderSelect} component={GenderSelection}/>
      <Stack.Screen name={routes.auth.age} component={AgeCreation} />
      <Stack.Screen name={routes.auth.height} component={HeightCreation} />
      <Stack.Screen name={routes.auth.weight} component={WeightCreation} />
      <Stack.Screen name={routes.auth.payment} component={PaymentDetails} />
      <Stack.Screen name={routes.auth.subscription} component={SubscriptionPlan}/>
    </Stack.Navigator>
  );
};

export default Auth;
