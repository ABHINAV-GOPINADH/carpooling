// src/screens/publish_ride/PublishRideVehicleScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "PublishRideVehicle">;

export default function PublishRideVehicleScreen({ navigation }: Props) {
  const [vehicle, setVehicle] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  const handleNext = () => {
    // Validate fields if needed
    if (!vehicle || !plateNumber) {
      alert("Please enter vehicle and plate number.");
      return;
    }
    navigation.navigate("PublishRideLocation");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publish a Ride - Vehicle</Text>
      <TextInput
        style={styles.input}
        placeholder="Vehicle Model (e.g., Toyota Corolla)"
        value={vehicle}
        onChangeText={setVehicle}
      />
      <TextInput
        style={styles.input}
        placeholder="Plate Number"
        value={plateNumber}
        onChangeText={setPlateNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15,
  },
  button: {
    backgroundColor: "#28a745", padding: 15, borderRadius: 5, alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
