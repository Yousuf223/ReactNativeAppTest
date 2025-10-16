import React, {useState} from 'react';
import {ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import MyIcons from '../MyIcons';
import {vh, vw} from '../../theme/units';

import {colors} from '../../theme/colors';
import CustomText from '../wrappers/Text/CustomText';

const ItemOptions = () => {
  const [itemOptions, setItemOptions] = useState([
    {title: 'Records', icon: 'record', selected: true},
    {title: 'Media', icon: 'media', selected: false},
    {title: 'Days', icon: 'days', selected: false},
    {title: 'Sent', icon: 'sent', selected: false},
  ]);

  const handleSelect = indx => {
    const updatedOptions = itemOptions.map((v, i) =>
      i === indx ? {...v, selected: !v.selected} : {...v, selected: false},
    );
    setItemOptions(updatedOptions); // Update the state with the new array
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}>
      {itemOptions.map((method, index) => (
        <TouchableOpacity
          key={index}
          style={method.selected ? styles.selectedBtn : styles.iconContainer}
          onPress={() => handleSelect(index)}>
          <View
            style={[
              styles.iconBg,
              {
                backgroundColor: method.selected
                  ? colors.theme.white
                  : colors.background.altGrey,
              },
            ]}>
            <MyIcons
              name={method.icon}
              size={17}
              stroke={method.selected ? colors.background.altGrey : null}
            />
          </View>
          <CustomText
            text={method.title}
            style={{color: method.selected ? colors.theme.white : '#000'}}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    height: vh * 10,
  },
  iconContainer: {
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.border.color_1,
    borderWidth: 1,
    borderRadius: 10,
    width: vw * 27,
    height: vh * 7,
  },
  selectedBtn: {
    backgroundColor: colors.theme.secondary,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: vw * 27,
    height: vh * 7,
  },
  iconBg: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
});

export default ItemOptions;
