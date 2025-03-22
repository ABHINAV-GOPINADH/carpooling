import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// Define the type for the navigation stack
type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
};

// Define the type for navigation prop
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Welcome">;
type WelcomeScreenRouteProp = RouteProp<RootStackParamList, "Welcome">;

type Props = {
  navigation: WelcomeScreenNavigationProp;
  route: WelcomeScreenRouteProp;
};

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.successIcon}>✅</Text>
      <Text style={styles.message}>Congratulations!</Text>
      <Text>Your verification is successful</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  successIcon: { fontSize: 50, marginBottom: 20 },
  message: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
