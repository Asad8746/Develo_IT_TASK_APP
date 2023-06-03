import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const iconConfig = {
  color: "black",
};

export const Header = () => {
  const renderTouchableIcon = (icon, onPress = () => {}) => {
    return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
  };
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.topRow]}>
        {renderTouchableIcon(
          <AntDesign name="close" size={16} color={iconConfig.color} />
        )}

        <View style={[styles.row]}>
          {renderTouchableIcon(
            <AntDesign name="left" size={12} color={iconConfig.color} />
          )}
          <Text style={styles.dateTitle}>Today</Text>
          {renderTouchableIcon(
            <AntDesign name="right" size={12} color={iconConfig.color} />
          )}
        </View>
        {renderTouchableIcon(
          <MaterialCommunityIcons
            name="calendar-month"
            size={20}
            color={iconConfig.color}
          />
        )}
      </View>
      <View style={[styles.row, styles.inputContainer]}>
        <Feather name="search" size={20} color="black" />
        <TextInput style={styles.textInput} />
      </View>
    </View>
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
});
