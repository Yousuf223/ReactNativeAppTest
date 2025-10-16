import {font, header, layout, spacing} from '../../../theme/styles';
import {statusBarHeight, vh, vw} from '../../../theme/units';

import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    height: header.authHeight,
    paddingTop: statusBarHeight,
    paddingHorizontal: vw * 8,
    backgroundColor: colors.background.header,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  mainContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: -vh * 3,
  },
  headerTitle: {
    fontSize: font.xxlarge,
  },
  headerSubTitle: {
    fontSize: font.xsmall,
  },
  avatar: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: -vh * 4.5,
  },
  contentContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: layout.contentWidth,
  },
  verificationCodeInput: {
    marginBottom: spacing.smallh,
  },
  forgotText: {
    alignSelf: 'flex-end',
    marginRight: spacing.xlargeh,
    marginBottom: spacing.small,
  },
  submitButton: {
    marginTop: spacing.small,
  },
});
export default styles;
