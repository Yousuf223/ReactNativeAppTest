import {StyleSheet} from 'react-native';
import {spacing} from '../../../theme/styles';

export const styles = StyleSheet.create({
  submitButton: {
    alignSelf: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
  },
  addmore: {
    flexDirection: 'row',
    gap: 5,
    marginTop: -35,
    alignSelf: 'flex-end',
    marginRight: 20,
    alignItems: 'center',
  },
});
