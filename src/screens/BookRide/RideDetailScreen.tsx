// screens/BookRide/RideDetailScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "RideDetail">;

export default function RideDetailScreen({ route }: Props) {
  const { ride } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/80" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.driverName}>{ride.name}</Text>
          <Text style={styles.rating}>⭐ {ride.rating}</Text>
        </View>
      </View>
      <Text style={styles.info}>Date: {ride.date}</Text>
      <Text style={styles.info}>Time: {ride.time}</Text>
      <Text style={styles.info}>From: {ride.location}</Text>
      <Text style={styles.info}>To: {ride.destination}</Text>
      <Text style={styles.info}>Vehicle: {ride.vehicle}</Text>
      <Text style={styles.info}>Price per seat: {ride.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  driverName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 16,
    color: "gray",
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});
