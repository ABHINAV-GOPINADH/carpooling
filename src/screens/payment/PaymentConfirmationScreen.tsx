import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaymentConfirmationScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { amount, method } = route.params;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Rating');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.checkmarkContainer}>
        <Text style={styles.checkmark}>✔</Text>
      </View>
      <Text style={styles.message}>Payment Successful!</Text>
      <Text style={styles.details}>Amount Paid: € {amount}</Text>
      <Text style={styles.details}>Method: {method}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkmarkContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmark: {
    color: '#fff',
    fontSize: 36,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  details: {
    fontSize: 16,
    marginTop: 10,
    color: '#444',
  },
});

export default PaymentConfirmationScreen;
 