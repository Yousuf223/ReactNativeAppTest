import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

const Background = ({ children }) => {
  return (

    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraScrollHeight={1}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1, justifyContent: "center", position: 'relative',
        backgroundColor: 'white',
      }}>
      <LinearGradient
        colors={['#ffffff', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.7, y: 0.7 }}
        style={styles.topLeftGradient}
      />

      <LinearGradient
        colors={['#ffffff', 'transparent']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0.7, y: 0.3 }}
        style={styles.bottomLeftGradient}
      />
      <View style={styles.contentWrapper}>{children}</View>
    </KeyboardAwareScrollView>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',

  },
  topLeftGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 290,
    height: 300,
    borderBottomRightRadius: 200,
    borderRadiusTopRightRadius: 200,
    opacity: 0.6,
  },
  bottomLeftGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 290,
    height: 300,
    borderTopRightRadius: 200,
    opacity: 0.5,
  },
  contentWrapper: {
    flex: 1,
  },
});
