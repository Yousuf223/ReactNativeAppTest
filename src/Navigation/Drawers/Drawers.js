import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {BottomTabs} from '../Tabs/BottomTabs';
import DrawerComp from '../../Components/Navigation/Drawer';
import {colors} from '../../theme/colors';

const Drawer = createDrawerNavigator();

const UserAppStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: '70%',
          backgroundColor: '#F2F2F2',
        },
      }}
      drawerContent={props => <DrawerComp {...props} />}
      initialRouteName={'BottomTabs'}>
      <Drawer.Screen
        options={{headerShown: false}}
        name="BottomTabs"
        component={BottomTabs}
      />
    </Drawer.Navigator>
  );
};

export default UserAppStack;
