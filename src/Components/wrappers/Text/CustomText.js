import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import fonts from '../../../Assets/fonts';
import {colors} from '../../../theme/colors';
const CustomText = ({
  text = '',
  size = 16,
  style = {},
  font = fonts.clash.regular,
  onPress = undefined,
  color,
  expandable = false,
  intialLength = 100,
  numberOfLines,
  underline,
}) => {
  const [textData, setTextData] = useState(text);
  useEffect(() => {
    if (expandable) {
      setTextData(`${text.slice(0, intialLength)}...`);
    } else {
      setTextData(text);
    }
  }, [text]);
  const toggleExpandable = () => {
    if (textData.length == text.length) {
      setTextData(`${text.slice(0, intialLength)}...`);
    } else {
      setTextData(text);
    }
  };
  const actionBtnLable =
    textData?.length == text?.length ? 'Read Less' : 'Read More';
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress ?? undefined}
      style={[
        {
          fontSize: size,
          color: color ?? colors.text.dimBlack,
          fontFamily: font,
          textDecorationLine: underline ? 'underline' : 'none',
        },
        style,
      ]}>
      {textData}
      {expandable ? '  ' : ''}
      {expandable && (
        <Text
          onPress={toggleExpandable}
          style={{
            color: colors.text.dimBlack,
            textDecorationLine: underline ? 'underline' : 'none',
            fontFamily: font,
            fontWeight: '500',
          }}>
          {actionBtnLable}
        </Text>
      )}
    </Text>
  );
};
export default CustomText;
