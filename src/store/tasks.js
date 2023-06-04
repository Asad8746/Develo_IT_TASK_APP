import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// here i am using dux pattern where we place every related to state management inside of one file
// like reducers actionsCreators etc
export const TASKS_OPERATIONS = {
  copy: "COPY_TASK",
  move: "MOVE_TASK",
  edit: "EDIT_TASK",
};
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
    editTask(state, action) {
      const { id, heading, detail, time, day } = action.payload;
      const taskDay = state.data[day];
      const [hour] = time?.split(":");
      if (taskDay) {
        state.selectedTask = null;
        state.taskAction = "";
        taskDay.tasks[`${hour}:00`] = taskDay?.tasks[`${hour}:00`].map(
          (task) => {
            if (task.id === id) {
              return {
                id,
                heading,
                detail,
                time,
                day,
              };
            } else {
              return task;
            }
          }
        );
      }
    },
    moveTask(state, action) {
      const selectedDate = state.selectedDate;
      const prevDate = action.payload?.day;
      const taskDay = state.data[selectedDate];
      const prevTaskDay = state.data[prevDate];
      const { id: prevId, heading, detail, time, updatedTime } = action.payload;
      const [hour] = updatedTime?.split(":");
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

      if (prevTaskDay) {
        const [hour] = time?.split(":");
        prevTaskDay.tasks[`${hour}:00`] = prevTaskDay.tasks[`${hour}:00`]
          ? prevTaskDay.tasks[`${hour}:00`].filter((task) => {
              task.id !== prevId;
            })
          : [];
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
      return {
        ...state,
        selectedTask: action.payload,
      };
    },
    setTaskAction(state, action) {
      if (
        state.taskAction === action.payload &&
        action.payload !== TASKS_OPERATIONS.edit
      ) {
        state.taskAction = "";
      } else {
        state.taskAction = action.payload;
      }
    },
  },
});

export const {
  createNewTask,
  editTask,
  setSelectedDate,
  setSelectedTask,
  setTaskAction,
  copyTask,
  moveTask,
} = slice.actions;
export default slice.reducer;
