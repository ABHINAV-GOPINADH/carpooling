// PaymentConfirmationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaymentConfirmationScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  // Automatically navigate to the Rating screen after a short delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Rating');
    }, 2000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.checkmarkContainer}>
        <Text style={styles.checkmark}>✔</Text>
      </View>
      <Text style={styles.message}>Payment done Successfully!</Text>
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmark: {
    color: '#fff',
    fontSize: 30,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentConfirmationScreen;