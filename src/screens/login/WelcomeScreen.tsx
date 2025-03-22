import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export default function WelcomeScreen({ navigation }: Props) {
  const handleOk = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successIcon}>✅</Text>
      <Text style={styles.message}>Congratulations!</Text>
      <Text style={styles.subText}>Your verification is successful</Text>
      <TouchableOpacity style={styles.button} onPress={handleOk}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  successIcon: { fontSize: 50, marginBottom: 20 },
  message: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subText: { marginBottom: 20 },
  button: { backgroundColor: "#28a745", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
