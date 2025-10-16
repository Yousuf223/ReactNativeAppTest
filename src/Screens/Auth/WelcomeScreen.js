import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {vh, vw} from '../../theme/units';
import {MainButton} from '../../Components/Buttons/MainButton';
import TextButton from '../../Components/Buttons/TextButton';
import {MainLogo, MainLogoTitle} from '../../Assets/Logo';
import {useNavigation} from '@react-navigation/native';
import routes from '../../Navigation/routes';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Main Logo */}
      <MainLogo width={vw * 50} height={vh * 35} />
      <MainLogoTitle width={vw * 40} height={vh * 10} />
      {/* Description */}
      <Text style={styles.description}>
        Welcome to our app! {'\n'}
        Please log in or sign up to continue.
      </Text>
      {/* Login and Signup buttons */}
      <MainButton
        title={'Login'}
        onPress={() => navigation.navigate(routes.auth.login)}
      />
      <TextButton
        title={'Signup'}
        style={styles.signUpBtn}
        onPress={() => navigation.navigate(routes.auth.signup)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 40,
  },
  signUpBtn: {
    marginTop: vh * 3,
  },
});

export default WelcomeScreen;
