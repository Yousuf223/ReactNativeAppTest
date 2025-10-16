import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import routes from '../../Navigation/routes';
import { colors } from '../../theme/colors';
import { font } from '../../theme/styles';
import { vw } from '../../theme/units';
import MyIcons from '../MyIcons';

import { CommonActions } from '@react-navigation/native';
import CustomText from '../wrappers/Text/CustomText';
import fonts from '../../Assets/fonts';
import Icon from 'react-native-vector-icons/Feather'
// import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const TabBar = ({ state, navigation }) => {
  const handlePress = routeName => {
    if (routeName === 'tabbar4') return;
    // if (routeName === routes?.tab?.home) {
    //   navigation.navigate('BottomTabs', {screen: routes?.tab?.home});
    // } else if (routeName === routes?.tab?.journals) {
    //   navigation.navigate('BottomTabs', {screen: routes?.tab?.journals});
    // } else if (routeName === routes?.tab?.calendars) {
    //   navigation.navigate('BottomTabs', {screen: routes?.tab?.calendars});
    // } else if (routeName === routes?.tab?.media) {
    //   navigation.navigate('BottomTabs', {screen: routes?.tab?.media});
    // }
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      }),
    );
  };

  return (
    <View style={styles.tabbarContainer}>
      <View
        style={{
          bottom: -10,
          position: 'absolute',
          alignSelf: 'center',
          backgroundColor: 'transparent',
        }}>
        <Svg
          width={vw * 102.5}
          height="90"
          viewBox="0 0 390 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M165.183 17.1798C159.342 8.56548 151.113 0 140.705 0H20C8.9543 0 0 8.95431 0 20V60C0 71.0457 8.9543 80 20 80H370C381.046 80 390 71.0457 390 60V20C390 8.95431 381.046 0 370 0H249.295C238.887 0 230.658 8.56549 224.817 17.1798C218.343 26.7267 207.404 33 195 33C182.596 33 171.657 26.7267 165.183 17.1798Z"
            fill="#2E2E32"
          />
        </Svg>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.middleTab}
        onPress={() => navigation.navigate(routes.tab.addrecords)}>
          <Image source={require('../../Assets/Icons/home-normal.png')} />
        {/* <MyIcons name={'homeNormal'} color="transparent" size={20} /> */}
      </TouchableOpacity>
      <View style={styles.tabsWrapper}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => handlePress(route.name);

          let imageSrc;
          if (route.name === routes?.tab?.home) imageSrc = 'expense';
          if (route.name === routes?.tab?.records) imageSrc = 'notesNormal';
          if (route.name === routes?.tab?.otherrecord)
            imageSrc = 'vehicalNormal';
          if (route.name === routes?.tab?.vehicles) imageSrc = 'profileNormal';

          if (route.name === 'tabBar4') {
            return <View key={index + 1} style={styles.tabs} />;
          }

          let routeNames;
          if (route.name === routes?.tab?.home) routeNames = 'EXPENSE';
          if (route.name === routes?.tab?.records)
            routeNames = 'VEHICLE RECORD';
          if (route.name === routes?.tab?.otherrecord)
            routeNames = 'OTHER RECORD';
          if (route.name === routes?.tab?.vehicles) routeNames = 'MY VEHICLES';

          let imageFocusSrc;
          if (route.name === routes?.tab?.home) imageFocusSrc = 'expenseFocus';
          if (route.name === routes?.tab?.records) imageFocusSrc = 'notesFocus';
          if (route.name === routes?.tab?.otherrecord)
            imageFocusSrc = 'vehicalFocus';
          if (route.name === routes?.tab?.vehicles)
            imageFocusSrc = 'profileFocus';
          return (
            <TouchableOpacity
              key={index + 1}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityRole="button"
              activeOpacity={0.8}
              onPress={onPress}
              style={styles.tabs}>
              <MyIcons name={isFocused ? imageFocusSrc : imageSrc} />
              {index == 3   &&     <Icon name="file-text" size={22} color={isFocused ? colors?.theme.secondary : 'white'} /> }
       
              <CustomText
                text={routeNames}
                font={fonts?.benzin?.semibold}
                style={[
                  styles?.tabsText,
                  {
                    color: isFocused ? colors?.theme.secondary : 'white',
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabbarContainer: {
    marginBottom: -4,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  tabsWrapper: {
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'space-around',
    gap: 18,
  },
  tabs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: 75,
    gap: 5,
  },
  line: {
    width: 40,
    height: 4,
    backgroundColor: '#368196',
    borderRadius: 10,
    bottom: 6,
    position: 'absolute',
  },
  tabsText: {
    fontSize: font?.xxxxsmall,
  },
  middleTab: {
    backgroundColor: '#FF1A00',
    width: vw * 16,
    height: vw * 16,
    borderRadius: vw * 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 52,
    right: '42%',
    left: '42%',
  },
});

export default TabBar;
