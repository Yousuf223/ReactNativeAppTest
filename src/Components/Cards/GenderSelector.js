import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MyIcons from '../MyIcons';
import {font, layout, spacing} from '../../theme/styles';
import {FastField} from 'formik';
import {appImages} from '../../Assets/Images';
import {colors} from '../../theme/colors';
import CustomText from '../wrappers/Text/CustomText';
import {vh, vw} from '../../theme/units';
import fonts from '../../Assets/fonts';

const GenderSelector = ({data, customStyle, boxHeight, onSelect}) => {
  const [selected, setSelected] = React.useState(null);

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            style={[
              styles.genderSelect,
              index === selected && styles.activeBorder,
            ]}
            key={index}
            onPress={() => {
              setSelected(index);
              console.log('INDEX: ', item?.title);
              onSelect && onSelect(item?.title);
            }}>
            {item?.iconSrc && (
              <View
                style={[
                  styles.imageWrapper,
                  {backgroundColor: item?.iconBgColor, height: boxHeight},
                ]}>
                <Image
                  source={{uri:item?.iconSrc}}
                  style={customStyle ? customStyle : styles.image}
                  resizeMode="contain"
                />
              </View>
            )}
            <CustomText
              text={item?.title}
              size={font.xlarge}
              font={fonts.benzin.regular}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default GenderSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  genderSelect: {
    backgroundColor: colors.theme.background,
    borderRadius: layout.borderRadius,
    flexBasis: '48%',
    marginBottom: spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.medium,
    gap: spacing.medium,
    borderWidth: 2,
    borderColor: colors.theme.background,
  },
  image: {
    height: font.xxlarge + font.xxlarge,
    width: font.xxlarge + font.xxlarge,
  },
  imageWrapper: {
    backgroundColor: 'red',
    borderRadius: 100,
    width: vw * 16,
    height: vw * 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBorder: {
    borderWidth: 2,
    borderColor: colors.theme.primary,
  },
});
