import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { signInUser } from "../../api/firebaseAuth";

type Props = NativeStackScreenProps<RootStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password!");
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
  
    try {
      const response = await signInUser(email, password);
  
      if (!response.success) {
        Alert.alert("Sign-in Failed", response.error || "Unknown error occurred.");
        return;
      }
  
      // ✅ TypeScript is now sure response.user exists
      console.log("User signed in:", response.user.uid);
      Alert.alert("Success", "Signed in successfully!");
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Sign-in Failed", error instanceof Error ? error.message : "An unexpected error occurred.");
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, borderColor: "#ccc" },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 5, marginTop: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  linkText: { color: "#007bff", marginTop: 20, textAlign: "center", textDecorationLine: "underline" },
});
