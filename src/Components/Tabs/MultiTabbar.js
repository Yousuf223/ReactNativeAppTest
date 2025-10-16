import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../theme/colors';
import {font, layout, spacing} from '../../theme/styles';
import CustomText from '../wrappers/Text/CustomText';
import fonts from '../../Assets/fonts';

const MultiTabbar = ({labels, activeBgColor, onPress, isActive}) => {
  const [selectedId, setSelectedId] = useState(0);

  const handleClick = activeId => {
    setSelectedId(activeId);
    onPress(activeId);
  };

  return (
    <View style={styles.buttonWrapper}>
      {labels.map((eachLabel, id) => (
        <TouchableOpacity
          key={id}
          onPress={() => handleClick(id)}
          style={styles.buttonContainer}>
          <LinearGradient
            colors={
              selectedId === id
                ? ['#FF1A00', '#FF2E00', '#AF0000']
                : ['transparent', 'transparent', 'transparent']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.btnWrap}>
            <CustomText
              text={eachLabel.title}
              color={
                selectedId === id ? colors.text.white : colors.text.dimBlack
              }
              font={fonts.clash?.semibold}
              size={font.medium}
            />
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MultiTabbar;

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.theme.border,
    borderRadius: layout.borderRadius,
    paddingVertical: spacing.xxsmall,
    paddingHorizontal: spacing.xsmall,
    // backgroundColor: colors.theme.black,
  },
  buttonContainer: {
    flex: 1,
  },
  btnWrap: {
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.small + 8,
    borderRadius: layout.borderRadius,
    alignItems: 'center',

    justifyContent: 'center',
  },
  // labelText: {
  //   color: colors.text.white,
  // },
});
