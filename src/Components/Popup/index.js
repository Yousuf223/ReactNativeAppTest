import {Image, Modal, TextInput, TouchableOpacity, View} from 'react-native';
import IconButton from '../Buttons/IconButton';
import {MainButton} from '../Buttons/MainButton';
import React from 'react';
import {colors} from '../../theme/colors';
import {layout} from '../../theme/styles';
import styles from './styles';
import MyIcons from '../MyIcons';
import CustomText from '../wrappers/Text/CustomText';

const Popup = ({
  visible,
  hide,
  title,
  icon,
  reason,
  subTitle,
  onSuccess,
  successBtnTitle,
  onChangeText,
  successSecondary,
  noBtnTitle,
}) => {
  const handleSuccess = () => {
    hide();
    onSuccess && setTimeout(onSuccess, 100);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      style={layout.flex}>
      <View style={[styles.mainContainer]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={hide}
          style={styles.backdropContainer}>
          <View style={styles.blur} />
        </TouchableOpacity>
        <View style={[styles.contentContainer]}>
          <MyIcons name={'checked'} />
          {/* <Image
            source={icon ? icon : images.icons.success}
            style={styles.image}
          /> */}
          <CustomText text={title} style={styles.title} />
          {subTitle && <CustomText text={subTitle} style={styles.subTitle} />}
          {reason && (
            <TextInput
              placeholder="Enter Reason Here..."
              multiline
              style={styles.reasonInput}
              numberOfLines={4}
              onChangeText={onChangeText}
              textAlignVertical="top"
            />
          )}
          <View style={layout.flexRow}>
            <MainButton
              title={successBtnTitle}
              onPress={handleSuccess}
              style={[
                styles.successBtnTitle,
                successSecondary && {
                  backgroundColor: colors.background.header,
                },
              ]}
            />
            {noBtnTitle && (
              <MainButton
                title={noBtnTitle}
                onPress={hide}
                style={styles.noBtnTitle}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
