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
    backgroundColor: '#fff',
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
    flex: 1,
    alignItems: 'flex-end',
  },
  headerCol3: {
    flex: 2.2,
    justifyContent: 'center',
  },

  // Hero Section
  hero: {},
  poster: {
    height: vh * 30,
    width: '100%',
    resizeMode: 'contain',
    borderRadius: layout?.borderRadius,
  },
  heroCol1: {
    width: '100%',
    flex: 1,
  },

  // Footer Section
  footer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  footerRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  footerRow1Col1: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.small,
  },
  footerRow1Col2: {
    flex: 2,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: spacing.small,
  },
  footerRow2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 5,
  },
  footerRow2Col1: {
    flex: 1,
  },
  footerRow3: {},
  lightText: {
    fontSize: font?.medium,
    color: colors?.text?.altGrey,
  },
});

export default styles;
