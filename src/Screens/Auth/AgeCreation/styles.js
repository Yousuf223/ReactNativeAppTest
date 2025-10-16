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
  forgotPasswordContainer: {
    position: 'absolute',
    right: 0,
  },
  forgotPasswordText: {
    color: colors.primary, // Assuming primary color in your theme
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
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#888',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.theme.borderColor,
    alignItems: 'center',
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: layout.contentWidth,
    paddingTop: vh * 8,
  },
  forgotText: {
    alignSelf: 'flex-end',
  },
  submitButton: {
    marginTop: spacing.small,
    color: colors.theme.secondary,
  },
  rememberRow: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xlargeh,
    marginBottom: spacing.medium,
    width: '100%',
  },
});

export default styles;
