import {StyleSheet} from 'react-native';
import {appShadow, colors} from '../../../theme/colors';

export const styles = StyleSheet.create({
  batterycontainer: {
    borderRadius: 10,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    backgroundColor: colors?.theme?.white,
    ...appShadow,
    padding: 10,
    gap: 20,
    marginHorizontal: 20,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
});
