import React, { useCallback, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { CustomDatePicker } from "./DatePicker";
import { setSelectedDate } from "../store/tasks";

const iconConfig = {
  color: "black",
};

export const Header = () => {
  const pickerRef = useRef(null);
  const dispatch = useDispatch();
  const today = dayjs().format("DD-MM-YYYY");
  const selectedDate = useSelector((store) => store.tasks.selectedDate);
  const [day, month, year] = selectedDate.split("-");

  const renderTouchableIcon = (icon, onPress = () => {}) => {
    return (
      <TouchableOpacity style={styles.iconTouchable} onPress={onPress}>
        {icon}
      </TouchableOpacity>
    );
  };

  const onCalendarIconPress = useCallback(() => {
    pickerRef.current?.showDatePicker();
  }, [pickerRef.current]);
  const onDatePick = useCallback((date) => {
    if (date) {
      const formatedDate = dayjs(date).format("DD-MM-YYYY");
      dispatch(setSelectedDate(formatedDate));
    }
  }, []);

  const onLeftIconPress = useCallback(() => {
    const date = dayjs(`${year}-${month}-${day}`)
      .subtract(1, "day")
      .format("DD-MM-YYYY");
    dispatch(setSelectedDate(date));
  }, [selectedDate]);

  const onRightIconPress = useCallback(() => {
    const date = dayjs(`${year}-${month}-${day}`)
      .add(1, "day")
      .format("DD-MM-YYYY");
    dispatch(setSelectedDate(date));
  }, [selectedDate]);

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.row, styles.topRow]}>
          {renderTouchableIcon(
            <AntDesign name="close" size={16} color={iconConfig.color} />
          )}

          <View style={[styles.row]}>
            {renderTouchableIcon(
              <AntDesign name="left" size={12} color={iconConfig.color} />,
              onLeftIconPress
            )}
            <Text style={styles.dateTitle}>
              {today === selectedDate ? "Today" : selectedDate}
            </Text>
            {renderTouchableIcon(
              <AntDesign name="right" size={12} color={iconConfig.color} />,
              onRightIconPress
            )}
          </View>
          {renderTouchableIcon(
            <MaterialCommunityIcons
              name="calendar-month"
              size={20}
              color={iconConfig.color}
            />,
            onCalendarIconPress
          )}
        </View>
        <View style={[styles.row, styles.inputContainer]}>
          <Feather name="search" size={20} color="black" />
          <TextInput style={styles.textInput} />
        </View>
      </View>
      <CustomDatePicker
        date={new Date(`${year}-${month}-${day}`)}
        mode="date"
        ref={pickerRef}
        onDatePick={onDatePick}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    paddingTop: 16,
    paddingBottom: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  topRow: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  dateTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 25,
    fontFamily: "Roboto-Black",
  },
  inputContainer: {
    backgroundColor: "#EEEEEE",
    height: 45,
    borderRadius: 6,
    paddingLeft: 13,
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: 12,
    color: "#2C2C2C",
    marginLeft: 10,
    paddingLeft: 5,
  },
  iconTouchable: {
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});
