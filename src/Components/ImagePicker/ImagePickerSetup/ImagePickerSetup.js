import React, {useRef} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import * as ImageCropPicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actions-sheet';
import {
  Image as ImageCompressor,
  Video as VideoCompressor,
} from 'react-native-compressor';
import {colors} from '../../../theme/colors';
import IconButton from '../../Buttons/IconButton';
import {appImages} from '../../../Assets/Images';
import {MainButton} from '../../Buttons/MainButton';
import {font, layout, spacing} from '../../../theme/styles';
import MyIcons from '../../MyIcons';

import fonts from '../../../Assets/fonts';
import {vw} from '../../../theme/units';
import CustomText from '../../wrappers/Text/CustomText';

export default ImagePickerSetup = ({
  children,
  onImageChange = () => {},
  uploadVideo = false,
  isMultiple = false,
  style,
}) => {
  const actionSheetRef = useRef(null);

  const imageChange = method => {
    if (method === 'camera') {
      ImageCropPicker.openCamera({
        mediaType: 'photo',
      }).then(async image => {
        actionSheetRef.current.hide();
        const result = await ImageCompressor.compress(image.path, {
          maxHeight: 400,
          maxWidth: 400,
          quality: 1,
        });
        onImageChange([result], image.mime, 'photo'); // Wrap result in an array
      });
    } else if (method === 'gallery') {
      ImageCropPicker.openPicker({
        multiple: isMultiple, // Ensure multiple selection is allowed
        mediaType: 'photo',
      }).then(async images => {
        actionSheetRef.current.hide();
        if (isMultiple) {
          const compressedImages = await Promise.all(
            images.map(img =>
              ImageCompressor.compress(img.path, {
                maxHeight: 400,
                maxWidth: 400,
                quality: 1,
              }),
            ),
          );
          onImageChange(compressedImages, images[0]?.mime, 'photo');
        } else {
          const result = await ImageCompressor.compress(images.path, {
            maxHeight: 400,
            maxWidth: 400,
            quality: 1,
          });
          onImageChange([result], images?.mime, 'photo');
        }
      });
    } else if (method === 'video') {
      ImageCropPicker.openPicker({
        mediaType: 'video',
      }).then(async video => {
        actionSheetRef.current.hide();
        const result = await VideoCompressor.compress(video.path, {
          compressionMethod: 'auto',
        });
        onImageChange([result], video.mime, 'video'); // Wrap result in an array
      });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => actionSheetRef.current.show()}
      style={style}>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          backgroundColor: 'white',
          borderTopRightRadius: spacing.xxlarge,
          borderTopLeftRadius: spacing.xxlarge,
        }}>
        <View
          style={{
            height: spacing.small,
            borderRadius: 20,
            width: vw * 25,
            alignSelf: 'center',
            backgroundColor: colors?.theme?.greyAlt,
            marginTop: spacing.medium,
          }}
        />
        <View
          style={{
            paddingTop: spacing.xxlarge,
            paddingBottom: spacing.xlarge,
          }}>
          <View
            style={{
              borderRadius: layout?.borderRadius,
              marginBottom: spacing?.large,
              flexDirection: 'row',
              justifyContent: 'space-around',
              gap: spacing.medium,
            }}>
            <TouchableOpacity
              style={styles?.btnWrap}
              onPress={() => {
                imageChange('camera');
              }}>
              <MyIcons name={'cameras'} size={43} />
              <CustomText text="Camera" style={{fontSize: font.large}} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles?.btnWrap]}
              onPress={() => {
                imageChange('gallery');
              }}>
              <MyIcons name={'gallery'} size={39} />
              <CustomText
                text="Gallery"
                style={{fontSize: font.large, marginTop: 4}}
              />
            </TouchableOpacity>
            {/* <MainButton
              onPress={() => {
                imageChange('camera');
              }}
              title={'Take Photo'}
              textStyle={styles?.buttonText}
              style={{marginTop: spacing?.large, alignSelf: 'center'}}
            /> */}
            {/* <MainButton
              onPress={() => {
                imageChange('gallery');
              }}
              title={'Choose from Library'}
              textStyle={styles?.buttonText}
              style={{marginTop: spacing?.small, alignSelf: 'center'}}
            /> */}
            {uploadVideo && (
              <MainButton
                onPress={() => {
                  imageChange('video');
                }}
                title={'Upload A Video'}
                textStyle={styles?.buttonText}
                style={{marginTop: spacing?.small, alignSelf: 'center'}}
              />
            )}
          </View>
        </View>
      </ActionSheet>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: colors?.text?.white,
    textDecorationLine: 'underline',
  },
  btnWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.small,
  },
});
