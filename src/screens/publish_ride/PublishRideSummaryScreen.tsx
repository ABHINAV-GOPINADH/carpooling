// src/screens/publish_ride/PublishRideSummaryScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { publishRide, RideData } from "../../api/rideService";
import { useRoute } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "PublishRideSummary">;

export default function PublishRideSummaryScreen({ navigation }: Props) {
  const route = useRoute<Props["route"]>();
  const {
    vehicle,
    plateNumber,
    pickup,
    destination,
    stops,
    pricePerSeat,
    date,
    time,
    seats,           // number of seats the driver selected
  } = route.params;

  const handleConfirm = async () => {
    const rideData: RideData = {
      vehicle,
      plateNumber,
      pickup,
      destination,
      stops,
      pricePerSeat: parseFloat(pricePerSeat),  // ensure number
      date: date.toISOString(),
      time: time.toLocaleTimeString(),
      seatsAvailable: seats,                   // map directly
    };

    const result = await publishRide(rideData);

    if (result.success) {
      Alert.alert("Success", "Ride Published Successfully!", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
    } else {
      Alert.alert("Error", `Failed to publish ride: ${result.error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publish a Ride – Summary</Text>
      <Text style={styles.summaryText}>Vehicle: {vehicle}</Text>
      <Text style={styles.summaryText}>Plate Number: {plateNumber}</Text>
      <Text style={styles.summaryText}>Pickup: {pickup}</Text>
      <Text style={styles.summaryText}>Destination: {destination}</Text>
      <Text style={styles.summaryText}>Stops: {stops.join(", ")}</Text>
      <Text style={styles.summaryText}>Price: {pricePerSeat} / seat</Text>
      <Text style={styles.summaryText}>
        Date/Time: {date.toDateString()} {time.toLocaleTimeString()}
      </Text>
      <Text style={styles.summaryText}>Seats: {seats}</Text>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm & Publish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  summaryText: { fontSize: 16, marginVertical: 5 },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
