import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TaskCard } from "./TaskCard";
import { useSelector } from "react-redux";

export const TasksList = () => {
  const { selectedDate, data } = useSelector((store) => store.tasks);
  const renderTouchableIcon = (customStyle) => {
    return (
      <TouchableOpacity style={[styles.iconContainer, customStyle]}>
        <AntDesign name="plus" size={20} color="white" />
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {new Array(24).fill(1).map((_, idx) => {
          const time = String(idx).length === 1 ? `0${idx}:00` : `${idx}:00`;
          const tasks = data[selectedDate]?.tasks[time];
          if (tasks) {
            return (
              <View>
                <View style={styles.row}>
                  <View style={styles.hourContainer}>
                    <Text style={styles.hourText}>{time}</Text>
                    <View style={styles.line} />
                  </View>
                  <View style={styles.taskContainer}>
                    {renderTouchableIcon(styles.iconWithTask)}
                    {tasks.map((task) => {
                      return (
                        <>
                          <TaskCard task={task} />
                        </>
                      );
                    })}
                  </View>
                </View>
              </View>
            );
          }
          return (
            <View style={styles.row}>
              <View style={styles.hourContainerWithoutTask}>
                <Text style={styles.hourText}>{time}</Text>
              </View>
              <View style={styles.cardPlaceholder}>
                {renderTouchableIcon()}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
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
