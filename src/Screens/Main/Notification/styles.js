import {StyleSheet} from 'react-native';
import {vw} from '../../../theme/units';
import {spacing} from '../../../theme/styles';

export const styles = StyleSheet.create({
  container: {
    width: vw * 90,
    borderWidth: 1,
    alignSelf: 'center',
    padding: spacing.medium,
    borderRadius: 10,
    marginVertical: 10,
  },
});
