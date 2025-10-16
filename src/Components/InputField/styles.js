import {appShadow, colors} from '../../theme/colors';
import {font, layout, spacing} from '../../theme/styles';

import {StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/units';
import fonts from '../../Assets/fonts';

const styles = StyleSheet.create({
  container: {
    width: layout.contentWidth,
    marginBottom: spacing.medium,
    paddingHorizontal: spacing.mediumh,
    position: 'relative',
  },
  label: {
    // marginLeft: spacing.largeh,
    // marginBottom: spacing.small,
    color: colors?.theme?.black,
    fontSize: font.small,
  },
  leftIcon: {
    marginHorizontal: spacing.small,
  },
  multilineContainer: {height: vh * 18, alignItems: 'flex-start', borderRadius: 15},
  multiline: {textAlignVertical: 'top'},
  inputContainer: {
    ...layout.flexRow,
    height: vh * 6.5,
    justifyContent: 'space-between',
    borderRadius: layout.borderRadius,
    paddingHorizontal: spacing.mediumh,
    backgroundColor: colors.theme?.white,
    borderWidth: 1,
    borderColor: colors.theme?.border,
    // marginBottom: spacing?.large,
  },
  asterisk: {color: colors.background.red},
  inputStyle: {
    fontSize: font.small,
    color: colors.text.dimBlack,
    flex: 1,
    fontFamily: fonts.benzin.regular,
  },
  eye: {
    height: vh * 1.75,
    width: vh * 1.75,
    marginHorizontal: spacing.smallh,
  },
  rightIcon: {
    height: vh * 1.25,
    width: vh * 1.25,
    marginHorizontal: spacing.smallh,
  },
  highlightEye: {tintColor: colors.theme.primary + 'dd'},
  focusedContainer: {
    borderColor: colors.theme.secondary,
    borderWidth: 1,
    // backgroundColor: colors.input.focusBg,
  },
  error: {
    color: colors.text.red,
    marginTop: vh * 0.5,
    marginLeft: vw * 1,
    fontSize: vh * 1.5,
    fontFamily: fonts.benzin.regular,
  },
  eyeButton:{
      position: 'absolute',
  right: 15,
  alignSelf: 'center',
  }
});
export default styles;
