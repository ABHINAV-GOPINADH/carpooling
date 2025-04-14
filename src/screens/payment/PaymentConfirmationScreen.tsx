import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const PaymentConfirmationScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { amount, method, requestId } = route.params;
  const [driverId, setDriverId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDriverId = async () => {
      try {
        const db = getFirestore();
        const rideRequestRef = doc(db, 'rideRequests', requestId);
        const rideRequestSnap = await getDoc(rideRequestRef);

        if (rideRequestSnap.exists()) {
          const data = rideRequestSnap.data();
          if (data.driverId) {
            setDriverId(data.driverId);
          } else {
            Alert.alert('Error', 'Driver ID not found in ride request.');
          }
        } else {
          Alert.alert('Error', 'Ride request not found.');
        }
      } catch (error) {
        console.error('Error fetching ride request:', error);
        Alert.alert('Error', 'Failed to fetch driver ID.');
      }
    };

    fetchDriverId();
  }, [requestId]);

  useEffect(() => {
    if (driverId) {
      const timer = setTimeout(() => {
        navigation.navigate('Rating', { driverId });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [driverId]);

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
