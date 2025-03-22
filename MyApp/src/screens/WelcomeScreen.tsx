import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types"; 


export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.successIcon}>✅</Text>
      <Text style={styles.message}>Congratulations!</Text>
      <Text>Your verification is successful</Text>
      <View style={styles.buttonContainer}>
        <Button title="Go to Home" onPress={() => navigation.navigate("Home")} color="green" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  successIcon: { fontSize: 50, marginBottom: 20 },
  message: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  buttonContainer: { marginTop: 20, width: "50%" }, // Ensures proper button alignment


});
