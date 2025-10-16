import {appShadow, colors} from '../theme/colors';
import {font, spacing} from '../theme/styles';
import {vh, vw} from '../theme/units';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  titleContainer: {},
  title: {
    color: colors.text.white,
    fontSize: vh * 2.5,
  },
  backIcon: {
    height: vh * 1.4,
    width: vh * 1.4,
    marginRight: vw * 2.5,
  },
  subTitle: {
    color: colors.text.dimWhite,
    fontSize: font.xsmall,
  },
  selectedBar: {
    height: vh * 0.35,
    width: '100%',
    alignSelf: 'center',
    // backgroundColor: colors.theme.secondary,
    backgroundColor: colors.theme.black,
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.theme.white,
    backgroundColor: colors.background.white,
    ...appShadow,
  },
  iconContainer: {
    width: vw * 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vh * 2,
  },
  tabIcon: {
    resizeMode: 'contain',
    height: vh * 2.25,
    width: vh * 2.25,
  },
  focusedIcon: {
    resizeMode: 'contain',
    height: vh * 3,
    width: vh * 3,
  },
  postBtn: {
    width: vw * 18,
    height: vh * 3.5,
  },
});
export default styles;
