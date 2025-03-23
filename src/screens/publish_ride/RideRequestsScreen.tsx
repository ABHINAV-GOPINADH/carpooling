// src/screens/publish_ride/RideRequestsScreen.tsx
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator"; // adjust the import path as needed

type Props = NativeStackScreenProps<RootStackParamList, "RideRequests">;

interface Request {
  id: string;
  customerName: string;
  status: string;
}

const initialRequests: Request[] = [
  { id: "1", customerName: "John Doe", status: "Pending" },
  { id: "2", customerName: "Jane Smith", status: "Pending" },
];

export default function RideRequestsScreen({ navigation }: Props) {
  const [requests, setRequests] = useState<Request[]>(initialRequests);

  const handleAccept = (id: string) => {
    // Update the request status to "Accepted"
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === id ? { ...req, status: "Accepted" } : req
      )
    );
  };

  const renderItem = ({ item }: { item: Request }) => (
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
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
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
