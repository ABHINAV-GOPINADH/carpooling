// screens/BookRide/AvailableRidesScreen.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "AvailableRides">;

const dummyRides = [
  {
    id: "1",
    name: "Siffat Ullah Shah",
    rating: "4.8",
    time: "April 3, 2025 | 8:00 AM",
    location: "Abbasseen House, Estonia",
    destination: "234 kings roads, Estonia",
    vehicle: "Mercedes",
    price: "€234",
  },
  {
    id: "2",
    name: "Siffat Ullah Shah",
    rating: "4.8",
    time: "April 3, 2025 | 8:00 AM",
    location: "Abbasseen House, Estonia",
    destination: "234 kings roads, Estonia",
    vehicle: "Mercedes",
    price: "€234",
  },
];

export default function AvailableRidesScreen({ navigation }: Props) {
  const renderItem = ({ item }: { item: typeof dummyRides[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.driverName}>{item.name}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </View>
      <Text>{item.time}</Text>
      <Text>{item.location} ➡ {item.destination}</Text>
      <Text>Vehicle: {item.vehicle}</Text>
      <Text>Total seats: 2 | Per seat: {item.price}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RequestSent")}
      >
        <Text style={styles.buttonText}>Request</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={dummyRides}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  driverName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  rating: {
    color: "gray",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
