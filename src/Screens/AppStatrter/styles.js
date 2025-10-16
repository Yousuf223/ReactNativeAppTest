import {StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/units';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingTop: '10%',
    // paddingHorizontal: '5%',
  },

  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    marginTop: 10,
    gap: 8,
    marginHorizontal: '5%',
  },
  indicator: {
    width: 40,
    height: 5,
    borderRadius: 4,
  },
  activeIndicator: {
    backgroundColor: '#FF0000',
  },
  inactiveIndicator: {
    backgroundColor: '#e0e0e0',
  },
  formContent: {},
  buttonStyle: {alignSelf: 'center', marginTop: '5%',width:'88%'},
  banner: {width: '100%'},
});
