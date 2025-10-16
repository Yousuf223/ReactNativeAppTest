import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {vh, vw} from '../../theme/units';
import {colors} from '../../theme/colors';

import SpaceLine from '../SpaceLine';
import MyIcons from '../MyIcons';
import CustomText from '../wrappers/Text/CustomText';

const TemplateItem = ({item, index, numColumns, onPress}) => {
  // Apply marginTop for items in the second column
  const isSecondColumnItem = index % numColumns === 1; // If index is 1 for 2-column, 1 and 2 for 3-column layouts
  const itemStyle = isSecondColumnItem ? styles.secondColumnItem : null;

  const renderDailyTaskForm = () => {
    return (
      <View style={{position: 'relative'}}>
        {item.selected && checkMark()}
        <SpaceLine style={styles.spaceLine} />
        <CustomText text={'Due Date'} style={{fontSize: 12}} />
        <SpaceLine />
        <View style={[styles.fieldContainer, styles.contentField]}>
          <CustomText text={'MM-DD-YYYY'} style={styles.text} />
          <MyIcons
            name={'calendar'}
            size={13}
            stroke={colors.input.background}
          />
        </View>
        <SpaceLine style={styles.spaceLine} />
        <View style={styles.row}>
          <CustomText text={'Category'} style={{fontSize: 12}} />
          <CustomText text={'*'} style={{color: colors.text.red}} />
        </View>
        <SpaceLine />
        <View style={[styles.fieldContainer, styles.contentField]}>
          <CustomText text={'Please Select'} style={styles.text} />
          <MyIcons
            name={'downArow'}
            size={13}
            stroke={colors.input.background}
          />
        </View>
        <SpaceLine />
        <View style={styles.row}>
          <CustomText text={'Task'} style={{fontSize: 12}} />
          <CustomText text={'*'} style={{color: colors.text.red}} />
        </View>
        <SpaceLine />
        <View style={styles.fieldContainer}></View>
      </View>
    );
  };

  const renderWorkOutForm = () => {
    return (
      <View style={{position: 'relative'}}>
        {item.selected && checkMark()}
        <SpaceLine style={styles.spaceLine} />
        <CustomText text={'Exercise'} style={{fontSize: 12}} />
        <View style={styles.fieldContainer} />
        <SpaceLine style={styles.spaceLine} />
        <CustomText text={'Intensity'} style={{fontSize: 12}} />
        <View style={styles.row}>
          <MyIcons name={'star'} />
          <MyIcons name={'star'} />
          <MyIcons name={'star'} />
          <MyIcons name={'star'} />
        </View>
        <SpaceLine style={styles.spaceLine} />
        <CustomText text={'Reps'} style={{fontSize: 12}} />
        <View style={[styles.fieldContainer, styles.contentField]}>
          <CustomText text={'ex.23'} style={styles.text} />
        </View>
      </View>
    );
  };

  const checkMark = () => {
    return (
      <View style={styles.checkMark}>
        <MyIcons name={'tick'} stroke={colors.theme.white} size={30} />
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.templateBox, itemStyle]}
      onPress={() => onPress(item)}>
      <CustomText text={item.title} style={{fontSize: 16}} numberOfLines={2} />
      {item.category === 'task' && renderDailyTaskForm()}
      {item.category === 'workout' && renderWorkOutForm()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  templateBox: {
    // height: vh * 40, // Approx 30% of the screen height
    width: vw * 43, // 40% of screen width
    borderColor: colors.border.color_1,
    borderWidth: 1,
    margin: 8,
    padding: 10,
  },
  secondColumnItem: {
    marginTop: vh * 5,
  },
  fieldContainer: {
    borderWidth: 2,
    borderColor: colors.input.background,
    height: 40,
  },
  contentField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 10,
    color: colors.text.altGrey,
  },
  row: {
    flexDirection: 'row',
  },
  spaceLine: {
    margin: 10,
  },
  checkMark: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    backgroundColor: colors.theme.secondary,
    position: 'absolute',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
    top: '60%',
    left: '70%',
    transform: [{translateX: -50}, {translateY: -50}],
  },
});

export default TemplateItem;
