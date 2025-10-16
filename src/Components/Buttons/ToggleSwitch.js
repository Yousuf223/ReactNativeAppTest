import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

const ToggleSwitch = ({initialState = false, onToggle, isSquare}) => {
  const [isOn, setIsOn] = useState(initialState);

  const toggleSwitch = () => {
    setIsOn(prev => !prev);
  };

  useEffect(() => {
    onToggle(isOn);
  }, [isOn, onToggle]);

  return (
    <>
      {!isSquare ? (
        <TouchableOpacity
          onPress={toggleSwitch}
          style={[
            styles.container,
            isOn ? styles.onBackground : styles.offBackground,
          ]}>
          <View
            style={[
              styles.toggleCircle,
              isOn ? styles.onPosition : styles.offPosition,
            ]}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={toggleSwitch}
          style={[styles.container2, styles.offBackground]}>
          <View
            style={[
              styles.toggleCircle2,
              {backgroundColor: isOn ? '#098B8E' : 'white'},
              isOn ? styles.onPosition : styles.offPosition,
            ]}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 54,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 5,
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  container2: {
    width: 53,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    padding: 5,
  },
  toggleCircle2: {
    width: 23,
    height: 23,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  onBackground: {
    backgroundColor: '#4CD137',
  },
  offBackground: {
    backgroundColor: '#4F4F4F',
  },
  onPosition: {
    alignSelf: 'flex-end',
  },
  offPosition: {
    alignSelf: 'flex-start',
  },
});

export default ToggleSwitch;
