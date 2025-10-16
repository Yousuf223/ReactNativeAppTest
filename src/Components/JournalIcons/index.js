import React, {useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import MyIcons from '../MyIcons';
import {vh, vw} from '../../theme/units';
import {colors} from '../../theme/colors';
// import {SelectList} from 'react-native-dropdown-select-list';

const JournalItems = ({itemArray, handleSelect}) => {
  const [itemOptions, setItemOptions] = useState(
    itemArray
      ? itemArray
      : [
          {title: 'files', icon: 'filesGroup'},
          {title: 'file', icon: 'file'},
          {title: 'mic', icon: 'mic'},
          {title: 'video', icon: 'video'},
          {title: 'attach', icon: 'attach'},
          {title: 'colour', icon: 'colorPicker'},
        ],
  );

  // const handleSelect = indx => {
  //   console.log('Selected Icon >>>', indx);
  //   // const updatedOptions = itemOptions.map((v, i) =>
  //   //   i === indx ? { ...v, selected: !v.selected } : { ...v, selected: false }
  //   // );
  //   // setItemOptions(updatedOptions); // Update the state with the new array
  // };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      style={{width: vw * 50}}>
      <View style={styles.iconsContainer}>
        {itemOptions.map((method, index) => {
          return method.title == 'font' ? (
            <View>
              {/* <SelectList
                // onSelect={() => alert(selected)}
                placeholder={'placeholder'}
                // setSelected={setSelected}
                // fontFamily='lato'
                data={[1, 2, 3]}
                // search={false}
                // boxStyles={styles.boxContainer} //override default styles
                arrowicon={<MyIcons name={'downArow'} />}
                dropdownStyles={styles.dropDownContainer}
              /> */}
            </View>
          ) : (
            <TouchableOpacity
              key={index}
              style={[
                method.bgColor
                  ? styles.iconBgWhite
                  : method.title === 'colour'
                  ? styles.colorIcon
                  : styles.iconBg,
              ]}
              onPress={() => handleSelect(method?.title)}>
              <MyIcons
                name={method.icon}
                size={method.title === 'colour' ? 35 : 17}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.altGrey2,
    borderRadius: 10,
    height: vh * 7,
    // marginRight: vh * 20
    // width: vw * 50
  },
  scrollContainer: {
    // width: vw * 50,
    // width: vw * 55
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
    backgroundColor: colors.background.altGrey1,
  },
  iconBgWhite: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: colors.theme.white,
  },
  colorIcon: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  dropDownContainer: {
    backgroundColor: colors.input.background,
    borderColor: colors.input.background,
  },
});

export default JournalItems;
