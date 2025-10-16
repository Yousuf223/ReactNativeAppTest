import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {font, spacing} from '../../../theme/styles';
import {vh} from '../../../theme/units';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  barcontainer: {
    // marginVertical: 10,
    // width: '100%',
    paddingVertical: spacing.large,
    // borderWidth: 1,
    // borderColor: colors.text.grey,
    // borderRadius: 10,
    paddingHorizontal: spacing.small,
    gap: 15,
    marginHorizontal: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 5,
    width: width - 80,
    borderRadius: 25,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    alignSelf: 'center',
    height: vh * 6.5,
    alignItems: 'center',
  },
  doblabel: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    gap: 5,
    backgroundColor: colors.text?.white,
    marginBottom: -20,
    zIndex: 999,
    paddingHorizontal: 5,
  },
  inputContainer: {
    borderRadius: 15,
    backgroundColor: colors.theme?.white,
    borderWidth: 1,
    borderColor: colors.theme?.border,
    width: '95%',
    marginBottom: vh * 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitButton: {
    alignSelf: 'center',
  },
  editbutton: {
    // paddingVertical: spacing?.medium,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.background.red,
    borderStyle: 'dashed',
    alignSelf: 'center',
    width: '94%',
    marginBottom: spacing?.large,
  },
  addmore: {
    flexDirection: 'row',
    gap: 5,
    marginTop: -24,
    alignSelf: 'flex-end',
    marginRight: 20,
    alignItems: 'center',
  },
  input: {width: '100%'},
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.theme?.lightGray,
    marginTop: 15,
    width: '100%',
    alignSelf: 'center',
  },
  label: {
    // marginLeft: spacing.largeh,
    // marginBottom: spacing.small,
    color: colors?.theme?.black,
    fontSize: font.small,
  },
  asterisk: {color: colors.background.red},
});
