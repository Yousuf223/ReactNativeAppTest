import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {vh, vw} from '../../../theme/units';
import {font, spacing} from '../../../theme/styles';

export const styles = StyleSheet.create({
  renderButtonsContainer: {
    gap: spacing.medium,
  },
  list: {
    flexDirection: 'row',
    backgroundColor: colors?.input?.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vh * 3,
    paddingHorizontal: vw * 3,
    borderRadius: vh * 1.4,
  },
  text: {
    fontSize: font?.xlarge,
  },
});
