import {StyleSheet} from 'react-native';

import {colors} from '../../../theme/colors';
import {spacing} from '../../../theme/styles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
    // tintColor: 'blue',
  },
  text: {
    color: colors.text.primary,
    marginLeft: spacing.mediumh,
  },
});
export default styles;
