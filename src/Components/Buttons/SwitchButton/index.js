import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MyIcons from '../../MyIcons';

const SwitchButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleSwitch}
      activeOpacity={1}>
      <MyIcons name={isEnabled ? 'switchA' : 'switchC'} color="red" />
      <MyIcons name={isEnabled ? 'switchB' : 'switchD'} />
    </TouchableOpacity>
  );
};

export default SwitchButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
