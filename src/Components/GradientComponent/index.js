import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';
import { vh } from '../../theme/units';
import { spacing, layout} from '../../theme/styles';

const Gradient = ({children, colors, style}) => {
  return (
    <LinearGradient colors={colors} style={[styles.container, style]}>
      {children}
    </LinearGradient>
  );
};

export default Gradient;

const styles = StyleSheet.create({
    container: {
        
        
    }
})
