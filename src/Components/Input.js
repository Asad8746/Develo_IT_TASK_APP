import React, { useCallback } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import PropsTypes from "prop-types";
// import { Error } from "../Error";
import AntDesign from "react-native-vector-icons/AntDesign";

export const Input = ({
  isValid = false,
  label = "",
  secureTextEntry = false,
  keyboardType = "default",
  placeholder = "",
  customContainerStyle,
  customInputContainerStyle,
  customInputStyle,
  onChange = () => {},
  blur = false,
  onBlur = () => {},
  animatedValue = 0,
  value,
  error,
  ...rest
}) => {
  const onInputBlur = useCallback(() => {
    onBlur();
  }, []);

  const renderMessage = () => {
    return !isValid && blur ? (
      <Text style={styles.errorMessage}>{error}</Text>
    ) : null;
  };
  return (
    <View style={[styles.container, customContainerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.textStyle}>{label}</Text>
        {blur ? (
          isValid ? (
            <AntDesign name="checkcircle" size={16} color={"green"} />
          ) : (
            <AntDesign name="closecircle" size={16} color={"red"} />
          )
        ) : null}
      </View>
      <View style={[styles.inputContainer, customInputContainerStyle]}>
        <TextInput
          placeholder={placeholder}
          value={value}
          style={[styles.input, customInputStyle]}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCorrect={false}
          onChangeText={onChange}
          autoCapitalize="none"
          onBlur={onInputBlur}
          {...rest}
        />
      </View>
      {renderMessage()}
    </View>
  );
};

Input.propTypes = {
  placeholder: PropsTypes.string.isRequired,
  secureTextEntry: PropsTypes.bool.isRequired,
  keyboardType: PropsTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#F4F4F4",
    borderBottomColor: "white",
    paddingVertical: 15,
    paddingLeft: 14,
    borderBottomWidth: 0.5,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  labelContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#fff",
    letterSpacing: 2,
    alignSelf: "center",
    fontSize: 12,
    color: "#555555",
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
  },
  textStyle: {
    flex: 1,
    color: "#BB0D4C",
    fontWeight: "500",
    fontFamily: "Roboto-Regular",
  },
  errorMessage: {
    color: "red",
    fontSize: 11,
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
  },
});
