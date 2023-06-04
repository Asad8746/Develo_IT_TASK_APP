import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// here i am using dux pattern where we place every related to state management inside of one file
// like reducers actionsCreators etc

const slice = createSlice({
  name: "Tasks",
  initialState: {
    loading: true,
    selectedDate: dayjs().format("DD-MM-YYYY"),
    error: "",
    data: {},
    selectedTask: null,
    taskAction: "",
  },
  reducers: {
    copyTask(state, action) {
      const selectedDate = state.selectedDate;
      const taskDay = state.data[selectedDate];
      const { heading, detail, time } = action.payload;
      const [hour] = time?.split(":");
      const id = Math.floor(Math.random() * 5000);

      if (taskDay) {
        taskDay.tasks[`${hour}:00`]
          ? taskDay.tasks[`${hour}:00`].push({
              id,
              heading,
              detail,
              time,
              day: selectedDate,
            })
          : (taskDay.tasks[`${hour}:00`] = [
              {
                id,
                heading,
                detail,
                time,
                day: selectedDate,
              },
            ]);
      } else {
        state.data[selectedDate] = {
          title: selectedDate,
          tasks: {
            [`${hour}:00`]: [
              {
                id,
                heading,
                detail,
                time,
                day: selectedDate,
              },
            ],
          },
        };
      }
    },
    createNewTask(state, action) {
      const { heading, detail, day, time } = action.payload;
      const [hour] = time.split(":");
      const taskDay = state.data[day];
      const id = Math.floor(Math.random() * 5000);
      if (taskDay) {
        taskDay.tasks[`${hour}:00`]
          ? taskDay.tasks[`${hour}:00`].push({
              id,
              heading,
              detail,
              time,
              day,
            })
          : (taskDay.tasks[`${hour}:00`] = [
              {
                id,
                heading,
                detail,
                time,
                day,
              },
            ]);
      } else {
        state.data[day] = {
          title: day,
          tasks: {
            [`${hour}:00`]: [
              {
                id,
                heading,
                detail,
                time,
                day,
              },
            ],
          },
        };
      }
    },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    setSelectedTask(state, action) {
      state.selectedTask = action.payload;
    },
    setTaskAction(state, action) {
      if (state.taskAction === action.payload) {
        state.taskAction = "";
      } else {
        state.taskAction = action.payload;
      }
    },
  },
});
export const TASKS_OPERATIONS = {
  copy: "COPY_TASK",
  move: "MOVE_TASK",
};

export const {
  createNewTask,
  editTask,
  setSelectedDate,
  setSelectedTask,
  setTaskAction,
  copyTask,
} = slice.actions;
export default slice.reducer;
