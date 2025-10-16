import React from 'react';
import {View, StyleSheet} from 'react-native';

const MainContainer = ({children, style}) => {
  return (
    <View style={styles.safeArea}>
      <View style={[styles.container, style]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginVertical: 10, // Adjust vertical margins
  },
});

export default MainContainer;
