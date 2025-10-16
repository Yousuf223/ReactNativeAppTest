import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import TabBar from '../../Components/Navigation/Tabbar';
import Home from '../../Screens/Main/Home';
import routes from '../routes';
import Vehicle from '../../Screens/Main/Vehicle';
import MyProfile from '../../Screens/Main/MyProfile';
import Records from '../../Screens/Main/Records';
import AddRecord from '../../Screens/Main/AddRecord';
import OtherRecords from '../../Screens/Main/OtherRecords';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
     screenOptions={{
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: { backgroundColor: '#fff' },
  }}
  sceneContainerStyle={{ backgroundColor: '#fff' }}
      tabBar={props => <TabBar {...props} />}
      initialRouteName={routes?.tab?.vehicles}>
      <Tab.Screen name={routes?.tab?.vehicles} component={Vehicle} />
      <Tab.Screen name={routes?.tab?.records} component={Records} />
      <Tab.Screen name={routes.tab.addrecords} component={AddRecord} />
      <Tab.Screen name={routes?.tab?.otherrecord} component={OtherRecords} />
      <Tab.Screen name={routes?.tab?.home} component={Home} />
    </Tab.Navigator>

  );
};
