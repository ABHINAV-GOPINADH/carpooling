import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const PaymentScreen = ({ route, navigation }: any) => {
  const { requestId } = route.params;

  const [loading, setLoading] = useState(true);
  const [pricePerSeat, setPricePerSeat] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI' | 'Card'>(
    'Cash'
  );

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const requestRef = doc(db, 'rideRequests', requestId);
        const requestSnap = await getDoc(requestRef);
        if (!requestSnap.exists()) throw new Error('Request not found');

        const requestData = requestSnap.data();
        const rideId = requestData.rideId;

        const rideRef = doc(db, 'rides', rideId);
        const rideSnap = await getDoc(rideRef);
        if (!rideSnap.exists()) throw new Error('Ride not found');

        const rideData = rideSnap.data();
        setPricePerSeat(parseFloat(rideData.pricePerSeat));
      } catch (err) {
        console.error('Error:', err);
        Alert.alert('Error', 'Could not load payment details');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [requestId]);

  const platformFee = 10;
  const tax = pricePerSeat * 0.05;
  const totalAmount = pricePerSeat + platformFee + tax;

  const handleConfirm = () => {
    Alert.alert('Payment Successful', `Paid via ${paymentMethod}`, [
      {
        text: 'OK',
        onPress: () =>
          navigation.navigate('PaymentConfirmation', {
            amount: totalAmount.toFixed(2),
            method: paymentMethod,
          }),
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>
          Loading payment summary...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Summary</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Base Fare</Text>
          <Text style={styles.value}>€{pricePerSeat.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Platform Fee</Text>
          <Text style={styles.value}>€{platformFee.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tax (5%)</Text>
          <Text style={styles.value}>€{tax.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>€{totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.paymentLabel}>Choose Payment Method</Text>
      <View style={styles.methodContainer}>
        {['Cash', 'UPI', 'Card'].map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.methodButton,
              paymentMethod === method && styles.methodButtonActive,
            ]}
            onPress={() => setPaymentMethod(method as any)}
          >
            <Text
              style={[
                styles.methodText,
                paymentMethod === method && styles.methodTextActive,
              ]}
            >
              {method}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm & Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
  value: {
    fontSize: 16,
    color: '#444',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  methodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  methodButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  methodButtonActive: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  methodText: {
    fontSize: 16,
    color: '#444',
  },
  methodTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
