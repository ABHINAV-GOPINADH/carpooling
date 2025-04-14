// screens/BookRide/RideStatusScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

type Props = NativeStackScreenProps<RootStackParamList, "RideStatus">;

export default function RideStatusScreen({ navigation, route }: Props) {
  const { requestId } = route.params;
  const [status, setStatus] = useState<string>("Pending");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const reqRef = doc(db, "rideRequests", requestId);
    const unsubscribe = onSnapshot(reqRef, (snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      setStatus(data.status);
      setLoading(false);
    }, (error) => {
      console.error("Failed to listen to request:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, [requestId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.statusText}>Checking request status…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        Your ride request is:{" "}
        <Text style={status === "Accepted" ? styles.accepted : styles.pending}>
          {status}
        </Text>
      </Text>

      {status === "Accepted" && (
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => navigation.navigate("Payment", { requestId })}
        >
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  statusText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  pending: {
    color: "#ff9800",
    fontWeight: "bold",
  },
  accepted: {
    color: "#28a745",
    fontWeight: "bold",
  },
  proceedButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
