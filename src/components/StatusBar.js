import React from 'react';
import {Text, View,Image,Platform} from 'react-native';

import styles from './style';
import {appLogos} from '../assets';
import {colors} from '../utils/colors';

let ios = Platform.OS === 'ios';

const StatusBarHeader = () => {
  return (
    <View style={styles.StatusBarContainer}>
      <Image
        resizeMode={'contain'}
        style={[styles.spLogoSize, !ios && styles.center]}
        tintColor={colors.white}
       source={appLogos.appIcon}
      />
      <Text style={styles.statusBarText}>{'bistrochatManager'}</Text>
    </View>
  );
};

export default StatusBarHeader;
