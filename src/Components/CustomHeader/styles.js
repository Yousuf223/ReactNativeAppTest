import {StyleSheet} from 'react-native';

import {font, layout, spacing} from '../../theme/styles';
import {statusBarHeight, vh, vw} from '../../theme/units';
import {colors} from '../../theme/colors';
import fonts from '../../Assets/fonts';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'transparent',
    marginTop: vh * 1,
  },
  contentContainer: {
    height: vh * 10,
    justifyContent: 'space-between',
  },
  titleContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 8,
  },
  title: {
    width: vw * 72,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: fonts?.clash?.regular,
    lineHeight: vh * 3.5,
    fontWeight:'600',
    marginTop:10
  },
  expandedHeader: {height: vh * 10.5},
  homeTitle: {
    color: colors.text.white,
    fontSize: vh * 2.5,
    marginBottom: spacing.xsmall,
  },
  postBtn: {
    width: vw * 20,
    height: vh * 3.5,
  },
  homeSubTitle: {
    color: colors.text.white,
    fontSize: font.xsmall,
  },
  searchBtnContainer: {
    backgroundColor: colors.background.primary,
    height: vh * 3,
    width: vh * 3,
    borderRadius: vh * 1.5,
  },
  icon: {
    height: vh * 1.5,
    width: vh * 1.5,
  },
  subTitle: {
    color: colors.text.dimBlack,
    fontSize: font.xsmall,
  },
  backIcon: {
    height: vh * 1.4,
    width: vh * 1.4,
    marginRight: vw * 2.5,
  },
  chatCircle: {
    height: vh * 5,
    width: vh * 5,
    borderRadius: (vh * 5) / 2,
    backgroundColor: colors.theme.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchCircle: {
    height: vh * 5,
    width: vh * 5,
    borderRadius: (vh * 5) / 2,
    backgroundColor: colors.theme.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: vw * 2,
  },
  messageIcon: {
    height: vh * 2.5,
    width: vh * 2.5,
    resizeMode: 'contain',
    tintColor: colors.theme.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIconWrapper: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: vw * 12,
    // width: vw * 12,
    marginRight: 25,
    // backgroundColor: colors?.input?.background,
    // borderRadius: 100,
  },
  userProfileStyles: {
    height: vw * 10,
    width: vw * 10,
    borderRadius: vw * 8,
  },
  hiIconStyles: {
    height: vw * 5,
    width: vw * 5,
  },
});
export default styles;
