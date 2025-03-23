// screens/search_ride/BookRide/RideStatusScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "RideStatus">;

export default function RideStatusScreen({ navigation, route }: Props) {
  const { requestStatus } = route.params;
  const [status, setStatus] = useState(requestStatus);

  // Dummy simulation: change status to "Accepted" after 5 seconds if not already accepted.
  useEffect(() => {
    if (status !== "Accepted") {
      const timer = setTimeout(() => {
        setStatus("Accepted");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>Your ride request is: {status}</Text>
      {status === "Accepted" && (
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => navigation.navigate("Payment")}
        >
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  statusText: { fontSize: 20, textAlign: "center", marginBottom: 20 },
  proceedButton: { backgroundColor: "#007bff", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center" },
});
