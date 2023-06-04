import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Container,
  Header,
  CustomButton,
  CustomBottomSheet,
  CreateTaskForm,
  TasksList,
} from "../Components";

export const HomeScreen = () => {
  const createSheetRef = useRef(null);

  const renderButtonIcon = useCallback(() => {
    return <MaterialIcons name="add" size={18} color="#fff" />;
  }, []);
  const onCreateBtnPress = useCallback(() => {
    createSheetRef.current?.snapToFirstIndex();
  }, [createSheetRef.current]);
  const closeCreateTaskBt = useCallback(() => {
    createSheetRef.current?.close();
  }, [createSheetRef.current]);

  return (
    <Container>
      <>
        <Header />
        <TasksList />
        <View style={styles.floatingButtonContainer}>
          <CustomButton
            title="Add New Task"
            renderIcon={renderButtonIcon}
            onPress={onCreateBtnPress}
          />
        </View>
        <CustomBottomSheet ref={createSheetRef}>
          <CreateTaskForm onClose={closeCreateTaskBt} />
        </CustomBottomSheet>
      </>
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
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: "red",
    zIndex: 2,
  },
});
