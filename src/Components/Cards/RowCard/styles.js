import {StyleSheet} from 'react-native';
import {vh, vw} from '../../../theme/units';
import {font, layout, spacing} from '../../../theme/styles';
import fonts from '../../../Assets/fonts';
import {colors} from '../../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.small,
    gap: spacing.small,
  },
  // Header Section
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing?.small,
  },
  profileStyles: {
    height: vw * 14,
    width: vw * 14,
    resizeMode: 'contain',
    borderRadius: vw * 14,
  },

  headerCol1: {
    flex: 0.8,
    justifyContent: 'center',
  },
  headerCol2: {
    flex: 1.6,
    alignItems: 'flex-start',
  },
  headerCol3: {
    flex: 1.6,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btnStyles: {
    backgroundColor: colors?.theme?.secondary,
    paddingHorizontal: spacing?.medium,
    paddingVertical: spacing?.small,
    borderRadius: 6,
  },
  lightText: {
    color: colors?.text?.white,
  },
});

export default styles;
