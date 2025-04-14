import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "PublishRideStops">;

export default function PublishRideStopsScreen({ navigation, route }: Props) {
  const { vehicle, plateNumber, pickup, destination } = route.params;

  const [stops, setStops] = useState<string[]>([]);
  const [newStop, setNewStop] = useState("");

  const addStop = () => {
    if (newStop.trim()) {
      setStops([...stops, newStop.trim()]);
      setNewStop("");
    }
  };

  const handleNext = () => {
    navigation.navigate("PublishRidePrices", {
      vehicle,
      plateNumber,
      pickup,
      destination,
      stops,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publish a Ride - Stops</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a stop"
        value={newStop}
        onChangeText={setNewStop}
      />
      <TouchableOpacity style={styles.addButton} onPress={addStop}>
        <Text style={styles.addButtonText}>+ Add stop</Text>
      </TouchableOpacity>

      {stops.map((stop, index) => (
        <Text key={index} style={styles.stopItem}>{stop}</Text>
      ))}

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
    borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007bff", paddingVertical: 10, borderRadius: 5, alignItems: "center", marginBottom: 10,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  stopItem: { fontSize: 16, marginVertical: 5 },
  button: {
    backgroundColor: "#28a745", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
