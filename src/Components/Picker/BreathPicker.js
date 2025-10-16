import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomText from '../wrappers/Text/CustomText';
import WheelPicker from './wheelpicker';
import {vh} from '../../theme/units';

const BreathPicker = ({
  label,
  onSelectItem,
  onSelectSecItem,
  flatListRef,
  flatListSecRef,
}) => {
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedSecond, setSelectedSecond] = useState(0);

  const minutes = Array.from({length: 61}, (_, index) => index);
  const seconds = ['Second', 'Minute'];

  return (
    <View style={styles.picker}>
      <View style={styles.leftContainer}>
        <CustomText text={label} />
      </View>
      <View style={styles.middleContainer}>
        <WheelPicker
          ref={flatListRef}
          data={minutes}
          selectedItem={selectedMinute}
          setSelectedItem={setSelectedMinute}
          //   itemHeight={vh * 6}
          type="minutes"
          onSelectItem={onSelectItem}
        />
      </View>
      <View style={styles.rightContainer}>
        <WheelPicker
          ref={flatListSecRef}
          data={seconds}
          selectedItem={selectedSecond}
          setSelectedItem={setSelectedSecond}
          //   itemHeight={vh * 6}
          type="seconds"
          onSelectItem={onSelectSecItem}
        />
      </View>
    </View>
  );
};

export default BreathPicker;

const styles = StyleSheet.create({
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
  },
});
