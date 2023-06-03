import React, { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Container,
  Header,
  CustomButton,
  CustomBottomSheet,
} from "../Components";
export const HomeScreen = () => {
  const sheetRef = useRef(null);

  const renderButtonIcon = useCallback(() => {
    return <MaterialIcons name="add" size={18} color="#fff" />;
  }, []);
  const onCreateBtnPress = useCallback(() => {
    sheetRef.current?.snapToFirstIndex();
  }, [sheetRef.current]);
  return (
    <Container>
      <Header />

      <CustomButton
        title="Add New Task"
        renderIcon={renderButtonIcon}
        onPress={onCreateBtnPress}
      />
      <CustomBottomSheet ref={sheetRef} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
