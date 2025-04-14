// src/screens/publish_ride/RideRequestsScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import {
  RideRequest,
  fetchRideRequestsForDriver,
  acceptRideRequest,
} from "../../api/rideService";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "RideRequests">;

export default function RideRequestsScreen({ navigation }: Props) {
  const [requests, setRequests] = useState<RideRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const userJson = await AsyncStorage.getItem("user");
      if (!userJson) throw new Error("User not logged in");

      const user = JSON.parse(userJson);
      const data = await fetchRideRequestsForDriver(user.uid);
      setRequests(data);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAccept = async (id: string) => {
    try {
      await acceptRideRequest(id);
      loadRequests(); // re-fetch after accept
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to accept request.");
    }
  };

  const renderItem = ({ item }: { item: RideRequest }) => (
    <View style={styles.requestCard}>
      <Text style={styles.customerName}>{item.customerName}</Text>
      <Text>Status: {item.status}</Text>
      {item.status === "Pending" && (
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAccept(item.id)}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#28a745" />
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No requests found.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  requestCard: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    borderRadius: 8,
  },
  customerName: { fontSize: 18, fontWeight: "bold" },
  acceptButton: {
    marginTop: 10,
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", textAlign: "center" },
});
