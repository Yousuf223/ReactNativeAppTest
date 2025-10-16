import React, {useState, useRef} from 'react';
import {View, StyleSheet, PanResponder, Text, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../theme/colors';
import {layout, spacing} from '../../theme/styles';
import CustomText from '../wrappers/Text/CustomText';
import {vw} from '../../theme/units';

const ProgressBar = () => {
  const [progress, setProgress] = useState(4); // Progress value (0-100)
  const progressBarWidth = useRef(4); // To store the width of the progress bar
  // Create PanResponder to handle sliding gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Calculate progress based on the horizontal drag position
        const newProgress = Math.min(
          Math.max((gestureState.moveX / progressBarWidth.current) * 100, 4),
          100,
        );
        setProgress(newProgress);
      },
    }),
  ).current;
  const windowWidth = Dimensions.get('screen').width;

  const generateArrayWidth = Array.from(
    {length: windowWidth / 14},
    (_, i) => i,
  );

  return (
    <View style={styles.container}>
      <View style={styles?.verticalLineWrap}>
        {generateArrayWidth.map((item, index) => {
          return <View key={index} style={styles.verticalLine} />;
        })}
      </View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.progressBar}
        onLayout={e => {
          progressBarWidth.current = e.nativeEvent.layout.width;
        }}
        {...panResponder.panHandlers}
        colors={['#4da5a7', '#4da5a7', '#4da5a7', '#4da5a7', '#4da5a7']}>
        <View style={[styles.progressIndicator, {width: `${progress}%`}, ,]}>
          <View style={[styles?.btnRadio]} />
        </View>
      </LinearGradient>
      <View style={styles?.meterWrap}>
        <View
          style={{
            flexDirection: 'row',
            flex: 2,
            justifyContent: 'space-between',
          }}>
          <CustomText text="0 Lbs" />
          <CustomText text="200 Lbs" />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <CustomText text="300 Lbs" />
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {},
  progressBar: {
    width: '100%',
    height: 12,
    borderRadius: 4,
    overflow: 'visible',
    marginVertical: 10,
  },
  progressIndicator: {
    height: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnRadio: {
    height: 32,
    width: 16,
    backgroundColor: colors?.theme?.primary,
    borderRadius: 4,
    elevation: 14,
  },
  verticalLineWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: -1,
  },
  verticalLine: {
    height: 32,
    width: 1,
    backgroundColor: colors?.theme?.primary,
  },
  meterWrap: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: spacing.small,
  },
});
