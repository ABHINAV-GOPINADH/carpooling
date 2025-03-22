import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>E</Text>
      <Text style={styles.tagline}>Let's Travel Together</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignInSignUp")}> 
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate("SignIn")}>Already have an account? Log in</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00C6A7" },
  logo: { fontSize: 64, fontWeight: "bold", color: "white" },
  tagline: { fontSize: 18, color: "white", marginVertical: 20 },
  button: { backgroundColor: "white", padding: 10, borderRadius: 10 },
  buttonText: { fontSize: 16, color: "#00C6A7", fontWeight: "bold" },
  link: { marginTop: 20, color: "white", textDecorationLine: "underline" }
});

export default SplashScreen;