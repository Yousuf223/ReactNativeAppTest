import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cart from '../../screen/main/user/Cart/Cart';

import ProductDetail from '../../screen/main/user/ProductDetail/ProductDetail'
import Home from '../../screen/main/user/Home/Home'


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name='Home' component={Home} />

    </Stack.Navigator>
  );
};

export default AppNavigation;
