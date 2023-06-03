import React, { useCallback, useRef } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { CustomDatePicker } from "./DatePicker";
import { AntDesign } from "@expo/vector-icons";

export const InputDatePicker = () => {
  const pickerRef = useRef(null);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  const onDatePickerPress = useCallback(() => {
    pickerRef.current?.showDatePicker();
  }, [pickerRef.current]);
  return (
    <>
      <TouchableOpacity
        style={styles.datePlaceholderContainer}
        onPress={onDatePickerPress}
      >
        <Text style={styles.dateText}>10:00 AM | 12/2/23</Text>
        <AntDesign name="caretdown" size={10} color="#2B2B2B" />
        <CustomDatePicker ref={pickerRef} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  datePlaceholderContainer: {
    width: "100%",
    padding: 15,
    backgroundColor: "#F4F4F4",
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
    color: "#555555",
  },
});
