import React, { useEffect } from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {colors} from '../../theme/colors';
import {LOG} from '../../Utils/helperFunction';
import {useDispatch, useSelector} from 'react-redux';
import { EventRegister } from 'react-native-event-listeners';
import { clearAuth } from '../../Redux/slices/authSlice';
import { autopartsApi } from '../../Api/autopartsApiSlice';
import { recordsApi } from '../../Api/recordsApiSlice';
import { gasApi } from '../../Api/gasApiSlice';
import { profileApi } from '../../Api/profileApiSlice';
import { vehicleApi } from '../../Api/vehiclesApiSlice';
import { storeApi } from '../../Api/storeApiSlice';
import { mechanicApi } from '../../Api/mechanicApiSlice';
import { accidentApi } from '../../Api/accidentApiSlice';
import { travelApi } from '../../Api/travelApiSlice';
import { maintenanceAutopartsApi } from '../../Api/mainteinanceAutopartsApiSlice';
import { equipmentApi } from '../../Api/equipmentApiSlice';
import { petApi } from '../../Api/petApiSlice';
import { vetApi } from '../../Api/vetApiSlice';
import { otherRecordsApi } from '../../Api/otherRecordsApiSlice';
import { paymentApi } from '../../Api/paymentApiSlice';
import { draftsApi } from '../../Api/draftsApiSlice';
import { categoryApi } from '../../Api/categoryApiSlice';
import { persistor } from '../../Redux/store';
import routes from '../routes';
import Main from '../Main';
import Auth from '../Auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
};

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const token = useSelector(state => state?.auth?.token);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const logoutListener = EventRegister.addEventListener('forcelogout', async () => {
      dispatch(clearAuth());

      // ✅ Reset all APIs
      [
        autopartsApi,
        recordsApi,
        gasApi,
        profileApi,
        vehicleApi,
        storeApi,
        mechanicApi,
        accidentApi,
        travelApi,
        maintenanceAutopartsApi,
        equipmentApi,
        petApi,
        vetApi,
        otherRecordsApi,
        paymentApi,
        draftsApi,
        categoryApi,
      ].forEach(api => dispatch(api.util.resetApiState()));

      await persistor.purge();
    });

    return () => {
      EventRegister.removeEventListener(logoutListener);
    };
  }, [dispatch]);
console.log('routesroutes',routes?.mainStack)
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen component={Main} name={routes.mainStack.main} />
        ) : (
          <Stack.Screen component={Auth} name={routes.mainStack.auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
