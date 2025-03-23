// src/screens/publish_ride/PublishRideSeatsScreen.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "PublishRideSeats">;

export default function PublishRideSeatsScreen({ navigation }: Props) {
  const [seats, setSeats] = useState(1);

  const handleNext = () => {
    navigation.navigate("PublishRideSummary");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How many seats are you offering?</Text>
      <View style={styles.counterRow}>
        <TouchableOpacity onPress={() => setSeats(Math.max(1, seats - 1))}>
          <Text style={styles.counterButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.seatsText}>{seats}</Text>
        <TouchableOpacity onPress={() => setSeats(seats + 1)}>
          <Text style={styles.counterButton}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  counterRow: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 20,
  },
  counterButton: {
    fontSize: 30, marginHorizontal: 20, color: "#28a745",
  },
  seatsText: { fontSize: 24, minWidth: 40, textAlign: "center" },
  button: {
    backgroundColor: "#28a745", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
