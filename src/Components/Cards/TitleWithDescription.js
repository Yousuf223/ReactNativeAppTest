import React from 'react';
import {View} from 'react-native';
import fonts from '../../Assets/fonts';
import {font} from '../../theme/styles';
import CustomText from '../wrappers/Text/CustomText';

const TitleWithDescription = ({title, description}) => {
  return (
    <View>
      <CustomText
        text={title ? title : 'Title'}
        font={fonts.benzin.regular}
        size={font.xxlarge + font.xxlarge}
        style={{
          textAlign: 'center',
          lineHeight: font.xxlarge + font.xxlarge + font.small,
        }}
      />
      <CustomText
        text={description ? description : 'Description'}
        font={fonts.clash.regular}
        size={font.xlarge}
        style={{textAlign: 'center'}}
      />
    </View>
  );
};

export default TitleWithDescription;
