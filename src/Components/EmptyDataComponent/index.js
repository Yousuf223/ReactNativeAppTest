import React from 'react';
import {StyleSheet, View} from 'react-native';
import fonts from '../../Assets/fonts';
import {font} from '../../theme/styles';
import {colors} from '../../theme/colors';
import CustomText from '../wrappers/Text/CustomText';

const EmptyDataComponent = ({message = 'No data available!'}) => {
  return (
    <View style={styles.container}>
      <CustomText
        text={message}
        size={font.medium}
        color={colors.text.placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default EmptyDataComponent;
