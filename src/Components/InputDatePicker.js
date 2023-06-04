import React, { useCallback, useRef } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";

import { CustomDatePicker } from "./DatePicker";
import dayjs from "dayjs";

export const InputDatePicker = ({ mode, time, day, onDateChange }) => {
  const pickerRef = useRef(null);

  const onDatePickerPress = useCallback(() => {
    pickerRef.current?.showDatePicker();
  }, [pickerRef.current]);
  const onDatePick = useCallback((date) => {
    if (date) {
      const time = dayjs(date).format("HH : mm");
      const day = dayjs(date).format("DD-MM-YYYY");
      onDateChange(time, day);
    }
  }, []);

  return (
    <>
      <TouchableOpacity
        style={styles.datePlaceholderContainer}
        onPress={onDatePickerPress}
      >
        <Text style={styles.dateText}>
          {time} | {day}
        </Text>
        <AntDesign name="caretdown" size={10} color="#2B2B2B" />
        <CustomDatePicker ref={pickerRef} mode={mode} onDatePick={onDatePick} />
      </TouchableOpacity>
    </>
  );
};

InputDatePicker.propTypes = {
  mode: PropTypes.string,
  day: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
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
