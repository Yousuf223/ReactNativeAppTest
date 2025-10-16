import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import { SelectList } from '@cods-cyber/react-native-dropdown-select-list';
import {LabelComponent} from '../InputField';
import {font, layout, spacing} from '../../theme/styles';
import {vh, vw} from '../../theme/units';
import {colors} from '../../theme/colors';
import MyIcons from '../MyIcons';
import fonts from '../../Assets/fonts';
import Animated, {BounceIn, FadeOut} from 'react-native-reanimated';

const DropDown = ({
  label,
  placeholder,
  required,
  textColor,
  boxStyles,
  onValueChange,
  dynamicData,
  style,
  errors,
  initialValue, // Keep the original prop name
}) => {
  // Find the key corresponding to the initialValue (which is the id)
  const findInitialKey = () => {
    if (!initialValue || !dynamicData) return '';
    const item = dynamicData.find(d => d.id === initialValue); // Match by id
    return item ? item.key : '';
  };

  const [selected, setSelected] = useState(findInitialKey);

  // Sync selected state with initialValue and dynamicData changes
  useEffect(() => {
    setSelected(findInitialKey());
  }, [initialValue, dynamicData]);

  const data = [
    {key: '0', value: 'Category 1'},
    {key: '1', value: 'Category 2'},
    {key: '2', value: 'Category 3'},
    {key: '3', value: 'Category 4'},
  ];

  const handleSelect = key => {
    setSelected(key);
    if (onValueChange) {
      const val = dynamicData ? dynamicData[key]?.value : data[key]?.value;
      const id = dynamicData ? dynamicData[key]?.id : data[key]?.id;
      onValueChange(val || '', id);
    }
  };

  // Find the default option for SelectList based on initialValue (id)
  const defaultOption = dynamicData?.find(d => d.id === initialValue);

  return (
    <View style={[styles.container, style]}>
      <View
        style={{
          zIndex: 999,
          left: 35,
          position: 'absolute',
          top: -15,
          backgroundColor: 'transparent',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
        <LabelComponent label={label} required={required} />
      </View>
      {/* <SelectList
        placeholder={placeholder}
        setSelected={handleSelect}
        fontFamily={fonts.benzin.regular}
        data={dynamicData ? dynamicData : data}
        search={false}
        boxStyles={[styles.boxContainer, boxStyles]}
        arrowicon={<MyIcons name={'downArow'} />}
        dropdownStyles={styles.dropDownContainer}
        inputStyles={{
          flex: 1,
          paddingHorizontal: 5,
          color: textColor ? textColor : colors.text.grey,
          fontSize: font.small,
        }}
        dropdownTextStyles={{color: colors.text.dimBlack}}
        defaultOption={defaultOption} // Preselect based on id
      /> */}
      {errors ? (
        <Animated.View
          exiting={FadeOut.duration(600)}
          entering={BounceIn.duration(300)}>
          <Text style={styles.error}>{errors}</Text>
        </Animated.View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  boxContainer: {
    ...layout.flexRow,
    height: vh * 6.5,
    justifyContent: 'space-between',
    borderRadius: layout.borderRadius,
    paddingHorizontal: spacing.mediumh,
    backgroundColor: colors.theme?.white,
    borderWidth: 1,
    borderColor: colors.theme?.border,
  },
  dropDownContainer: {
    borderColor: colors.theme?.border,
  },
  container: {
    width: layout.contentWidth,
    marginBottom: spacing.medium,
    paddingHorizontal: spacing.mediumh,
    position: 'relative',
  },
  error: {
    color: colors.text.red,
    marginTop: vh * 0.5,
    marginLeft: vw * 1,
    fontSize: vh * 1.5,
    fontStyle: 'italic',
  },
});
