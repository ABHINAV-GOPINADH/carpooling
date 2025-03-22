import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

// Define the types for navigation parameters
type RootStackParamList = {
  SelectLocation: undefined;
  DateSelection: { selectedLocation: string };
  SeatsSelection: { selectedDate: string; selectedLocation: string };
};

// Define types for navigation and route
type DateSelectionNavigationProp = StackNavigationProp<RootStackParamList, "DateSelection">;
type DateSelectionRouteProp = RouteProp<RootStackParamList, "DateSelection">;

export default function DateSelectionScreen() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation<DateSelectionNavigationProp>(); // Typed navigation
  const route = useRoute<DateSelectionRouteProp>(); // Typed route

  // Ensure selectedLocation is always defined
  const selectedLocation = route.params?.selectedLocation || "Unknown Location";

  const handleDateChange = (_event: any, selectedDate?: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false);
  };

  const handleNext = () => {
    navigation.navigate("SeatsSelection", { 
      selectedDate: date.toDateString(),
      selectedLocation,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Travel Date</Text>
      <Text style={styles.dateText}>{date.toDateString()}</Text>
      <Button title="Pick a Date" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Button title="Next" onPress={handleNext} />
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
  dateText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
