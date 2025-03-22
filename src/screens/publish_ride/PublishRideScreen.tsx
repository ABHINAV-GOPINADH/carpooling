import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native";

export default function PublishRideScreen() {
  const navigation = useNavigation();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [stops, setStops] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [availableSeats, setAvailableSeats] = useState("1");
  const [route, setRoute] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);

  const handlePublishRide = () => {
    if (!pickup || !destination) {
      Alert.alert("Error", "Please enter both pickup and destination addresses.");
      return;
    }
    Alert.alert("Success", "Ride Published Successfully!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publish a Ride</Text>

      <TextInput
        style={styles.input}
        placeholder="Pickup Address"
        value={pickup}
        onChangeText={setPickup}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination Address"
        value={destination}
        onChangeText={setDestination}
      />

      <TouchableOpacity onPress={() => setDatePickerOpen(true)}>
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={date.toDateString()}
          editable={false}
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setTimePickerOpen(true)}>
        <TextInput
          style={styles.input}
          placeholder="Select Time"
          value={time.toLocaleTimeString()}
          editable={false}
        />
      </TouchableOpacity>

      <DatePicker
        modal
        open={isTimePickerOpen}
        date={time}
        onConfirm={(selectedTime) => {
          setTimePickerOpen(false);
          setTime(selectedTime);
        }}
        onCancel={() => setTimePickerOpen(false)}
        mode="time"
      />

      <TextInput
        style={styles.input}
        placeholder="Available Seats"
        value={availableSeats}
        onChangeText={setAvailableSeats}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your route here"
        value={route}
        onChangeText={setRoute}
      />

      <TextInput
        style={styles.input}
        placeholder="Vehicle (e.g., Red Innova)"
        value={vehicle}
        onChangeText={setVehicle}
      />

      <TouchableOpacity style={styles.button} onPress={handlePublishRide}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, borderColor: "#ccc" },
  addStopText: { color: "#007bff", textAlign: "left", marginBottom: 10 },
  vehicleText: { fontSize: 16, fontWeight: "500", marginVertical: 10 },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 5, marginTop: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
