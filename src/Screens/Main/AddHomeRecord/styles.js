import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {spacing} from '../../../theme/styles';
import {vh} from '../../../theme/units';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.theme?.lightGray,
    width: '100%',
    alignSelf: 'center',
    marginTop: -20
  },

  barcontainer: {
    marginVertical: 10,
    // width: '100%',
    paddingVertical: spacing.xxlarge,
    // borderWidth: 1,

    borderColor: colors.text.grey,
    borderRadius: 10,
    paddingHorizontal: spacing.small,
    gap: 20,
    marginHorizontal: 10,
  },
  barcontainer1: {
    paddingVertical: spacing.large,
    borderColor: colors.text.grey,
    paddingHorizontal: spacing.small,
    gap: 20,
    marginHorizontal: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 5,
    width: width - 60,
    borderRadius: 25,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    alignSelf: 'center',
    height: 50,
    alignItems: 'center',
  },
  doblabel: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    gap: 5,
    backgroundColor: colors.text?.white,
    marginBottom: -30,
    zIndex: 999,
    paddingHorizontal: 5,
  },
  inputContainer: {
    borderRadius: 20,
    backgroundColor: colors.theme?.white,
    borderWidth: 1.5,
    borderColor: colors.text?.red,
    width: '95%',
    marginBottom: vh * 5,
    alignItems: 'center',
    alignSelf: 'center',
    borderStyle: 'dashed',
  },
  submitButton: {
    alignSelf: 'center',
  },
  addmore: {
    flexDirection: 'row',
    gap: 5,
    marginTop: -24,
    alignSelf: 'flex-end',
    marginRight: 20,
    alignItems: 'center',
  },
  container: {
    marginTop: '10%',
    gap: 20,
    alignSelf: 'center',
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
