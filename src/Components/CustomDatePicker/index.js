import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomText from '../wrappers/Text/CustomText';
import fonts from '../../Assets/fonts';
import { font, spacing } from '../../theme/styles';
import { colors } from '../../theme/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import MyIcons from '../MyIcons';
import { vh, vw } from '../../theme/units';

const { width } = Dimensions.get('screen');

const CustomDatePicker = ({
  dateStyle,
  labelStyle,
  date,
  onDateChange,
  errors,
  label,
  maximumDate,
  customStyles,
  required
}) => {
  // Helper function to safely format date
  const getFormattedDate = d => {
    if (d && !isNaN(d) && d instanceof Date) {
      return d.toISOString().split('T')[0];
    }
    return '';
  };

  const [dob, setDob] = useState(getFormattedDate(date));
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Sync internal state with prop when date changes from parent
  useEffect(() => {
    setDob(getFormattedDate(date));
  }, [date]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDob(formattedDate);
      if (onDateChange) {
        onDateChange(selectedDate); // Pass full Date object to parent
      }
    }
  };

  return (
    <View style={[{ marginTop: -12 }, customStyles]}>
      <View style={[styles.doblabel, labelStyle]}>
        <CustomText
          // text={label ? label : 'Enter Date'}
          text={<>
            {label ? label : 'Enter Date'}
            {required && <CustomText text={' * '} style={styles.asterisk} />}
          </>}
          font={fonts.benzin.regular}
          size={font.small}
          color={colors.text.dimBlack}
        />

      </View>
      <TouchableOpacity
        style={[styles.dateContainer, dateStyle]}
        onPress={() => setShowDatePicker(true)}>
        <CustomText
          text={dob || 'Enter Date'}
          font={fonts.benzin.regular}
          size={font.small}
          color={dob ? colors.text.dimBlack : colors.text.grey}
        />
        <MyIcons name={'calendar'} />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          themeVariant='light'
          value={dob && !isNaN(new Date(dob)) ? new Date(dob) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          maximumDate={maximumDate ? maximumDate : new Date()}
          onChange={handleDateChange}
        />
      )}
      {errors && <Text style={styles.error}>{errors}</Text>}
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 60,
    borderRadius: 25,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    alignSelf: 'center',
    height: vh * 6.5,
    alignItems: 'center',
  },
  doblabel: {
    alignSelf: 'flex-start',
    marginLeft: spacing.large,
    gap: 5,
    backgroundColor: 'transparent',
    marginBottom: -5,
    zIndex: 999,
    paddingHorizontal: 5,
  },
  error: {
    color: colors.text.red,
    marginTop: vh * 0.5,
    marginLeft: spacing.medium,
    fontSize: vh * 1.5,
    fontStyle: 'italic',
  },
  asterisk: {color: colors.background.red},
});
