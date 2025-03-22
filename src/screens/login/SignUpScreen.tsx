import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { signUpUser } from "../../api/firebaseAuth";


type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

export default function SignUpScreen({ navigation, route }: Props) {
  const { name = "", gender = "" } = route.params || {}; // Default to empty string
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log("Received Name:", name);
  console.log("Received Gender:", gender);

  const handleSignUp = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    const result = await signUpUser(email, password, name, gender);
    if (result.success) {
      Alert.alert("Success", "Account created successfully!");
      navigation.replace("SignIn");
    } else {
      Alert.alert("Signup Failed", result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      {name && <Text style={styles.infoText}>Name: {name}</Text>}
      {gender && <Text style={styles.infoText}>Gender: {gender}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  infoText: { fontSize: 16, fontWeight: "500", textAlign: "center", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, borderColor: "#ccc" },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 5, marginTop: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  linkText: { color: "#007bff", marginTop: 20, textAlign: "center", textDecorationLine: "underline" },
});
