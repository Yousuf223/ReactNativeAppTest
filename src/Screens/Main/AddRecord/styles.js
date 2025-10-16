import {StyleSheet} from 'react-native';
import {spacing} from '../../../theme/styles';
import {colors} from '../../../theme/colors';
import {vw} from '../../../theme/units';

export const styles = StyleSheet.create({
  recentcontainer: {
    backgroundColor: '#24262B',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentpurchase: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.8,
    padding: spacing.small,
    borderRadius: 10,
    borderColor: colors.text.grey,
    marginVertical: 5,
    width: vw * 90,
    alignSelf: 'center',
  },
});
