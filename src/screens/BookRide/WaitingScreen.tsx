// screens/BookRide/WaitingScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { fetchAvailableRides } from "../../api/rideService"; // Import the API function
import { useRoute } from "@react-navigation/native";
type Props = NativeStackScreenProps<RootStackParamList, "Waiting">;

export default function WaitingScreen({ navigation }: Props) {
  const { currentLocation, destinationStation, selectedDate, numberOfSeats } = useRoute<Props["route"]>().params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAvailableRides = async () => {
      setLoading(true);
      const result = await fetchAvailableRides();


      if (result.success && result.data) {
        setLoading(false);
        navigation.navigate("AvailableRides", { availableRides: result.data });
      } else {
        setLoading(false);
        Alert.alert("Error", `Failed to fetch available rides: ${result.error || 'An unexpected error occurred.'}`);
      }
    };

    getAvailableRides();
  }, [currentLocation, destinationStation, selectedDate, numberOfSeats, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#28a745" animating={loading} />
      <Text style={styles.text}>
        {loading
          ? "Keep waiting\nWe are searching the best ride for you."
          : "Fetching available rides..."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
});