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
    borderRadius: 15,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: layout.contentWidth,
    paddingVertical: spacing.xlarge,
  },
  forgotText: {
    alignSelf: 'flex-end',
  },
  submitButton: {
    // marginTop: spacing.small,
    color: colors.theme.secondary,
    width:'90%'
  },
  rememberRow: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xlargeh,
    marginBottom: spacing.medium,
    width: '100%',
    flexDirection: 'row-reverse',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  checkedCheckbox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
