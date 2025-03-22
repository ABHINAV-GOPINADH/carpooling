// screens/BookRide/SelectLocationScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "SelectLocation">;

export default function SelectLocationScreen({ navigation }: Props) {
  const [location, setLocation] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Where are you now?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SelectStation")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5 },
  button: {
    marginTop: 20,
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
