// screens/BookRide/WaitingScreen.tsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Waiting">;

export default function WaitingScreen({ navigation }: Props) {
  useEffect(() => {
    // Simulate searching for a ride (later will be an API call)
    const timeout = setTimeout(() => {
      navigation.navigate("AvailableRides");
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#28a745" />
      <Text style={styles.text}>Keep waiting{'\n'}We are searching the best ride for you.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
});
