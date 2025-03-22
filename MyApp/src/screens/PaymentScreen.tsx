import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const PaymentScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [cashInput, setCashInput] = useState<string>('');

  // Handle number key press
  const handleKeyPress = (value: string) => {
    setCashInput((prev) => prev + value);
  };

  // Handle backspace (delete last digit)
  const handleBackspace = () => {
    setCashInput((prev) => prev.slice(0, -1));
  };

  // Handle clear (reset input)
  const handleClear = () => {
    setCashInput('');
  };

  const handleConfirm = () => {
    navigation.navigate('PaymentConfirmation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.fare}>€ 234</Text>
      <Text style={styles.fareLabel}>Total fare</Text>

      <Text style={styles.inputLabel}>Enter cash</Text>
      <TextInput
        style={styles.input}
        value={cashInput}
        editable={false} // Input is controlled by keypad
        placeholder="Enter amount"
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>

      <View style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
        {/* Replace PQRS with Backspace */}
        <TouchableOpacity style={styles.key} onPress={handleBackspace}>
          <Text style={styles.keyText}>⌫</Text>
        </TouchableOpacity>
        {/* Keep 0 in the middle */}
        <TouchableOpacity style={styles.key} onPress={() => handleKeyPress('0')}>
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>
        {/* Replace WXYZ with Clear */}
        <TouchableOpacity style={styles.key} onPress={handleClear}>
          <Text style={styles.keyText}>Clear</Text>
        </TouchableOpacity>
      </View>
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
    textAlign: 'center',
    marginTop: 50,
  },
  fare: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  fareLabel: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 18,
    padding: 10,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  key: {
    width: '30%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  keyText: {
    fontSize: 18,
  },
});

export default PaymentScreen;