import {StyleSheet, View,Image} from 'react-native';
import React, {useState} from 'react';
import ImagePickerSetup from '../ImagePickerSetup/ImagePickerSetup';
import {appImages} from '../../../Assets/Images';
import MyIcons from '../../MyIcons';
import {colors} from '../../../theme/colors';
import {layout, spacing} from '../../../theme/styles';
import {vw} from '../../../theme/units';
import {extractFileName, LOG} from '../../../Utils/helperFunction';

const Profile = ({handleImage, isEdit, initialImage}) => {
  const [profileImage, setProfileImage] = useState(initialImage);
  console.log('profileImage', profileImage);

  const handleImageChange = (imagePath, mime, type) => {
    let img = extractFileName(imagePath[0]);
    setProfileImage({uri: imagePath[0]});
    const imageObj = {
      uri: imagePath[0],
      type: mime,
      name: img,
    };
    if (handleImage) handleImage(imageObj);
  };

  return (
    <ImagePickerSetup
      onImageChange={handleImageChange}
      uploadVideo={false}
      isMultiple={false}
      style={{position: 'relative'}}>
      <View style={styles?.wrapper}>
        <Image
          source={profileImage}
          style={styles?.images}
          resizeMode="cover"
        />
      </View>
      {isEdit && (
        <View style={styles?.cameraBtn}>
          <MyIcons name={'camera'} size={'14'} />
        </View>
      )}
    </ImagePickerSetup>
  );
};

export default Profile;

const styles = StyleSheet.create({
  wrapper: {
    height: vw * 22,
    width: vw * 22,
    borderRadius: 100,
    overflow: 'hidden',
  },
  images: {
    height: '100%',
    width: '100%',
  },
  cameraBtn: {
    backgroundColor: colors?.theme?.primary,
    borderRadius: 100,
    padding: spacing?.small,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 2,
    bottom: 0,
  },
});
