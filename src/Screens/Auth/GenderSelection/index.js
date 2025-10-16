import React, {useState} from 'react';
import {View} from 'react-native';
import {layout, spacing} from '../../../theme/styles';

import {useNavigation} from '@react-navigation/native';
import {MainButtonWithCircle} from '../../../Components/Buttons/MainButton';
import GenderSelector from '../../../Components/Cards/GenderSelector';
import TitleWithDescription from '../../../Components/Cards/TitleWithDescription';
import {useResetToScreen} from '../../../Functions/resetToScreen';
import routes from '../../../Navigation/routes';
import {genderData} from '../../../Utils/dummyData';
import {colors} from '../../../theme/colors';
import {vh} from '../../../theme/units';

const GenderSelection = () => {
  const navigation = useNavigation();
  const {resetToScreen} = useResetToScreen();
  const [isLoading, setIsLoading] = useState(false);
  const navigateToSignUp = () => navigation.navigate(routes.auth.signup);

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
      style={[
        layout.flex,
        {
          backgroundColor: colors.theme.black,
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.large,
          paddingHorizontal: spacing.medium,
        },
      ]}>
      <TitleWithDescription
        title="Tell Us Your Gender"
        description="Please provide your personal details so we can help you achieve the best version of you!"
      />
      <GenderSelector data={genderData} boxHeight={vh * 9} />

      <MainButtonWithCircle
        icon={true}
        onPress={() => navigation.navigate(routes.auth.age)}
      />
    </View>
  );
};

export default GenderSelection;
