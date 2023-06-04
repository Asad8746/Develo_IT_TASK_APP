import React, { useCallback } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedTask,
  setTaskAction,
  TASKS_OPERATIONS,
} from "../store/tasks";
export const TaskActions = ({
  closeBottomSheet = () => {},
  openFormSheet = () => {},
}) => {
  const dispatch = useDispatch();
  const { taskAction, selectedTask } = useSelector((store) => store.tasks);
  const renderAction = (title, onPress = () => {}, isActive = false) => {
    const activeStyle = isActive ? styles.activeAction : {};
    const activeTextStyle = isActive ? styles.activeActionText : {};
    return (
      <TouchableOpacity style={[styles.action, activeStyle]} onPress={onPress}>
        <Text style={[styles.actionText, activeTextStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const onCopyPress = useCallback(() => {
    dispatch(setTaskAction(TASKS_OPERATIONS.copy));
  }, []);
  const onMovePress = useCallback(() => {
    dispatch(setTaskAction(TASKS_OPERATIONS.move));
  }, []);
  const onEditPress = useCallback(() => {
    dispatch(setTaskAction(TASKS_OPERATIONS.edit));
    closeBottomSheet();
    openFormSheet();
  }, []);
  const onSelectedPress = useCallback(() => {
    if (selectedTask) {
      dispatch(setSelectedTask(null));
    }
    dispatch(setTaskAction(""));
    closeBottomSheet();
  }, [selectedTask]);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <>
          <TouchableOpacity
            style={styles.selectedContainer}
            activeOpacity={0.8}
            onPress={onSelectedPress}
          >
            <AntDesign name="closecircle" size={24} color="#2C2C2C" />
            <View style={styles.selected}>
              <Text style={styles.selectedText}>1</Text>
              <Text style={styles.selectedText}>Selected</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.actionsContainer}>
            {renderAction("Edit", onEditPress)}
            {renderAction(
              "Copy",
              onCopyPress,
              taskAction === TASKS_OPERATIONS.copy
            )}
            {renderAction(
              "Move",
              onMovePress,
              taskAction === TASKS_OPERATIONS.move
            )}
          </View>
        </>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "100%",
    // justifyContent: "center",
    paddingLeft: 10,
    paddingVertical: 15,
  },
  scrollContainer: {
    // alignItems: "center",
  },
  selectedContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 8,
    borderRightColor: "#000000",
    borderRightWidth: 1,
  },
  selected: {
    justifyContent: "center",
    alignItems: "center",
  },
  selectedText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Roboto-Regular",
  },
  action: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    minWidth: 93,
    backgroundColor: "#F4F4F4",
    marginRight: 5,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    fontSize: 12,
    fontWeight: "100",
    fontFamily: "Roboto-Thin",
  },
  actionsContainer: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  activeAction: {
    backgroundColor: "#555555",
  },
  activeActionText: {
    color: "white",
  },
});
