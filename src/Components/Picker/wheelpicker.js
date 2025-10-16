import React, {useImperativeHandle, forwardRef, useRef} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {vh} from '../../theme/units';
import fonts from '../../Assets/fonts';
import {font, spacing} from '../../theme/styles';
import {colors} from '../../theme/colors';

var totalHeight = vh * 18;
var totalHeight2Times = totalHeight / 2;
var totalHeight3Times = totalHeight / 3;

const WheelPicker = forwardRef(
  (
    {
      data,
      selectedItem,
      setSelectedItem,
      itemHeight = vh * 6,
      type,
      onSelectItem, // Callback prop for the selected item
    },
    ref,
  ) => {
    const flatListRef = useRef(null);

    const handleScroll = event => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / itemHeight);
      if (index >= 0 && index < data.length) {
        setSelectedItem(index); // Update selected item state
        if (onSelectItem) {
          // Trigger callback if provided
          onSelectItem(data[index]);
        }
      }
    };

    // Method to reset the WheelPicker (scroll to the top or specific index)
    const resetPicker = (index = 0) => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: index * itemHeight,
          animated: true,
        });
        setSelectedItem(index); // Reset the selected item
        if (onSelectItem) {
          onSelectItem(data[index]); // Optionally call the callback
        }
      }
    };

    // Expose the resetPicker method to the parent via ref
    useImperativeHandle(ref, () => ({
      resetPicker,
    }));

    const renderItem = ({item, index}) => (
      <View
        style={[
          styles.item,
          index === selectedItem && styles.selectedItem,
          type === 'seconds' && styles.selectedSecItem,
        ]}>
        <Text
          style={[
            styles.itemText,
            index === selectedItem && styles.selectedText,
            type === 'seconds' &&
              index === selectedItem &&
              styles.selectedSecText,
          ]}>
          {item < 10 ? `0${item}` : item}
        </Text>
      </View>
    );

    return (
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          type == 'seconds' && styles?.forSecondContent,
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={(data, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        style={{height: totalHeight}}
      />
    );
  },
);

export default WheelPicker;

const styles = StyleSheet.create({
  itemText: {
    fontSize: font.xxlarge,
    fontFamily: fonts.benzin.semibold,
    color: '#818387',
  },
  item: {
    height: totalHeight3Times,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    borderWidth: 1.2,
    borderColor: colors.theme.primary,
    height: totalHeight3Times,
    borderRadius: 20,
  },
  selectedText: {
    color: colors.text.white,
    fontSize: font.xxlarge + font.small,
    fontFamily: fonts.benzin.bold,
  },
  selectedSecItem: {
    height: totalHeight2Times,
    borderRadius: 20,
    borderWidth: 0,
  },
  selectedSecText: {
    color: colors.text.white,
    fontSize: font.xxlarge,
    fontFamily: fonts.benzin.bold,
  },
  listContent: {
    paddingVertical: totalHeight3Times,
    paddingHorizontal: spacing.medium,
  },
  forSecondContent: {
    paddingVertical: totalHeight2Times / 2,
    paddingHorizontal: spacing.small,
  },
});
