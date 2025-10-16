import {Dimensions, StyleSheet} from 'react-native';
import {vh, vw} from '../../../theme/units';
import {spacing} from '../../../theme/styles';
import {appShadow, colors} from '../../../theme/colors';
const {width, height} = Dimensions?.get('screen');

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: spacing.large,
    alignItems: 'center',
    paddingHorizontal: width * 0.07,
  },
  cardContainer: {
    padding: vh * 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  rotatedLabel: {
    position: 'absolute',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#FF2E00',
    zIndex: 999,
    transform: [{rotate: '270deg'}],
    left: -vw * 13.5,
    top: vh * 10,
    height: vh * 4,
    width: width * 0.27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBackground: {
    // backgroundColor: colors?.background?.red,
  },
  cardContent: {
    backgroundColor: colors.text.white,
    gap: 5,
    width: vw * 80,
    borderWidth: 2,
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: '#FFDFDF',
  },
  subscriptionbutton: {
    width: vw * 50,
  },
  planbutton: {
    width: vw * 70,
    marginTop: spacing?.medium,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.background.header,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  editbutton: {
    width: vw * 70,
    marginTop: spacing?.medium,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.background.red,
  },

  cardStyle: {
    // flexDirection: 'row',
    gap: 5,
    // alignItems: 'center',
    backgroundColor: '#FEEEEE',
    // padding: vh * 3,
    // paddingVertical: vh * 4,
    width: vw * 80,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden'
  },
  cardend: {
    alignItems: 'center',
    backgroundColor: colors.text.red,
    paddingVertical: 13,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: vw * 80,
  },
});
