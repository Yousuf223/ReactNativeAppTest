// DaysOfMonth.js
import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from '../wrappers/Text/CustomText';
import {colors} from '../../theme/colors';
import {font} from '../../theme/styles';
import fonts from '../../Assets/fonts';
import {vh, vw} from '../../theme/units';
import {workoutDataBlock} from '../../Utils/dummyData';

const DaysOfMonth = () => {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);
    setDays(daysArray);
  }, []);

  const handleDaySelect = day => {
    setSelectedDay(day);
    console.log(`Selected day: ${day}`);
  };

  const getShortDayName = day => {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);
    return date.toLocaleString('default', {weekday: 'short'});
  };

  const renderDay = ({item}) => {
    const isSelected = item === selectedDay;
    return (
      <TouchableOpacity
        style={[styles.dayContainer, isSelected && styles.selectedDay]}
        onPress={() => handleDaySelect(item)}>
        <CustomText
          font={fonts?.benzin?.medium}
          color={isSelected ? colors?.theme?.white : colors?.theme?.black}
          size={font?.xlarge}
          text={item}
        />
        <CustomText
          size={font?.small}
          font={fonts?.clash?.regular}
          text={getShortDayName(item)}
          color={isSelected ? colors?.theme?.white : '#606060'}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={days}
        renderItem={renderDay}
        keyExtractor={item => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {/* Display data for the selected day */}
      {selectedDay && (
        <View style={styles.dataContainer}>
          {workoutDataBlock.map((block, index) => (
            <View key={index} style={styles.block}>
              <CustomText
                font={fonts?.benzin?.medium}
                color={colors?.theme?.white}
                size={font?.xlarge}
                text={block.title}
              />
              <CustomText
                font={fonts?.benzin?.medium}
                color={colors?.theme?.white}
                size={font?.medium}
                text={block.details}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  dayContainer: {
    width: vw * 13,
    height: vw * 15,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDay: {
    backgroundColor: '#098B8E',
  },
  dataContainer: {
    marginTop: 20,
    padding: 15,
    gap: vh * 3,
    borderRadius: 10,
    width: '100%',
  },
  dataText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DaysOfMonth;
