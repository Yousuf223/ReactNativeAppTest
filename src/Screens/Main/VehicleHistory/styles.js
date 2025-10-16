import {StyleSheet} from 'react-native';
import {HEIGHT, vh, vw} from '../../../theme/units';
import {appShadow, colors} from '../../../theme/colors';
import {spacing} from '../../../theme/styles';

export const styles = StyleSheet.create({
  batterycontainer: {
    marginTop: 10,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    backgroundColor: colors?.theme?.white,
    ...appShadow,
  },
  line: {
    width: '70%',
    backgroundColor: colors.text.grey,
    height: 1,
  },
  line1: {
    width: '60%',
    backgroundColor: colors.text.grey,
    height: 1,
  },
  heading: {flexDirection: 'row', alignItems: 'center', gap: 10},
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  submitButton: {
    // width: '80%',
    marginHorizontal: 15,
  },
  transheadercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recentpurchase: {
    // borderWidth: 1.5,
    padding: spacing.medium,
    // borderRadius: 10,
    // borderColor: colors.text.grey,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: '#EEEEEE',
    borderWidth: 1.5,
    backgroundColor: colors?.theme?.white,
    ...appShadow,
  },
  border: {
    width: 2,
    height: 12,
    backgroundColor: colors.text.grey,
  },
  cardcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
});
