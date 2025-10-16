import { StyleSheet } from 'react-native';
import { font, layout, spacing } from '../../../theme/styles';
import { vh, vw } from '../../../theme/units';
import { appShadow, colors } from '../../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.large,
  },
  submitButton: {
    marginTop: spacing.small,
  },
  menuWrapper: {
    flexDirection: 'column',
    width: '48%',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    borderRadius: layout.borderRadius,
    overflow: 'hidden',
  },
  menuContainer: {
    width: '100%',
    gap: spacing.medium,
    flexWrap: 'wrap',
    alignItems: 'center',
    height: vh * 50,
    justifyContent: 'center',
    paddingHorizontal: spacing.medium,
  },
  absoluteBgIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  recordfound: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: '30%',
    width: '100%',
    gap: 10,
  },
  recordspend: {
    borderWidth: 1.5,
    borderColor: colors.text.grey,
    borderRadius: 10,
    padding: spacing.medium,
  },
  barcontainer: {
    marginVertical: 10,
    width: '100%',
    paddingVertical: spacing.large,
    borderWidth: 1,
    borderColor: colors.text.grey,
    borderRadius: 10,
    paddingHorizontal: spacing.small,
    gap: 20,
  },
  labelTextStyle: {
    fontSize: font.large,
  },
  transheadercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerline: {
    width: '40%',
    height: 1,
    backgroundColor: colors.text.grey,
  },

  recentpurchase: {
    padding: spacing.small,
    borderRadius: 10,
    borderColor: '#EEEEEE',
    borderWidth: 1.5,
    backgroundColor: colors?.theme?.white,
    ...appShadow,
    marginVertical: 5,
    paddingVertical: spacing.medium,

  },
  recentcontainer: {
    backgroundColor: '#24262B',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerStyle: {
    paddingBottom: vh * 10,
  },

  banner: { flexDirection: 'row', alignItems: 'center' },
  coin: {
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
  cardcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  border: {
    width: 2,
    height: 12,
    backgroundColor: colors.text.grey,
  },
  errorsStyles: {
    height: vw * 50,
    width: vw * 80,
    marginTop: 40,
    borderRadius: 10,
    marginVertical: 20
  },
  boundries:{
    flex: 1,
    alignItems:'center',
    paddingHorizontal:2
  }
});

export default styles;
