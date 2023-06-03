import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
export const CustomButton = ({
  title = "",
  renderIcon = () => null,
  onPress = () => {},
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.btnText}>{title}</Text>
      {renderIcon() && <View style={styles.iconContainer}>{renderIcon()}</View>}
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 48,
    backgroundColor: "#D72323",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    flexDirection: "row",
  },
  btnText: {
    color: "#fff",
    fontFamily: "Roboto-Bold",
    fontWeight: "500",
  },
  iconContainer: {
    marginLeft: 13,
  },
});
