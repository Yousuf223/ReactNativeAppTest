import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {font, layout, spacing} from '../../theme/styles';
import CustomText from '../wrappers/Text/CustomText';
import {colors} from '../../theme/colors';
import fonts from '../../Assets/fonts';
import {MainButton, MainButtonWithGradient} from '../Buttons/MainButton';
import {vh, vw} from '../../theme/units';
import MyIcons from '../MyIcons';

const ModalComponent = ({
  isVisible,
  onClose,
  title = 'Alert',
  message = 'This is a message',
  buttonText = 'OK',
  buttonText1 = '',
  onButtonPress,
  onPressCross,
  doublemodal = false,
  bin,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={null}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      backdropOpacity={0.8}
      >
      <View style={styles.modalContainer}>
        <MyIcons
          name={doublemodal ? 'checkIcon' : bin ? 'bin' : 'modalTick'}
          size={100}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={{position: 'absolute', top: -11, right: -9, padding: 5}}
          onPress={onPressCross}>
          <MyIcons name={'modalCross'} size={25} />
        </TouchableOpacity>
        <View
          style={{
            gap: vh * 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText
            text={title}
            color={colors?.text?.dimBlack}
            size={font?.h5}
            font={fonts?.clash?.regular}
          />
          <CustomText
            text={message}
            color={'#2E404A'}
            size={font?.large}
            style={{textAlign: 'center'}}
            font={fonts?.benzin?.regular}
          />
                     <MainButtonWithGradient
            style={{width: layout.contentWidth - spacing.h3}}
            title={buttonText}
            onPress={() => {
              onButtonPress?.();
              onClose();
            }}
          />
      
          {doublemodal && (
            <MainButton
              title={'No'}
              style={{
                width: layout.contentWidth - spacing.h3,
                backgroundColor: '#23404A',
              }}
              onPress={onPressCross}
            />
          )}
          {bin && (
            <MainButton
              title={'No'}
              style={{
                width: layout.contentWidth - spacing.h1,
                backgroundColor: '#23404A',
              }}
              onPress={onPressCross}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    position: 'relative',
    gap: vh * 2,
    borderRadius: 10,
    // marginHorizontal:20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
