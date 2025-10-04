import * as EmailValidator from 'email-validator';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { appIcons, appLogos } from '../../../assets';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import NavService from '../../../helpers/NavService';
import { loginUser } from '../../../redux/actions/authAction';
import { colors } from '../../../utils/colors';
import styles from './styles';

const Login = ({ route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const dispatch = useDispatch();
  const onSubmit = async () => {
    if (!email && !password) {
      Toast.show({
        text1: `Fields can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!email) {
      Toast.show({
        text1: `Email field can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!EmailValidator.validate(email)) {
      Toast.show({
        text1: 'You have entered an invalid email address.',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!password) {
      Toast.show({
        text1: `Password field can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (email !== "test@gmail.com" || password !== "test123") {
      Toast.show({
        text1: 'Email must be test@gmail.com and password must be test123',
        type: 'error',
        visibilityTime: 3000,
      })} else {
        const payload = {
          email: email,
          password: password
        };

        dispatch(loginUser(payload));
      }
    };




    return (
      <CustomBackground back={true}  titleText={'Sign In'}>
        <View style={styles.container}>
          <View style={[styles.container, { marginTop: 20 }]}>
            <View>
              <Image style={styles.applogo} source={appLogos.appLogo} />
            </View>
            <CustomTextInput
              leftIcon={appIcons.email}
              placeholder={'Enter Email Address'}
              value={email}
              keyboardType={'email-address'}
              onChangeText={setEmail}
              maxLength={35}
            />
            <CustomTextInput
              leftIcon={appIcons.lock}
              placeholder={'Password'}
              value={password}
              onChangeText={setPassword}
              rightIcon
              isPassword
              maxLength={30}
            />

            <CustomButton
              title="Login"
              onPress={onSubmit}
              buttonStyle={{ borderRadius: 10, marginTop: '14%' }}
              textStyle={{ fontSize: 17 }}
            />
          </View>
        </View>
      </CustomBackground>
    );
  };

  export default Login;
