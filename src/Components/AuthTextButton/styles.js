import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {vh} from '../../theme/units';
import {spacing} from '../../theme/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: vh * 3,
    gap: spacing.xsmall,
    // marginTop: vh * 4.5,
  },
});
export default styles;
