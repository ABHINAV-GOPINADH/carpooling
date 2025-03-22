// screens/BookRide/SelectSeatsScreen.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "SelectSeats">;

export default function SelectSeatsScreen({ navigation }: Props) {
  const [seats, setSeats] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>How many seats do you need?</Text>

      <View style={styles.counter}>
        <TouchableOpacity onPress={() => setSeats(Math.max(1, seats - 1))}>
          <Text style={styles.counterButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.seatsText}>{seats}</Text>
        <TouchableOpacity onPress={() => setSeats(seats + 1)}>
          <Text style={styles.counterButton}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Waiting")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 18, marginBottom: 10 },
  counter: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  counterButton: { fontSize: 30, marginHorizontal: 20, color: "#28a745" },
  seatsText: { fontSize: 24 },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
