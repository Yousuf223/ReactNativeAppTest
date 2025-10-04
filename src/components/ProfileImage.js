import React from 'react';
import {Image, Text, View} from 'react-native';
import {colors} from '../utils/colors';

const ProfileImage = ({
  size = 110,
  imageUri,
  innerAsset = false,
  name = ' ',
  style,
  viewStyle
}) => {
  if (imageUri)
    return (
      <View
        style={[{
          height: 135,
          width: 135,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius:100,
        },viewStyle]}>
        <Image
          source={innerAsset ? imageUri : {uri: imageUri}}
          style={[
            {
              width: size,
              height: size,
              resizeMode: 'cover',
              borderRadius: 70,
              borderWidth:5,
              borderColor: '#7DC2FF',
            },
            style,
          ]}
        />
      </View>
    );
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 50,
          borderColor: '#7DC2FF',
          backgroundColor: colors.secondary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      <Text
        numberOfLines={1}
        style={{
          color: colors.primary,
          fontSize: size * 0.75,
          fontWeight: '800',
          width: '100%',
          textAlign: 'center',
        }}>
        {name[0].toUpperCase()}
      </Text>
    </View>
  );
};

export default ProfileImage;
