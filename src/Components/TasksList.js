import React, { useRef, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TaskCard } from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { TaskActions } from "./TaskActions";
import { CustomBottomSheet } from "./BottomSheet";
import {
  TASKS_OPERATIONS,
  setSelectedTask,
  copyTask,
  setTaskAction,
  moveTask,
} from "../store/tasks";

export const TasksList = () => {
  const { selectedDate, selectedTask, data, taskAction } = useSelector(
    (store) => store.tasks
  );
  const dispatch = useDispatch();
  const actionsRef = useRef(null);
  const closeBottomSheet = useCallback(() => {
    actionsRef.current?.close();
  }, [actionsRef.current]);
  const onTaskPress = useCallback(
    (task) => {
      dispatch(setSelectedTask(task));
      actionsRef.current?.snapToZeroIndex();
    },
    [actionsRef.current]
  );
  console.log(selectedTask);
  const renderTouchableIcon = (time = "", customStyle) => {
    const onPress = () => {
      if (selectedTask) {
        dispatch(setSelectedTask(null));
        dispatch(setTaskAction(""));
        if (taskAction === TASKS_OPERATIONS.copy) {
          dispatch(copyTask({ ...selectedTask, time }));
        } else if (taskAction === TASKS_OPERATIONS.move) {
          dispatch(moveTask({ ...selectedTask, updatedTime: time }));
        }
      }
      actionsRef.current.close();
    };
    return (
      <TouchableOpacity
        style={[styles.iconContainer, customStyle]}
        onPress={onPress}
      >
        <AntDesign name="plus" size={20} color="white" />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <CustomBottomSheet ref={actionsRef}>
        <TaskActions closeBottomSheet={closeBottomSheet} />
      </CustomBottomSheet>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          {new Array(24).fill(1).map((_, idx) => {
            const time = String(idx).length === 1 ? `0${idx}:00` : `${idx}:00`;
            const tasks = data[selectedDate]?.tasks[time];

            if (tasks) {
              return (
                <View key={time}>
                  <View style={styles.row}>
                    <View style={styles.hourContainer}>
                      <Text style={styles.hourText}>{time}</Text>
                      <View style={styles.line} />
                    </View>
                    <View style={styles.taskContainer}>
                      {renderTouchableIcon(time, styles.iconWithTask)}
                      {tasks.map((task, idx) => {
                        const isSelected =
                          selectedTask && task.id === selectedTask.id;
                        return (
                          <>
                            <TaskCard
                              task={task}
                              isSelected={isSelected}
                              key={`${task.id}/${idx}`}
                              onTaskPress={onTaskPress}
                            />
                          </>
                        );
                      })}
                    </View>
                  </View>
                </View>
              );
            }
            return (
              <View style={styles.row} key={time}>
                <View style={styles.hourContainerWithoutTask}>
                  <Text style={styles.hourText}>{time}</Text>
                </View>
                <View style={styles.cardPlaceholder}>
                  {renderTouchableIcon(time)}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    zIndex: -2,
  },
  container: {
    width: "100%",
    paddingRight: 15,
    paddingLeft: 10,
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 60,
    // zIndex: -2,
  },
  line: {
    backgroundColor: "#00000033",
    flex: 1,
    width: 2,
    marginVertical: 15,
  },

  row: {
    flexDirection: "row",
  },
  taskContainer: {
    flex: 1,
  },
  cardPlaceholder: {
    flex: 1,
  },
  hourContainer: {
    paddingHorizontal: 15,
    alignItems: "center",
  },
  hourContainerWithoutTask: {
    marginBottom: 40,
    paddingHorizontal: 15,
    alignItems: "center",
  },

  hourText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Roboto-Regular",
  },
  iconWithTask: {
    marginBottom: 20,
  },
  iconContainer: {
    height: 25,
    width: 25,
    backgroundColor: "#2C2C2C",
    borderRadius: 100,
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
