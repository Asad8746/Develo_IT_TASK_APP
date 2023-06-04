import React, { useCallback } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
export const TaskCard = ({
  isSelected = false,
  task = {},
  onTaskPress = () => {},
}) => {
  const { selectedDate } = useSelector((store) => store.tasks);
  const onPress = useCallback(() => {
    onTaskPress(task);
  }, []);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText} numberOfLines={1}>
          {task?.heading}
        </Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Due Date</Text>
          <Text style={[styles.dateText, styles.date]}>
            {task?.time} | {task?.day}
          </Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detail} numberOfLines={3} lineBreakMode="tail">
          {task?.detail}
        </Text>
        <View
          style={[
            styles.selectedContainer,
            isSelected ? styles.selectedTask : {},
          ]}
        >
          {isSelected && <AntDesign name="check" size={21} color="white" />}
        </View>
      </View>
    </TouchableOpacity>
  );
};
TaskCard.propTypes = {
  isSelected: PropTypes.bool,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    heading: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
  }),
};
const styles = StyleSheet.create({
  container: {
    height: 110,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  headingContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(44, 44, 44, 0.3)",
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingText: {
    color: "#BB0D4C",
    fontWeight: "700",
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    flex: 1,
  },
  dateContainer: {
    flexShrink: 0,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  dateText: {
    color: "#2C2C2C",
    fontWeight: "500",
    fontFamily: "Roboto-Bold",
    fontSize: 12,
  },
  date: {
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
  },
  detailContainer: {
    flex: 1,
    paddingVertical: 5,
    flexDirection: "row",
  },
  detail: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "#555555",
    fontWeight: "400",
    lineHeight: 18,
    flex: 1,
  },
  selectedContainer: {
    backgroundColor: "#C4C4C4",
    height: 24,
    width: 24,
    borderRadius: 100,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    alignSelf: "flex-end",
    flexShrink: 0,
  },
  selectedTask: {
    backgroundColor: "#455BCE",
    borderColor: "#455BCE",
  },
});
