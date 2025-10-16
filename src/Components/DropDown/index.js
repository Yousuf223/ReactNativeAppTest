import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { LabelComponent } from '../InputField';
import { font, layout, spacing } from '../../theme/styles';
import { vh, vw } from '../../theme/units';
import { colors } from '../../theme/colors';
import MyIcons from '../MyIcons';
import fonts from '../../Assets/fonts';
import Animated, { BounceIn, FadeOut } from 'react-native-reanimated';

const DropDown = ({
  label,
  placeholder,
  required,
  textColor,
  boxStyles,
  onValueChange,
  dynamicData = [],
  style,
  errors,
  initialValue, // could be either an ID or a value
  matchBy = 'id', // default matching key
}) => {

  const [selected, setSelected] = useState('');

  // Find the item in dynamicData based on match type (id or value)
  const findInitialItem = () => {
    if (!initialValue || !dynamicData.length) return null;
    return dynamicData.find(d => d[matchBy] === initialValue) || null;
  };

  // Update when dynamicData or initialValue changes
  useEffect(() => {
    const item = findInitialItem();
    if (item) setSelected(item.value);
  }, [initialValue, dynamicData]);

  const handleSelect = (val) => {
    setSelected(val);
    const selectedItem = dynamicData.find(d => d.value === val);
    if (onValueChange && selectedItem) {
      onValueChange(selectedItem);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Floating Label */}
      <View style={styles.labelWrapper}>
        <LabelComponent label={label} required={required} />
      </View>

      <SelectList
        placeholder={placeholder}
        setSelected={handleSelect}
        data={dynamicData}
        search={false}
         save="value" 
        fontFamily={fonts.benzin.regular}
        boxStyles={[styles.boxContainer, boxStyles]}
        arrowicon={<MyIcons name={'downArow'} />}
        dropdownStyles={styles.dropDownContainer}
        inputStyles={{
          flex: 1,
          paddingHorizontal: 5,
          color: textColor || colors.text.grey,
          fontSize: font.small,
        }}
        dropdownTextStyles={{ color: colors.text.dimBlack }}
        defaultOption={findInitialItem() || undefined}
      />

      {/* Error Animation */}
      {errors ? (
        <Animated.View
          exiting={FadeOut.duration(600)}
          entering={BounceIn.duration(300)}>
          <Text style={styles.error}>{errors}</Text>
        </Animated.View>
      ) : null}
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
  labelWrapper: {
    zIndex: 999,
    left: 35,
    position: 'absolute',
    top: -12,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  error: {
    color: colors.text.red,
    marginTop: vh * 0.5,
    marginLeft: vw * 1,
    fontSize: vh * 1.5,
    fontStyle: 'italic',
  },
});
