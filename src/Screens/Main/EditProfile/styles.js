import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {font, layout} from '../../../theme/styles';
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
    borderColor: '#ccc',
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
  contentContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: vh * 2,
    flex: 1,
  },
  forgotText: {
    alignSelf: 'flex-end',
  },
  submitButton: {
    marginTop: spacing.small,
  },
  rememberRow: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xlargeh,
    marginBottom: spacing.medium,
    width: '100%',
    gap: spacing.medium,
    marginTop: vh*2
  },
  datepickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.medium,
    borderRadius: layout?.borderRadius,
    backgroundColor: colors?.input?.background,
    width: vw * 88,
    marginBottom: spacing.medium,
    paddingHorizontal: spacing.medium,
  },

  //Interest
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10%',
    gap: vh*2,
  },
  inputField: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  addButtonText: {
    color: colors?.text?.secondary,
    marginLeft: 4,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: vw * 88,
    alignItems: 'center',
    paddingVertical: spacing.medium,
  },
  interestTag: {
    backgroundColor: colors?.input?.background,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  suggestionTag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
  },
  suggestText: {
    color: colors?.text?.altGrey,
    fontSize: font?.medium,
  },
  buttonText: {
    color: colors?.text?.placeholder,
    textDecorationLine: 'underline',
  },
  dob: {
    fontSize: font.small,
    color: colors.text.primary,
  },
  textWrap: {
    width: vw * 86,
    paddingVertical: spacing.medium,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default styles;
