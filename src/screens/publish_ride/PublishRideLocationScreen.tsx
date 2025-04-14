import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "PublishRideLocation">;

export default function PublishRideLocationScreen({ navigation, route }: Props) {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  // Data received from previous screen (PublishRideVehicle)
  const { vehicle, plateNumber } = route.params;

  const handleNext = () => {
    if (!pickup || !destination) {
      alert("Please enter pickup and destination.");
      return;
    }

    // Passing the current data (pickup, destination) and previous data (vehicle, plateNumber) to the next screen
    navigation.navigate("PublishRideStops", {
      vehicle,
      plateNumber,
      pickup,
      destination,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publish a Ride - Location</Text>
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
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
