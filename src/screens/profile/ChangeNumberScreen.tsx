import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const ChangeNumberScreen = () => {
  const [newNumber, setNewNumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    if (!newNumber) {
      Alert.alert("Error", "Please enter a phone number");
      return;
    }
    // Simulate sending OTP
    setShowOtpInput(true);
    Alert.alert('OTP sent', 'A dummy OTP has been sent to your number.');
  };

  const handleVerifyOtp = () => {
    if (otp.trim() === '1234') {
      Alert.alert('Success', 'Phone number changed successfully!');
    } else {
      Alert.alert('Error', 'Invalid OTP!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Number</Text>

      {!showOtpInput ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter new phone number"
            value={newNumber}
            onChangeText={setNewNumber}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSendOtp}>
            <Text style={styles.submitButtonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.otpLabel}>OTP sent to {newNumber}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={4}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleVerifyOtp}>
            <Text style={styles.submitButtonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  otpLabel: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ChangeNumberScreen;
