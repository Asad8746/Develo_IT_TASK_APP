import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Container,
  Header,
  CustomButton,
  CustomBottomSheet,
  CreateTaskForm,
} from "../Components";
export const HomeScreen = () => {
  const sheetRef = useRef(null);

  const renderButtonIcon = useCallback(() => {
    return <MaterialIcons name="add" size={18} color="#fff" />;
  }, []);
  const onCreateBtnPress = useCallback(() => {
    sheetRef.current?.snapToFirstIndex();
  }, [sheetRef.current]);
  const closeCreateTaskBt = useCallback(() => {
    sheetRef.current?.close();
  }, [sheetRef.current]);
  return (
    <Container>
      <Header />
      <CustomBottomSheet ref={sheetRef}>
        <CreateTaskForm onClose={closeCreateTaskBt} />
      </CustomBottomSheet>
      <View style={styles.floatingButtonContainer}>
        <CustomButton
          title="Add New Task"
          renderIcon={renderButtonIcon}
          onPress={onCreateBtnPress}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: "absolute",
    bottom: 10,
    width: "90%",
    alignSelf: "center",
    zIndex: -1,
  },
});
