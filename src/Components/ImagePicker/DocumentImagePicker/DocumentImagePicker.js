



import React, { memo, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View, FlatList, Text, Image } from 'react-native';

import ImagePickerSetup from '../ImagePickerSetup/ImagePickerSetup';
import MyIcons from '../../MyIcons';
import { colors } from '../../../theme/colors';
import { font, layout, spacing } from '../../../theme/styles';
import { vh, vw } from '../../../theme/units';
import CustomText from '../../wrappers/Text/CustomText';
import fonts from '../../../Assets/fonts';
import { extractFileName, extractFilenameFromUrl, getImageUrl } from '../../../Utils/helperFunction';
import Animated, { BounceIn, FadeOut } from 'react-native-reanimated';
import { imageServer } from '../../../Api/configs';

// LabelComponent remains unchanged
export const LabelComponent = memo(({ label, required }) => (
  <CustomText
    style={styles.label}
    color={colors.text.dimBlack}
    text={
      <>
        {label}
        {required && <CustomText text={' * '} style={styles.asterisk} />}
      </>
    }
    font={fonts.benzin.regular}
  />
));

const MAX_IMAGES = 5;

// Use forwardRef to allow parent to access reset function
const DocumentImagePicker = forwardRef(
  ({ handleImage, isEdit, label, required, errors, initialImages, maxLimit }, ref) => {
    const [profileImages, setProfileImages] = useState(initialImages || []);

    // Sync profileImages with initialImages when it changes
    useEffect(() => {
      if (initialImages && initialImages.length > 0) {
        console.log('Initial Images in DocumentImagePicker:', initialImages);
        setProfileImages(initialImages);
      }
    }, [initialImages]);

    // Expose reset function to parent via ref
    useImperativeHandle(ref, () => ({
      reset: () => {
        setProfileImages([]);
        if (handleImage) handleImage([]); // Notify parent of reset
      },
    }));

    const handleImageChange = (imagePaths, mime, type) => {
      console.log('Selected Images:', imagePaths);
      console.log('Selected mime:', mime);
      console.log('Selected type:', type);

      if (profileImages.length + imagePaths.length > (maxLimit ? maxLimit : MAX_IMAGES)) {
        Alert.alert(
          'Limit Reached',
          `You can only upload up to ${maxLimit ? maxLimit : MAX_IMAGES} images.`,
        );
        return;
      }

      const newImages = imagePaths.map(path => {
        let img = extractFileName(path);
        return {
          uri: path,
          type: mime,
          name: img,
        };
      });
      const updatedImages = [...profileImages, ...newImages];

      setProfileImages(updatedImages);
      if (handleImage) handleImage(updatedImages);
    };

    return (
      <>
        {profileImages.length > 0 && (
          <FlatList
            data={profileImages}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            style={{ width: '90%' }}
            renderItem={({ item, index }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri:
                      item.uri.startsWith('file://') ||
                        item.uri.startsWith('http')
                        ? item.uri
                        : `${imageServer}${item.uri}`,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                  onError={() => console.log('Failed to load image:', item.uri)}
                />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    console.log(item, "itemitemitem")

                    const updatedImages = profileImages.filter(
                      (_, i) => i !== index,
                    );
                    setProfileImages(updatedImages);

                    let removeImageName = extractFilenameFromUrl(item?.uri)

                    if (handleImage) handleImage({}, removeImageName);
                  }}>
                  <MyIcons name="closed" size={14} />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
        <ImagePickerSetup
          onImageChange={handleImageChange}
          uploadVideo={false}
          isMultiple={true}
          style={{
            position: 'relative',
            width: '90%',
          }}>
          <View style={styles.wrapper}>
            {profileImages.length < (maxLimit ? maxLimit : MAX_IMAGES) && (
              <View
                style={{
                  zIndex: 999,
                  left: 30,
                  position: 'absolute',
                  top: -15,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  paddingHorizontal: 5,
                }}>
                <LabelComponent
                  label={label || 'Attachments'}
                  required={required}
                />
              </View>
            )}
          </View>
          {profileImages.length < (maxLimit ? maxLimit : MAX_IMAGES) && (
            <View style={styles.uploadBox}>
              <MyIcons name="upload" />
              <CustomText text="Add Attachment" color={colors.text.red} />
            </View>
          )}
        </ImagePickerSetup>
        {errors ? (
          <Animated.View
            exiting={FadeOut.duration(600)}
            entering={BounceIn.duration(300)}>
            <Text style={styles.error}>{errors}</Text>
          </Animated.View>
        ) : (
          <View />
        )}
      </>
    );
  },
);

export default DocumentImagePicker;

// Styles remain unchanged
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: layout.borderRadius,
  },
  uploadBox: {
    borderRadius: 30,
    backgroundColor: colors.theme?.white,
    borderWidth: 1.8,
    borderColor: colors.text?.red,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    borderStyle: 'dashed',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  imageContainer: {
    position: 'relative',
    marginRight: spacing.small,
    padding: 5,
    marginBottom: vh * 2,
  },
  image: {
    height: vw * 15,
    width: vw * 15,
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    right: -5,
    backgroundColor: colors.theme.secondary,
    borderRadius: 100,
    padding: spacing.xxsmall,
  },
  label: {
    color: colors?.theme?.black,
    fontSize: font.small,
  },
  asterisk: { color: colors.background.red },
  error: {
    color: colors.text.red,
    marginTop: vh * 0.5,
    marginLeft: vw * 1,
    fontSize: vh * 1.5,
    fontFamily: fonts.benzin.regular,
  },
});