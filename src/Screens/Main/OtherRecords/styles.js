import {Dimensions, StyleSheet} from 'react-native';
import {vh, vw} from '../../../theme/units';
import {spacing} from '../../../theme/styles';
import {appShadow, colors} from '../../../theme/colors';
const {width, height} = Dimensions.get('screen');
export const styles = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: width * 0.12,
    marginTop: vh * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcontainer: {
    marginVertical: 10,
    width: '100%',
    paddingVertical: spacing.large,
    borderRadius: 10,
    borderColor: '#EEEEEE',
    borderWidth: 1.5,
    backgroundColor: colors?.theme?.white,
    ...appShadow,
    paddingHorizontal: spacing.small,
    gap: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.large,
  },
  contentContainerStyle: {
    paddingBottom: vh * 18,
    marginTop: 20,
  },
  transheadercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerline: {
    width: '60%',
    height: 1,
    backgroundColor: colors.text.grey,
  },
  viewbutton: {
    borderWidth: 1,
    padding: spacing.small,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.text.grey,
  },
  recentpurchase: {
    // padding: spacing.small,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#EEEEEE',
    backgroundColor: colors?.theme?.white,
    ...appShadow,
    marginVertical: 5,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  recentcontainer: {
    backgroundColor: '#24262B',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbutton: {width: vw * 80, alignSelf: 'center'},
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
  border: {
    width: 2,
    height: 12,
    backgroundColor: colors.text.grey,
  },
  cardcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  boundries: {
    flex: 1,
    alignItems:'center',
    paddingHorizontal:2
  }
});
