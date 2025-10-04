import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { appIcons } from '../assets';
import { colors } from '../utils/colors';
export default function CustomTextInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  const {
    containerStyle,
    types,
    placeholder,
    color,
    placeholderColor,
    verify,
    borderStyles,
    lable,
    inputStyle,
    onSearch = () => { }
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={{ width: '100%', marginTop: 18 }}>
      {isFocused ? (
        <View style={{
          // borderBottomWidth:1,
          position: 'absolute',
          zIndex: 100,
          color: colors.white,
          fontSize: 13,
          bottom: 47,
          left: 10,
          backgroundColor: '#00000080',
          // paddingHorizontal: 10,
          borderRadius: 40
        }}>

        </View>
      ) : (
        ''
      )}
      <View
        style={[
          {
            alignSelf: 'center',
            width: '88%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            borderRadius: 10,
            paddingHorizontal: 7,
            paddingVertical: 2,
            height: 55,
            borderWidth: 0.8,
            borderColor: colors.black,
            marginVertical: 0,
          },
          containerStyle,
        ]}>
        {props?.leftIcon ? (
          <Image
            source={props?.leftIcon}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              tintColor: colors.secondary,
              marginHorizontal: 10,
            }}
          />
        ) : null}
        {/* {props?.leftIcon ? <View style={{ backgroundColor: '#ABA6A6', width: 1, height: 25 }}></View> : null} */}

        <View
          style={[
            {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              borderLeftWidth: 0,
              borderLeftColor: colors.border,
            },
            borderStyles,
          ]}>
          <TextInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={props?.placeholderColor || colors.black}
            style={[{
              flex: 1,
              color: colors.black,
              paddingLeft: 7,
              fontSize: 12,
              fontWeight:"300"
            }, inputStyle]}
            secureTextEntry={hidden}
            autoCapitalize="none"
            {...props}
          />
          {props?.rightIcon && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHidden(!hidden)}>
              <Image
                source={!hidden ? appIcons.eye : appIcons.eyeNot}
                style={{
                  height: 22,
                  width: 22,
                  marginRight: 10,
                  resizeMode: 'contain',
                  tintColor:colors.lightGray
                }}
              />
            </TouchableOpacity>
          )}
          {props?.searchIcon && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onSearch}
            >
              <Image
                source={props.searchIcon}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 10,
                  resizeMode: 'contain',
                  tintColor:colors.secondary
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
export function ProfileTextInput(props) {
  const { icon } = props;
  return (
    <View
      style={{
        width: '100%',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: colors.border,
        paddingHorizontal: 10,

        // backgroundColor: colors.cardBackground,
      }}>
      <Image
        source={icon}
        style={{ width: 15, height: 15, resizeMode: 'contain' }}
      />

      <TextInput
        style={{
          width: '100%',
          height: 50,
          color: colors.primary,
          marginLeft: 10,
        }}
        placeholderTextColor={'#7E7E7E'}
        {...props}
      />
    </View>
  );
}
export function CustomPhoneInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const { containerStyle, types, placeholder, color, placeholderColor, verify, lable } =
    props;
  return (
    <View style={{ width: '100%', marginTop: 18 }}>
      {isFocused ? (
        <View style={{
          // borderBottomWidth:1,
          position: 'absolute',
          zIndex: 100,
          color: colors.white,
          fontSize: 13,
          bottom: 47,
          left: 10,
          backgroundColor: '#00000080',
          // paddingHorizontal: 10,
          borderRadius: 40
        }}>

          <Text
            style={{
              // position: 'absolute',
              // zIndex: 100,
              color: colors.white,
              // fontSize: 13,
              // bottom: 47,
              // left: 8,
              // backgroundColor: 'transparent',
              // paddingHorizontal: 10,
            }}>
            {lable}
          </Text>
        </View>
      ) : (
        ''
      )}
      {/* <Text style={{color: 'black', fontWeight: '600', fontSize: 14}}>
        {placeholder}
      </Text> */}
      <View
        style={[
          {
            alignSelf: 'center',
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isFocused ? 'transparent' : colors.darkGray,
            borderRadius: 10,
            paddingHorizontal: 7,
            paddingVertical: 5,
            height: 55,
            marginVertical: 0,
            borderWidth: 1,
            borderColor: isFocused ? colors.white : colors.darkGray,
          },
          containerStyle,
        ]}>
        {props?.leftIcon ? (
          <Image
            source={props?.leftIcon}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              tintColor: colors.white,
              marginHorizontal: 10,
            }}
          />
        ) : null}
        {props?.leftIcon ? <View style={{ backgroundColor: '#ABA6A6', width: 1, height: 25 }}></View> : null}
        <View
          style={{
            flex: 1,

            flexDirection: 'row',
            alignItems: 'center',
            borderLeftWidth: 1,
            borderLeftColor: colors.border,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TextInputMask
              type={'cel-phone'}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholderTextColor={props?.placeholderColor || colors.white}
              style={{
                flex: 1,
                color: colors.white,
                paddingLeft: 7,
                fontSize: 14,
              }}
              onChangeText={phoneNumberFormat => {
                let phoneNumber = phoneNumberFormat
                  .toString()
                  .replace(/\D+/g, '');
                props?.onChangePhoneInput(phoneNumberFormat, phoneNumber);
              }}
              maxLength={
                props?.formattedPhoneNumber.toString().startsWith('1') ? 18 : 19
              }
              options={
                props?.phoneNumber.startsWith('1')
                  ? {
                    dddMask: '9 (999) 999 - ',
                  }
                  : {
                    dddMask: '(999) 999 - ',
                  }
              }
              {...props}
            />
            {props.verify && (
              <Text
                style={{
                  color: colors.red,
                  alignSelf: 'center',
                  textDecorationLine: 'underline',
                }}>
                Verify
              </Text>
            )}
          </View>
          {props.rightIcon && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHidden(!hidden)}>
              <Image
                source={!hidden ? appIcons.Visible : appIcons.Unvisible}
                style={{
                  height: 22,
                  width: 22,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
