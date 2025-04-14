import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

type UserData = {
  name: string;
  email: string;
  uid: string;
  gender: string;
};

export default function HomeScreen({ navigation }: Props) {
  const [user, setUser] = useState<UserData | null>(null);
  const nav = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const userJson = await AsyncStorage.getItem("user");
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {user?.name || "User"}</Text>
        <TouchableOpacity onPress={() => nav.navigate("ProfileSummary" as never)}>
          <Ionicons name="person-circle-outline" size={40} color="#114B5F" />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <Image source={require("../../assets/travel.jpg")} style={styles.banner} />

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SelectLocation")}>
        <Text style={styles.buttonText}>Book a ride</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("PublishRideVehicle")}>
        <Text style={styles.secondaryButtonText}>Publish a ride</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewRequestsButton} onPress={() => navigation.navigate("RideRequests")}>
        <Text style={styles.viewRequestsButtonText}>View Ride Requests</Text>
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
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  // New styles for "View Ride Requests" button
  viewRequestsButton: {
    backgroundColor: "#114B5F",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  viewRequestsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});


