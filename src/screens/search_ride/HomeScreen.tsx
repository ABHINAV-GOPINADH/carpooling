import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

// Typing for HomeScreen props
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [name] = useState("Siffat"); // Static name for now (no Firebase)
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {name}</Text>
        <TouchableOpacity onPress={() => nav.navigate("ProfileSummary" as never)}>
          <Ionicons name="person-circle-outline" size={40} color="#114B5F" />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <Image source={require("../../../assets/travel.jpg")} style={styles.banner} />

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SelectLocation")}
      >
        <Text style={styles.buttonText}>Book a ride</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("PublishRide")}
      >
        <Text style={styles.secondaryButtonText}>Publish a ride</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#114B5F",
  },
  banner: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});
