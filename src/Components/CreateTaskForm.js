import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "./Input";
import { CustomButton } from "./Button";
import { InputDatePicker } from "./InputDatePicker";
import { useFormValidation } from "../hooks";
import {
  TASKS_OPERATIONS,
  createNewTask,
  editTask,
  setTaskAction,
  setSelectedTask,
} from "../store/tasks";

const INIT_DATE_STATE = {
  time: dayjs().format("HH:mm"),
  day: dayjs().format("DD-MM-YYYY"),
};

export const CreateTaskForm = ({
  initHeading = "",
  initDetail = "",
  initDate,
  onClose = () => {},
  pickerDisabled = false,
}) => {
  const dispatch = useDispatch();
  const { selectedTask, taskAction } = useSelector((store) => store.tasks);
  const isEditedForm = selectedTask && taskAction === TASKS_OPERATIONS.edit;
  const taskHeading = useFormValidation(
    initHeading,
    "Task Heading is Required"
  );
  const taskDetail = useFormValidation(initDetail, "Task Detail is Required");
  const [date, setDate] = useState(initDate ? initDate : INIT_DATE_STATE);
  const disabled = !taskHeading.isValid && !taskDetail.isValid;
  const onSavePress = useCallback(() => {
    if (isEditedForm) {
      dispatch(
        editTask({
          ...selectedTask,
          heading: taskHeading.value,
          detail: taskDetail.value,
          time: date.time,
          day: date.day,
        })
      );
    } else {
      dispatch(
        createNewTask({
          heading: taskHeading.value,
          detail: taskDetail.value,
          time: date.time,
          day: date.day,
        })
      );
    }
    taskHeading.reset();
    taskDetail.reset();
    setDate({ ...INIT_DATE_STATE });
    onClose();
  }, [taskHeading.value, taskDetail.value, date.day, date.time, isEditedForm]);
  const onCancelPress = () => {
    onClose();
    if (isEditedForm) {
      taskHeading.reset();
      taskDetail.reset();
      setDate({ ...INIT_DATE_STATE });
      dispatch(setSelectedTask(null));
      dispatch(setTaskAction(""));
    }
  };
  const onDateChange = useCallback((time, day) => {
    setDate({ time, day });
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add Task</Text>
        </View>
        <Input
          label="Task Heading"
          placeholder="Enter Task Heading"
          {...taskHeading}
          customContainerStyle={styles.formInputContainer}
        />
        <Input
          label="Task Detail"
          placeholder="Enter Your Task Detail"
          {...taskDetail}
          customContainerStyle={styles.formInputContainer}
          customInputContainerStyle={styles.detailsInputContainer}
          customInputStyle={styles.detailsInput}
          multiline
          textAlignVertical="top"
        />
        <InputDatePicker
          day={date.day}
          time={date.time}
          onDateChange={onDateChange}
          disabled={pickerDisabled}
        />
        <CustomButton
          title="Save Changes"
          customContainerStyle={styles.saveBtnContainer}
          onPress={onSavePress}
          disabled={disabled}
        />
        <CustomButton type="secondary" title="Cancel" onPress={onCancelPress} />
      </View>
    </TouchableWithoutFeedback>
  );
};

CreateTaskForm.propTypes = {
  onClose: PropTypes.func,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 25,
  },
  titleContainer: {
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Roboto-Bold",
  },
  formInputContainer: {
    marginBottom: 20,
  },
  detailsInputContainer: {
    height: 110,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 15,
  },
  detailsInput: {
    height: "100%",
  },
  saveBtnContainer: {
    marginBottom: 10,
  },
});
