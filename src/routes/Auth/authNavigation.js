import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import Login from '../../screen/auth/Login/Login';









const RootStack = createNativeStackNavigator();

const AuthNavigation = ({initialRoute}) => {
 
  
  return (
    <RootStack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        animation: 'slide_from_right',
      }}>
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="Login"
        component={Login}
      />

    </RootStack.Navigator>


    
  );
};



export default AuthNavigation;
