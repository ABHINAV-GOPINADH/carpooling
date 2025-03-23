import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "SignInSignUp">;

export default function SignInSignUpScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/travel.jpg")} style={styles.image} />
      <Text style={styles.title}>Let's travel together!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PersonalDetails")}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.linkText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  image: { width: 200, height: 150, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 10, width: "80%", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  linkText: { color: "#007bff", marginTop: 20, textDecorationLine: "underline" },
});
