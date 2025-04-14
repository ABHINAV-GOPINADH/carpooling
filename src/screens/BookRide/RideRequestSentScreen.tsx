// screens/BookRide/RequestSentScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "RequestSent">;

export default function RequestSentScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.success}>Request Sent!</Text>
      <Text style={styles.subtitle}>You'll be notified once your ride is confirmed.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  success: { fontSize: 24, fontWeight: "bold", color: "#28a745", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#555", textAlign: "center", marginBottom: 20 },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
