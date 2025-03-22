import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../navigation/AppNavigator"; // Ensure this exists

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUserName(parsedUser.name); // Retrieve user's name
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>GOOD DAY, <Text style={styles.boldText}>{userName || "Guest"}</Text></Text>

      <Image source={require("../../assets/travel2.jpg")} style={styles.image} />

      <TouchableOpacity 
        style={styles.findRideButton} 
        // onPress={() => navigation.navigate("FindRide")}
      >
        <Text style={styles.buttonText}>Find a ride</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.publishRideButton} 
        onPress={() => navigation.navigate("PublishRide")}
      >
        <Text style={styles.publishButtonText}>Publish a ride</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <Text style={styles.navText}>Home</Text>
        <Text style={styles.navText}>My trips</Text>
        <Text style={styles.navText}>Notifications</Text>
        <Text style={styles.navText}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  greeting: { fontSize: 24, fontWeight: "500", marginBottom: 20 },
  boldText: { fontWeight: "bold" },
  image: { width: 300, height: 200, resizeMode: "contain", marginBottom: 20 },
  findRideButton: { backgroundColor: "#28a745", padding: 15, borderRadius: 5, width: "70%", alignItems: "center", marginBottom: 10, borderEndEndRadius: 20, borderStartStartRadius: 20 },
  publishRideButton: { backgroundColor: "#fff", padding: 15, borderRadius: 5, width: "70%", alignItems: "center", borderWidth: 1, borderColor: "#ccc" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  publishButtonText: { color: "#000", fontWeight: "bold" },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", width: "100%", position: "absolute", bottom: 10, paddingVertical: 10, backgroundColor: "#f8f8f8" },
  navText: { fontSize: 16, color: "#666" }
});
