import {font, layout, spacing} from '../../../theme/styles';

import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {vh} from '../../../theme/units';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: vh * 6.5,
    borderRadius: layout.borderRadius,
    width: layout.contentWidth - spacing.xlarge,
    backgroundColor: colors.theme.white,
    borderWidth: 1,
    borderColor: colors.theme.secondary,
  },
  textStyle: {
    fontSize: font.medium,
    color: colors.text.dimBlack,
  },
});
export default styles;
