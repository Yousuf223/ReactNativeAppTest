import React, {useState} from 'react';
import {TouchableOpacity, View,Image} from 'react-native';
import Animated, {FadeOut, SlideInRight} from 'react-native-reanimated';

import {colors} from '../../../theme/colors';
import {spacing} from '../../../theme/styles';
import MyIcons from '../../MyIcons';
import CustomText from '../../wrappers/Text/CustomText';
import styles from './styles';

const RowCard = ({
  profileImage,
  username,
  friendRequest = false,
  friendInvite = false,
  friendShare = false,
  onSharePress,
  style,
  collaborations,
}) => {
  const [isFollow, setIsFollow] = useState(false);
  return (
    <Animated.View
      style={[styles.container, style]}
      exiting={FadeOut.duration(600)}
      entering={SlideInRight.duration(200)}>
      <View style={styles.header}>
        <View style={styles.headerCol1}>
          <Image
            source={profileImage || {uri: 'fallback_image_url'}}
            style={styles.profileStyles}
            resizeMode={Image.resizeMode.cover}
          />
        </View>
        <View style={styles.headerCol2}>
          <CustomText text={username || 'Unknown'} />
        </View>

        <View style={styles.headerCol3}>
          {friendRequest && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles?.btnStyles,
                {
                  backgroundColor: isFollow
                    ? colors?.background?.red
                    : '#0CBB52',
                },
              ]}
              onPress={() => setIsFollow(!isFollow)}>
              <CustomText
                text={isFollow ? 'Remove' : 'Followed'}
                style={styles?.lightText}
              />
            </TouchableOpacity>
          )}
          {friendInvite && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{padding: spacing.small}}
              onPress={() => setIsFollow(!isFollow)}>
              <MyIcons name={isFollow ? 'add' : 'checked'} size={22} />
            </TouchableOpacity>
          )}

          {friendShare && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                padding: spacing.small,
                backgroundColor: colors?.theme.secondary,
                borderRadius: 6,
              }}
              onPress={onSharePress}>
              <MyIcons name={'share'} size={22} />
            </TouchableOpacity>
          )}
          {collaborations && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                padding: spacing.small,
                backgroundColor: colors?.theme.secondary,
                borderRadius: 6,
              }}
              onPress={onSharePress}>
              <MyIcons name={'minus'} size={22} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

export default RowCard;
