// src/screens/publish_ride/PublishRideDateTimeScreen.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import DatePicker from "react-native-date-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "PublishRideDateTime">;

export default function PublishRideDateTimeScreen({ navigation }: Props) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleNext = () => {
    navigation.navigate("PublishRideSeats");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publish a Ride - Date & Time</Text>

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={date.toDateString()}
          editable={false}
        />
      </TouchableOpacity>

      <DatePicker
        modal
        open={showDatePicker}
        date={date}
        onConfirm={(selectedDate) => {
          setShowDatePicker(false);
          setDate(selectedDate);
        }}
        onCancel={() => setShowDatePicker(false)}
        mode="date"
      />

      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Select Time"
          value={time.toLocaleTimeString()}
          editable={false}
        />
      </TouchableOpacity>

      <DatePicker
        modal
        open={showTimePicker}
        date={time}
        onConfirm={(selectedTime) => {
          setShowTimePicker(false);
          setTime(selectedTime);
        }}
        onCancel={() => setShowTimePicker(false)}
        mode="time"
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 15,
  },
  button: {
    backgroundColor: "#28a745", padding: 15, borderRadius: 5, alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
