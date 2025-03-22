import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { FontAwesome } from "@expo/vector-icons"; // For icons

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "SelectLocation">;

export default function SelectLocationScreen() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const navigation = useNavigation<NavigationProps>();

  const handleSearch = () => {
    if (pickup.trim() === "" || destination.trim() === "") {
      Alert.alert("Validation Error", "Please enter both pickup and destination.");
      return;
    }
    navigation.navigate("DateSelection", { selectedLocation: pickup });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a ride</Text>

      {/* Pickup Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="search" size={16} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search Pickup"
          value={pickup}
          onChangeText={setPickup}
        />
      </View>

      {/* Destination Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="search" size={16} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search destination"
          value={destination}
          onChangeText={setDestination}
        />
      </View>

      {/* Date & Passenger Info */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.dateContainer}>
          <FontAwesome name="calendar" size={16} color="black" />
          <Text style={styles.dateText}>Thu. 05 Nov</Text>
        </TouchableOpacity>
        <View style={styles.passengerContainer}>
          <FontAwesome name="user" size={16} color="black" />
          <Text style={styles.passengerText}>1</Text>
        </View>
      </View>

      {/* Search Ride Button */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchText}>Search a ride</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 15,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 16,
  },
  passengerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  passengerText: {
    marginLeft: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#00A862",
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  searchText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

