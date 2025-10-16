import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import { font } from '../../../theme/styles';
import fonts from '../../../Assets/fonts';
import { vh, vw } from '../../../theme/units';
import { colors } from '../../../theme/colors';
import { appImages } from '../../../Assets/Images';
import { MainButton } from '../../../Components/Buttons/MainButton';
import { styles } from '../styles';
const Step03 = ({ titleData, banner, onButtonNext }) => {
  return (
    <View>
      {titleData && (
        <View style={{ marginHorizontal: '5%' ,marginTop:12}}>
          <CustomText
            text={`Keep Repairs`}
            size={vh * 4.5}
            font={fonts.clash.bold}
            color={colors.text.dimBlack}
          />
          <CustomText
            text={`Records`}
            size={vh * 4.5}
            font={fonts.clash.bold}
            color={colors.text.dimBlack}
            style={{ marginBottom: 10 }}
          />
          <CustomText
            text={`Keep repairs and services done on your vehicles`}
            size={font.medium}
            font={fonts.benzin.regular}
            color={colors.text.dimBlack}
          />
        </View>
      )}
      {banner && (
        <>
          <Image
            source={appImages.appstarter2}
            resizeMode="stretch"
            style={[styles.banner, { height: 350 }]}
          />
          <MainButton
            title={'Next'}
            style={styles.buttonStyle}
            onPress={onButtonNext}
          />
        </>
      )}
    </View>
  );
};

export default Step03;
