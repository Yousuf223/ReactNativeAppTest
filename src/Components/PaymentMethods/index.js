import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import MyIcons from '../MyIcons';
import {vh, vw} from '../../theme/units';

// List of payment methods with URLs to the SVG icons (or local files)
const paymentMethods = [
  {name: 'Paypal', icon: 'paypal'},
  {name: 'Visa', icon: 'visa'},
  {name: 'Mastercard', icon: 'masterCard'},
  {name: 'American Express', icon: 'americanCard'},
  {name: 'Apple', icon: 'applePay'},
];

const PaymentMethods = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}>
      {paymentMethods.map((method, index) => (
        <View key={index} style={styles.iconContainer}>
          <MyIcons name={method.icon} size={70} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    // height: vh * 10,
    marginBottom: '10%',
  },
  shadowContainer: {
    backgroundColor: '#fff', // Necessary to show the shadow
    borderRadius: 10,
    borderWidth: 2,
    width: 10,
    borderColor: 'black',
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Android elevation
    elevation: 5,
  },
  iconContainer: {
    marginHorizontal: 3,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default PaymentMethods;
