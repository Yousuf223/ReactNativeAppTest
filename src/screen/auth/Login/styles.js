import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../utils/colors';
import { size } from '../../../utils/sizes';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: '8%',
  },
  bottomView: {
    marginBottom: 40,
    marginTop: '20%',
    alignSelf: 'center',
  },
  subText: {
    fontSize: 14,
    fontWeight: '300',
    color: colors.black,
    marginVertical: 20,
    textAlign: 'right',
    textDecorationLine: 'underline',
    marginTop: 32,
  },
  textNormal: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.black,
    textAlign: 'center',
  },
  textNormalWithColor: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  applogo: {
    width: 264,
    height: 210,
    resizeMode: 'contain',
    marginBottom: '6%',
    alignSelf: 'center',
  },
  input: {
    fontSize: size.xsmall,
    color: colors.white,
    fontWeight: '600',
    borderWidth: 1,
    height: 55,
    borderRadius:8
  },
  inputcontainer: {
    borderWidth: 1,
    height: 55,
  },
});

export default styles;
