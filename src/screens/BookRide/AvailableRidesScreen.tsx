// screens/BookRide/AvailableRidesScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { Ride, sendRideRequest } from "../../api/rideService";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "AvailableRides">;

export default function AvailableRidesScreen({ navigation, route }: Props) {
  const { availableRides } = route.params;

  const handleSendRequest = async (ride: Ride) => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      if (!userJson) throw new Error("User not found");
      const user = JSON.parse(userJson);

      const response = await sendRideRequest(
        ride.id,
        ride.driverId,
        user.name,
        user.uid
      );
      
      if (response.success && response.requestId) {
        navigation.navigate("RideStatus", { requestId: response.requestId });
      } else {
        Alert.alert("Request Failed", response.error || "Unknown error");
      }
      
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  const renderItem = ({ item }: { item: Ride }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("RideDetail", { ride: item })}
    >
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
      <Text>
        {item.date} | {item.time}
      </Text>
      <Text>
        {item.location} ➡ {item.destination}
      </Text>
      <Text>Vehicle: {item.vehicle}</Text>
      <Text>
        {item.seatsAvailable > 0
          ? `${item.seatsAvailable} seat${item.seatsAvailable > 1 ? "s" : ""} left`
          : "No seats left"}
        {"  "}|  Per seat: {item.price}
      </Text>

      <TouchableOpacity
        style={[styles.button, item.seatsAvailable <= 0 && styles.buttonDisabled]}
        onPress={() => item.seatsAvailable > 0 && handleSendRequest(item)}
        disabled={item.seatsAvailable <= 0}
      >
        <Text style={styles.buttonText}>
          {item.seatsAvailable > 0 ? "Request" : "Full"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <TouchableOpacity
      style={styles.homeButton}
      onPress={() => navigation.navigate("Home")}
    >
      <Text style={styles.homeButtonText}>🏠 Home</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={availableRides}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          No rides found.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  homeButton: {
    alignSelf: "center",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
