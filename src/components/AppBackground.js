import { Image, Keyboard, Platform, Text, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { appIcons } from '../assets/index';
import NavService from '../helpers/NavService';
import { colors } from '../utils/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
function AppBackground({
  children,
  title,
  back = false,
  menu = false,
  dot = false,
  nav = '',
  rightIcon = appIcons.notification,
  marginHorizontal = true,
  cart = false,
  onDotPress,
  iconColor,
  onBack,
  tintColor,
  containerStyle,
  titleStyle
}) {
  const cartItem = useSelector((state)=> state?.appReducer?.cart)
  console.log('cartItemcartItem',cartItem)
  return (
    <View style={[{ flex: 1, backgroundColor: colors.primary }, containerStyle]}>

      <View
        style={{
          marginTop: Platform.OS === 'ios' ? getStatusBarHeight() * 2.0 : getStatusBarHeight() * 1.6,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 14,

        }}>
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Keyboard.dismiss()
              nav.length
                ? NavService.navigate(nav)
                : back
                  ? NavService.goBack()
                  : onBack ?
                    NavService.goBack()
                    : NavService.openDrawer();
            }}
            style={{
              position: 'absolute',
              alignItems: 'center',
              borderRadius: menu ? 10 : 0,
              left: 3,
              width: 45,
              height: 45,
              justifyContent: 'center',
              borderRadius: 30,
              // ...Shadows.shadow3,
            }}>
            {back && (
              <Image
                source={appIcons.back}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: colors.white,
                }}
              />
            )}
            {onBack && (
              <Image
                source={appIcons.back}
                style={[{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: colors.black,
                }, tintColor]}
              />
            )}
            {menu && (
              <Image
                source={appIcons.menu}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  left: 5,
                  tintColor: colors.white,
                }}
              />
            )}
          </TouchableOpacity>

          <View>
            {title && <Text
              style={[{
                color: colors.white,
                fontSize: 16,
                marginTop: Platform.OS === 'ios' ? 10 : 0,

              }, titleStyle]}>
              {title}
            </Text>}
          </View>
          {cart && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('Cart');
              }}
              style={{
                position: 'absolute',
                right: 20,
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
              }}>
              <Entypo name="shopping-cart" size={24} color={iconColor || 'white'} />
              <View
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  minWidth: 16,
                  height: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 3,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 9,
                    fontWeight: 'bold',
                  }}>
                  {cartItem?.length}
                </Text>
              </View>
            </TouchableOpacity>
          )}


        </>
      </View>
      <View
        style={{
          flex: 1,
          // marginHorizontal: !marginHorizontal ? 17 : 0,
          marginBottom: 10,
          overflow: 'visible',
        }}>
        {children}
      </View>
    </View>
  );
}

export default AppBackground;
