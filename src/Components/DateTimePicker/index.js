import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {colors} from '../../theme/colors';
import {font, layout, spacing} from '../../theme/styles';
import {vh, vw} from '../../theme/units';
import {LabelComponent} from '../InputField';

import MyIcons from '../MyIcons';
import CustomText from '../wrappers/Text/CustomText';

export const DateTimePickerComponent = ({
  label,
  placeholder,
  icon,
  mode,
  required,
  style,
}) => {
  const [date, setDate] = useState(new Date(1598051730000));
  //   const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    // setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={{width: vw * 86}}>
      <LabelComponent label={label} required={required} />
      <TouchableOpacity style={[styles.container, style]} onPress={showMode}>
        <CustomText
          text={placeholder || 'Select date'}
          style={styles.placeholder}
        />
        {icon && <MyIcons name={icon} />}
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vh * 6.5,
    justifyContent: 'space-between',
    borderRadius: layout.borderRadius,
    paddingHorizontal: spacing.large,
    alignSelf: 'flex-start',
    width: '100%',
    backgroundColor: colors.input.background,
  },
  placeholder: {
    fontSize: font.medium,
    color: colors.text.dimWhite,
  },
});
