import {Dimensions, StyleSheet} from 'react-native';
import {appShadow, colors} from '../../../theme/colors';
import {vh, vw} from '../../../theme/units';
import {font, layout, spacing, weight} from '../../../theme/styles';
const {width} = Dimensions.get('screen');
export const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: spacing.large,
    height: vh * 20,
    paddingVertical: spacing.large,
    borderWidth: 1.5,
    width: vw * 90,
    alignSelf: 'center',
    // borderColor: colors.text.grey,
    borderColor: '#EEEEEE',
    borderRadius: 10,
    backgroundColor: colors?.theme?.white,
    ...appShadow,
  },
  itemContainer: {
    marginHorizontal: 5,
  },
  editbutton: {
    marginTop: spacing?.medium,
    backgroundColor: colors.text.red,
  },
  profileStyles: {
    height: 90,
    width: 90,
    borderRadius: 100,
  },
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

  // cardStyle: {
  //   flexDirection: 'row',
  //   gap: 5,
  //   alignItems: 'center',
  //   backgroundColor: '#FEEEEE',
  //   padding: 15,
  //   width: vw * 90,
  // },
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
    overflow: 'hidden',
  },
  cardend: {
    alignItems: 'center',
    backgroundColor: colors.text.red,
    paddingVertical: 13,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: vw * 90,
  },
});
