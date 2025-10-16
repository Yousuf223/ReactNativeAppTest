import {StyleSheet} from 'react-native';
import {spacing} from '../../../theme/styles';
import {colors} from '../../../theme/colors';
import {vh, vw} from '../../../theme/units';
import fonts from '../../../Assets/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: spacing.large,

    gap: spacing.large,
  },
  detailContainer: {
    width: '100%',
    padding: spacing?.large,
    // paddingHorizontal: spacing?.large
    // borderWidth: 1,
    // borderColor: colors?.theme?.border,
    borderRadius: 10,
  },
  inputContainer: {
    borderRadius: 15,
    backgroundColor: colors.theme?.white,
    borderWidth: 1,
    borderColor: colors.theme?.border,
    width: '100%',
    marginBottom: vh * 5,
    alignItems: 'center',
    // marginBottom: spacing?.large,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.theme?.lightGray,
    width: '100%',
    alignSelf: 'center',
    marginTop: -20,
  },
});
