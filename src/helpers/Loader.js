import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Text,
  LayoutAnimation,
  Keyboard,
  UIManager,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import { colors } from '../utils/colors';


const {width, height} = Dimensions.get('screen');

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Loader = ({color}) => {
  const loader = useSelector(({appReducer}) => appReducer?.loader || false);
  if (!loader) return null;
  Keyboard.dismiss();
  LayoutAnimation?.linear();
  return (
    <View
      style={{
        zIndex: 99,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        height,
        width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
      }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Please wait</Text>
          <View style={styles.loading}>
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="white" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 35,
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 10,
  },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
  },
  loadingContent: {
    flex: 3,
    fontSize: 15,
    paddingHorizontal: 10,
  },
  loadingText: {
    color: colors.white,
    marginLeft: 5,
  },
});

export default Loader;
