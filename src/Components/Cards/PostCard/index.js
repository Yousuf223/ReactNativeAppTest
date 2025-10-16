import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import Animated, {FadeOut, SlideInRight} from 'react-native-reanimated';
import MyIcons from '../../MyIcons';

import styles from './styles';
import CustomText from '../../wrappers/Text/CustomText';
import { Image } from 'react-native';

const PostCard = ({
  profileImage,
  username,
  postTime,
  mediaImage,
  likes,
  comments,
  description,
}) => {
  return (
    <Animated.View
      style={styles.container}
      exiting={FadeOut.duration(600)}
      entering={SlideInRight.duration(200)}>
      <View style={styles.header}>
        <View style={styles.headerCol1}>
          <Image
            source={profileImage || {uri: 'fallback_image_url'}}
            style={styles.profileStyles}
            resizeMode={'cover'}
          />
        </View>
        <View style={styles.headerCol3}>
          <CustomText text={username || 'Unknown'} />
        </View>

        <View style={styles.headerCol2}>
          <CustomText text={postTime || 'Unknown'} style={styles?.lightText} />
        </View>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroCol1}>
          <Image
            source={mediaImage || {uri: 'fallback_media_url'}}
            style={styles.poster}
            resizeMode={'cover'}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerRow1}>
          <View style={styles.footerRow1Col1}>
            <TouchableOpacity>
              <MyIcons name="like" color="transparent" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MyIcons name="comment" color="transparent" />
            </TouchableOpacity>
          </View>

          <View style={styles.footerRow1Col2}>
            <CustomText text={`${likes} likes`} style={styles?.lightText} />
            <CustomText
              text={`${comments} comments`}
              style={styles?.lightText}
            />
          </View>
        </View>

        <View style={styles.footerRow2}>
          <View style={styles.footerRow2Col1}>
            <CustomText text={description || 'No description'} />
          </View>
        </View>

        <View style={styles.footerRow3}>
          <TouchableOpacity>
            <CustomText text="View more" style={styles?.lightText} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default PostCard;
