import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { Provider, useDispatch } from 'react-redux';
import Navigator from './src/Navigation/Navigator';
import { persistor, store } from './src/Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import CustomText from './src/Components/wrappers/Text/CustomText';
import { colors } from './src/theme/colors';
import { font } from './src/theme/styles';
import Toast from 'react-native-toast-message';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);



  const toastConfig = {
    success: internalState => (
      <View style={[styles.toastContainer, styles.success]}>
        <CustomText
          numberOfLines={2}
          style={styles.toastText}
          text={internalState.text1}
        // font={fonts.e.medium}
        />
      </View>
    ),
    error: internalState => (
      <View style={[styles.toastContainer, styles.error]}>
        <CustomText
          numberOfLines={1}
          style={styles.toastText}
          text={internalState.text1}
        />
      </View>
    ),
  };

  return (
    <View style={[{ flex: 1 }]}>
           <StatusBar
          translucent={true}
          backgroundColor="transparent"
       barStyle={!isDarkMode ? 'light-content' : 'dark-content'}
        />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
          <Navigator />
          <Toast topOffset={70} config={toastConfig} />
        </PersistGate>
      </Provider>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  toastContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingHorizontal: 20,
    padding: 8,
    borderWidth: 0.4,
    borderColor: colors?.theme?.secondary,
    borderRadius: 100,
    borderStyle: 'solid',
  },
  toastText: {
    color: 'white',
    fontSize: font?.small,
    textAlign: 'center',
    // fontFamily: fonts.e.light,
  },
  success: {
    backgroundColor: '#000000',
    // backgroundColor: 'rgba(0,0,0,0.4)',
  },
  error: {
    backgroundColor: '#000000',
  },
});
