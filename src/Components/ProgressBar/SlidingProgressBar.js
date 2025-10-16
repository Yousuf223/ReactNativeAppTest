import React, {useState, useRef} from 'react';
import {View, StyleSheet, PanResponder, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../theme/colors';
import {layout} from '../../theme/styles';

const SlidingProgressBar = () => {
  const [progress, setProgress] = useState(14); // Progress value (0-100)
  const progressBarWidth = useRef(14); // To store the width of the progress bar
  // Create PanResponder to handle sliding gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Calculate progress based on the horizontal drag position
        const newProgress = Math.min(
          Math.max((gestureState.moveX / progressBarWidth.current) * 100, 14),
          100,
        );
        setProgress(newProgress);
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      {/* <Text>{Math.round(progress)}%</Text> */}
      {/* Progress Bar */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.progressBar}
        onLayout={e => {
          progressBarWidth.current = e.nativeEvent.layout.width;
        }}
        {...panResponder.panHandlers}
        colors={['#4da5a7', '#4da5a7', '#ffffff', '#4da5a7', '#ffffff']}>
        <View style={[styles.progressIndicator, {width: `${progress}%`}, ,]}>
          <View style={[styles?.btnRadio]} />
        </View>
      </LinearGradient>
    </View>
  );
};

export default SlidingProgressBar;

const styles = StyleSheet.create({
  container: {},
  progressBar: {
    width: '100%',
    height: 36,
    // backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'visible',
    marginVertical: 10,
  },
  progressIndicator: {
    height: '100%',
    // backgroundColor: '#3b5998',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnRadio: {
    height: 46,
    width: 46,
    backgroundColor: colors?.theme?.primary,
    borderRadius: layout.borderRadius,
    borderWidth: 4,
    borderColor: colors?.text?.white,
    elevation: 14,
  },
});
