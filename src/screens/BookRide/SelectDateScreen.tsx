import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { DatePickerModal } from "react-native-paper-dates";
import { Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "SelectDate">;

export default function SelectDateScreen({ navigation }: Props) {
  const [date, setDate] = useState<Date | undefined>();
  const [show, setShow] = useState(false);
  const { currentLocation, destinationStation } = useRoute<Props["route"]>().params;

  const onDismiss = () => setShow(false);

  const onConfirm = ({ date: selectedDate }: { date: Date | undefined }) => {
    setDate(selectedDate);
    setShow(false);
  };

  const handleNext = () => {
    if (date) {
      navigation.navigate("SelectSeats", {
        currentLocation: currentLocation,
        destinationStation: destinationStation,
        selectedDate: date.toISOString(), // Pass date as ISO string
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>When do you want to go?</Text>

      <TouchableOpacity onPress={() => setShow(true)} style={styles.datePicker}>
        <Text style={styles.dateText}>
          {date ? date.toDateString() : "Select a date"}
        </Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DatePickerModal
        locale="en"
        mode="single"
        visible={show}
        onDismiss={onDismiss}
        date={date}
        onConfirm={onConfirm}
      />

      <TouchableOpacity
        style={[styles.button, !date && styles.disabledButton]}
        onPress={handleNext}
        disabled={!date} // Disable next button until a date is selected
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 18, marginBottom: 10 },
  datePicker: {
    borderWidth: 1,
    borderColor: "#cccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  dateText: { fontSize: 16 },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    opacity: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});