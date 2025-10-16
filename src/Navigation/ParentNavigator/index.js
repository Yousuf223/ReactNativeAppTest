
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Main from '../Main';
import Auth from '../Auth';
import routes from '../routes';


const Stack = createNativeStackNavigator();

const ParentNavigator = () => {
  const token = useSelector(state => state?.auth?.token);


  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {token ? (
        <Stack.Screen component={Main} name={routes.mainStack.main} />
      ) : (
        <Stack.Screen component={Auth} name={routes.mainStack.auth} />
      )}
    </Stack.Navigator>
  );
};

export default ParentNavigator;
