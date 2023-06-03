import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Container,
  Header,
  CustomButton,
  CustomBottomSheet,
  CreateTaskForm,
  TasksList,
} from "../Components";
const data = {
  "04-05-2023": {
    title: "04-05-2023",
    tasks: {
      "8:00": [
        {
          id: 1,
          heading: "Task #1",
          detail: "Task Detail",
          dueDate: "8 AM | 12-01-22",
        },
        {
          id: 2,
          heading: "Task #1",
          detail: "Task Detail",
          dueDate: "8 AM | 12-01-22",
        },
      ],
      "9:00": [
        {
          id: 1,
          heading: "Task #1",
          detail: "Task Detail",
          dueDate: "8 AM | 12-01-22",
        },
      ],
      "1:00": [
        {
          id: 1,
          heading: "Task #1",
          detail: "Task Detail",
          dueDate: "8 AM | 12-01-22",
        },
        {
          id: 2,
          heading: "Task #1",
          detail: "Task Detail",
          dueDate: "8 AM | 12-01-22",
        },
      ],
    },
  },
};

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
      <TasksList />
      <View style={styles.floatingButtonContainer}>
        <CustomButton
          title="Add New Task"
          renderIcon={renderButtonIcon}
          onPress={onCreateBtnPress}
        />
      </View>
      <CustomBottomSheet ref={sheetRef}>
        <CreateTaskForm onClose={closeCreateTaskBt} />
      </CustomBottomSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: "absolute",
    bottom: 10,
    width: "90%",
    alignSelf: "center",
    zIndex: 1,
  },
});
