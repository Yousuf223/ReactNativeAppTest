import React, {useState, useRef} from 'react';
import {View, Text, FlatList, Dimensions, StyleSheet} from 'react-native';
import {vh} from '../../theme/units';

const AgePicker = ({
  data,
  boxWidth = false,
  boxHeight,
  boxSelectedHeight,
  onSelect // Add the onSelect prop
}) => {
  const [selectedAge, setSelectedAge] = useState(22);
  const flatListRef = useRef(null);

  const ITEM_WIDTH = Dimensions.get('window').width / 5;

  const handleScroll = event => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / ITEM_WIDTH);
    const selectedValue = data[index];
    setSelectedAge(selectedValue);
    onSelect && onSelect(selectedValue); // Call onSelect when a value is selected
  };

  const renderItem = ({item}) => {
    const isSelected = item === selectedAge;
    return (
      <View
        style={[styles.itemContainer, {width: ITEM_WIDTH, height: vh * 30}]}>
        <Text
          style={[
            styles.itemText,
            isSelected ? styles.selectedText : styles.unselectedText,
          ]}>
          {item}
        </Text>
        <View
          style={[
            styles.line,
            {
              height: isSelected
                ? boxSelectedHeight || 100
                : boxHeight || 60,
            },
            isSelected ? styles.selectedLine : styles.unselectedLine,
          ]}
        />
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      horizontal
      style={{alignSelf: 'center'}}
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      bounces={false}
      keyExtractor={item => item.toString()}
      renderItem={renderItem}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={[
        styles.flatListContainer,
        {
          paddingHorizontal: boxWidth
            ? Dimensions.get('window').width / 2.2 - ITEM_WIDTH / 2
            : Dimensions.get('window').width / 2 - ITEM_WIDTH / 2,
        },
      ]}
    />
  );
};


const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  itemText: {
    fontSize: 24,
  },
  selectedText: {
    color: '#00A0A0',
    fontSize: 32,
  },
  unselectedText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  line: {
    height: 60,
    width: 2,
    marginTop: 10,
  },
  selectedLine: {
    backgroundColor: '#00A0A0',
    height: 90,
  },
  unselectedLine: {
    backgroundColor: '#FFFFFF',
  },
  flatListContainer: {
    alignSelf: 'center',
  },
});

export default AgePicker;
