import React, {forwardRef} from 'react';
import {View, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {vw} from '../../theme/units';
import { colors } from '../../theme/colors';

const CustomBottomSheet = forwardRef((props, ref) => {
  return (
    <RBSheet
      ref={ref}
      draggable={true}
      height={props.height || 300}
      openDuration={props.openDuration || 300}
      closeDuration={props.closeDuration || 200}
      closeOnDragDown={props.closeOnDragDown || true}
      closeOnPressMask={props.closeOnPressMask || true}
      closeOnPressBack={props.closeOnPressBack}
      
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
          //backgroundColor: props.backdropColor || 'rgba(0,0,0,0.5)',
        },
        draggableIcon: {
          backgroundColor: props.draggableIconColor || colors?.theme?.grey,
          width: props.topIconWidth || vw * 20,
          height: props.topIconHeight || 6,
        },
        container: {
          borderTopLeftRadius: props.borderRadius || 30,
          borderTopRightRadius: props.borderRadius || 30,
          ...props.customStyles,
        },
      }}
      onClose={props.onClose}
      onOpen={props.onOpen}>
      <View style={[styles.content, props.contentStyle]}>{props.children}</View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomBottomSheet;
