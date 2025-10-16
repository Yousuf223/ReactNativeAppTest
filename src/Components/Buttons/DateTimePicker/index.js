import {View, TouchableOpacity, Platform} from 'react-native';
import React, {useState, useRef} from 'react';
import CustomText from '../../wrappers/Text/CustomText';

const DateTimePicker = () => {
  const [dateCheckin, setDateCheckin] = useState(new Date());
  const [showCheckinPicker, setShowCheckinPicker] = useState(false);
  const successPopRef = useRef(null);
  const applicationSubmitPopRef = useRef(null);

  const onChangeCheckinPicker = (event, selectedDate) => {
    const currentDate = selectedDate || dateCheckin;
    setShowCheckinPicker(Platform.OS === 'ios');
    setDateCheckin(currentDate);
  };

  const handleCheckin = () => {
    setShowCheckinPicker(true);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleCheckin}
        style={styles?.datepickerButton}
        activeOpacity={0.9}>
        <CustomText
          text={dateCheckin ? dateCheckin.toLocaleDateString() : 'DD/MM/YY'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DateTimePicker;
