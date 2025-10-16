import React, {useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  View,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {vh} from '../../../theme/units';
import {useImperativeHandle} from 'react';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../../theme/colors';

const TextInputPopup = props => {
  const [visible, setVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const textInputRef = useRef(null);

  useImperativeHandle(props?.reference, () => ({
    hide: hide,
    show: show,
  }));

  const show = value => {
    setTextInputValue(value);
    setVisible(true);
    setTimeout(() => {
      textInputRef?.current?.focus();
    }, 200);
  };

  const hide = () => {
    if (props?.onAccept) {
      props?.onAccept(textInputValue);
    }
    // setTextInputValue('');
    setVisible(false);
  };

  const onYes = () => {
    hide();
  };

  return (
    <Modal transparent visible={visible} containerStyle={styles.container}>
      <View
        style={{flex: 1, backgroundColor: colors.theme.black + '8'}}>
        {/* <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
        
        </KeyboardAwareScrollView> */}

          <TextInput
            ref={textInputRef}
            // autoFocus
            style={[styles.textInput]}
            multiline
            value={textInputValue}
            onChangeText={setTextInputValue}
            onBlur={onYes}
          />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  textInput: {
    includeFontPadding: false,
    padding: vh * 1,
    fontSize: vh * 4,
    color: colors.theme.white,
  },
  container: {
    backgroundColor: 'transparent',
    height: vh * 100,
  },
  contentContainerStyle: {
    height: vh * 100,
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default TextInputPopup;
