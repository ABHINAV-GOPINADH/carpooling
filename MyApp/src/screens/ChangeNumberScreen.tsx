// screens/ChangeNumberScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const ChangeNumberScreen = () => {
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = () => {
    // Add logic to handle number change (e.g., send OTP, update backend)
    console.log('New number submitted:', newNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new phone number"
        value={newNumber}
        onChangeText={setNewNumber}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangeNumberScreen;