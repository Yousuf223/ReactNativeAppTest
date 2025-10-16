import {StyleSheet} from 'react-native';
import {vh, vw} from '../../../theme/units';

const styles = StyleSheet.create({
  card: {
    // height: vh * 20.5,
    // width: vh * 32.5,
    resizeMode: 'contain',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  datePicker: {
    width: vw * 45.5,
  },
});
export default styles;
