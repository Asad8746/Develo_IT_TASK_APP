import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export const TaskCard = ({ isSelected = true }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Heading</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Due Date</Text>
          <Text style={[styles.dateText, styles.date]}>10 AM | 12-01-22</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detail} numberOfLines={3} lineBreakMode="tail">
          Lorem ipsum dolor sit amet consectetur. Eu eleifend lacus est
          malesuada id sit habitasse sit. Id gravida vitae ultrices consequat
          viverra sagittis adipiscing.
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
    </View>
  );
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
  },
  dateContainer: {
    flexDirection: "row",
    gap: 10,
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
