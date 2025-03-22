import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "PersonalDetails">;

export default function PersonalDetailsScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  console.log("Current Name:", name);
  console.log("Current Gender:", gender);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello! Signup to get started</Text>

      {/* Full Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      {/* Gender Dropdown */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Transgender" value="transgender" />
        </Picker>
      </View>

      {/* Save & Next Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("Navigating to SignUp Screen");
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.buttonText}>Save & Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  pickerContainer: { borderWidth: 1, borderRadius: 5, marginBottom: 10, overflow: "hidden" },
  picker: { height: 50, width: "100%" },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
