import { appShadow, colors } from '../../theme/colors';
import { vh, vw } from '../../theme/units';

import { StyleSheet } from 'react-native';
import { font, spacing } from '../../theme/styles';

const styles = StyleSheet.create({
  checkContainer: {
    backgroundColor: colors.background?.altGrey2,
    height: vh * 2.5,
    width: vh * 2.5,
    borderWidth: 1,
    borderColor: colors.theme.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.smallh,
    borderRadius: vh * 0.5,
  },
  check: {
    height: vh * 1.15,
    width: vh * 1.15,
    resizeMode: 'contain',
    tintColor: colors.theme.primary + '99',
  },
  text: {
    color: colors.text.dimBlack,
    fontSize: font.small,

  },
  error: {
    color: colors.text.red,
    marginTop: vh * 0.5,
    marginLeft: vw * 1,
    fontSize: vh * 1.5,
    fontStyle: 'italic',
  },
});
export default styles;
