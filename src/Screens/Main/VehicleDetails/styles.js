import {StyleSheet, Text, View} from 'react-native';
import {spacing} from '../../../theme/styles';
import {colors} from '../../../theme/colors';
import {vh, vw} from '../../../theme/units';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: spacing.large,
    alignItems: 'center',
    marginTop: vh * 2,
  },
  batterycontainer: {
    // borderWidth: 1,
    width: '100%',
    // borderRadius: 10,
    // borderColor: colors.text.grey,
    padding: 15,
    paddingVertical: 10,
    paddingHorizontal: spacing.large,
  },
  line: {
    width: '60%',
    backgroundColor: colors.text.grey,
    height: 1,
  },
  line1: {
    width: '50%',
    backgroundColor: colors.text.grey,
    height: 1,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 20,
  },
  editbutton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.background.red,
  },
  transheadercontainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  headerline: {
    width: '70%',
    height: 1,
    backgroundColor: colors.text.grey,
  },

  recentpurchase: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    padding: spacing.small,
    borderRadius: 10,
    borderColor: colors.text.grey,
    marginVertical: 5,
  },
  contentContainerStyle: {
    paddingBottom: vh * 6,
  },
  recentcontainer: {
    backgroundColor: '#24262B',
    width: vw * 12,
    height: vw * 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 15,
    width: '100%',
    alignSelf: 'center',
  },
});
