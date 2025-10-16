import {CommonActions, useNavigation} from '@react-navigation/native';
import routes from '../../Navigation/routes';

export const useResetToScreen = () => {
  const navigation = useNavigation();

  const resetToScreen = (index, screen) => {
    navigation.dispatch(
      CommonActions.reset({
        index: index, // Index of the screen you want to navigate to (0-based index)
        routes: [{name: screen}],
      }),
    );
  };
  return {resetToScreen};
};

// Custom hook to reset the screen
export const useResetToLoginScreen = () => {
  const navigation = useNavigation();

  const resetToLoginScreen = () => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: routes.auth.login}],
        }),
      );
    }, 300);
  };

  return {resetToLoginScreen};
};
