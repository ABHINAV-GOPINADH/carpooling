import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.successIcon}>✅</Text>
      <Text style={styles.message}>Congratulations!</Text>
      <Text>Your verification is successful</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  successIcon: { fontSize: 50, marginBottom: 20 },
  message: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
