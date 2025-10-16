import React, {useState} from 'react';
import {View} from 'react-native';
import {spacing} from '../../../theme/styles';

import {useNavigation} from '@react-navigation/native';
import {MainButtonWithCircle} from '../../../Components/Buttons/MainButton';
import AgePicker from '../../../Components/Cards/AgePicker';
import TitleWithDescription from '../../../Components/Cards/TitleWithDescription';
import InputField from '../../../Components/InputField';
import {useResetToScreen} from '../../../Functions/resetToScreen';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {vh} from '../../../theme/units';

const WeightCreation = () => {
  const navigation = useNavigation();
  const {resetToScreen} = useResetToScreen();
  const [isLoading, setIsLoading] = useState(false);
  const navigateToSignUp = () => navigation.navigate(routes.auth.signup);
  const data = Array.from({length: 200}, (_, index) => index + 1);

  const handleLogin = data => {
    console.log('Login Data >>>', data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      resetToScreen(0, routes.mainStack.main);
    }, 2000);
  };

  const navigateToForgotPassword = () =>
    navigation.navigate(routes.auth.forgot);

  const handlePopToTop = () => {
    navigation.navigate(routes.auth.welcome);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.theme.black,
      }}>
      <View
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.large,
            paddingHorizontal: spacing.medium,
          },
        ]}>
        <TitleWithDescription
          title="Tell Us Your Weight"
          description="Please provide your personal details so we can help you achieve the best version of you!"
        />
        <AgePicker data={data} />
        <View style={{marginTop: vh * 10, alignItems: 'center', gap: 10}}>
          <InputField
            label="Blood Type"
            placeholder="Tap to Add"
            required
            // onChangeText={handleChange('email')}
            // errors={errors?.email}
            // value={values?.email}
            keyboardType={'email-address'}
          />
          <MainButtonWithCircle
            icon={true}
            onPress={() => navigation.navigate(routes.auth.login)}
          />
        </View>
      </View>
    </View>
  );
};

export default WeightCreation;
