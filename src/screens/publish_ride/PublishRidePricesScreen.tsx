// src/screens/publish_ride/PublishRidePricesScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "PublishRidePrices">;

export default function PublishRidePricesScreen({ navigation }: Props) {
  const [pricePerSeat, setPricePerSeat] = useState("");

  const handleNext = () => {
    if (!pricePerSeat) {
      alert("Please enter a price per seat.");
      return;
    }
    navigation.navigate("PublishRideDateTime");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publish a Ride - Prices</Text>
      <TextInput
        style={styles.input}
        placeholder="Price per seat (e.g. 300)"
        value={pricePerSeat}
        onChangeText={setPricePerSeat}
        keyboardType="numeric"
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
