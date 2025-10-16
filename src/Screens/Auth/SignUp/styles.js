import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {layout} from '../../../theme/styles';
import {vh, vw} from '../../../theme/units';
import {spacing} from '../../../theme/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  loginButton: {
    backgroundColor: colors.primary, // Assuming primary color in your theme
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signupText: {
    color: '#888',
  },
  signupLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  mainContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: layout.contentWidth,
    paddingTop: vh * 6,
  },
  submitButton: {
    marginTop: spacing.small,
  },
});

export default styles;
