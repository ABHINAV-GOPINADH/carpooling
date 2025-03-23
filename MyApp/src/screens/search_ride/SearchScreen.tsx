import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation/AppNavigator";

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, "Search">;

export default function SearchScreen() {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("Thu, 05 Nov");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Find a ride</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Pickup"
          value={pickup}
          onChangeText={setPickup}
        />
        <TextInput
          style={styles.input}
          placeholder="Search destination"
          value={destination}
          onChangeText={setDestination}
        />
      </View>

      <View style={styles.detailsContainer}>
        <TouchableOpacity
         onPress={() => console.log("Button Pressed")} 
         >
          <Text style={styles.dateText}>{date}</Text>
        </TouchableOpacity>
        <Text style={styles.passengerText}>1</Text>
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={() => console.log("Searching ride...")}>
        <Text style={styles.searchButtonText}>Search a ride</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  backButton: { position: "absolute", top: 40, left: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginVertical: 20 },
  inputContainer: { marginTop: 20 },
  input: { backgroundColor: "#f0f0f0", padding: 15, borderRadius: 8, marginBottom: 10 },
  detailsContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 20 },
  dateText: { fontSize: 16, fontWeight: "bold" },
  passengerText: { fontSize: 16, fontWeight: "bold" },
  searchButton: { backgroundColor: "#28a745", padding: 15, borderRadius: 8, alignItems: "center" },
  searchButtonText: { color: "#fff", fontWeight: "bold" },
});

