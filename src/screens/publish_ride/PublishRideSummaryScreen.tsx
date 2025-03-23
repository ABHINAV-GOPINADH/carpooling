// src/screens/publish_ride/PublishRideSummaryScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "PublishRideSummary">;

export default function PublishRideSummaryScreen({ navigation }: Props) {
  const handleConfirm = () => {
    // In a real app, you'd finalize the ride creation here.
    Alert.alert("Success", "Ride Published Successfully!");
    navigation.navigate("Home"); // or navigate to Home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publish a Ride - Summary</Text>
      <Text style={styles.summaryText}>Vehicle: Toyota Corolla</Text>
      <Text style={styles.summaryText}>Pickup: Some address</Text>
      <Text style={styles.summaryText}>Destination: Another address</Text>
      <Text style={styles.summaryText}>Stops: [Stop 1, Stop 2...]</Text>
      <Text style={styles.summaryText}>Price: 300 / seat</Text>
      <Text style={styles.summaryText}>Date/Time: ...</Text>
      <Text style={styles.summaryText}>Seats: 3</Text>

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
    backgroundColor: "#28a745", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
