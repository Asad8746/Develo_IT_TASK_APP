import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
export const CustomButton = ({
  title = "",
  type = "primary",
  renderIcon = () => null,
  onPress = () => {},
  disabled = false,
  customContainerStyle = {},
}) => {
  const btnStyle = type === "primary" ? styles.primaryBtn : styles.secondaryBtn;
  const btnTextStyle =
    type === "primary" ? styles.primaryText : styles.secondaryText;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        disabled ? styles.disabledBtn : btnStyle,
        customContainerStyle,
      ]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[styles.btnText, disabled ? styles.disabledText : btnTextStyle]}
      >
        {title}
      </Text>
      {renderIcon() && <View style={styles.iconContainer}>{renderIcon()}</View>}
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]),
  customContainerStyle: PropTypes.object,
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    flexDirection: "row",
  },
  primaryBtn: {
    backgroundColor: "#D72323",
  },
  secondaryBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
  },
  btnText: {
    color: "#fff",
    fontFamily: "Roboto-Bold",
    fontWeight: "500",
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: "#000",
  },
  iconContainer: {
    marginLeft: 13,
  },
  disabledBtn: {
    backgroundColor: "grey",
  },
  disabledText: {
    color: "#fff",
  },
});
