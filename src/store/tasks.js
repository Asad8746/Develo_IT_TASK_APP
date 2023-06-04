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
  },
  reducers: {
    createNewTask(state, action) {
      const { heading, detail, day, time } = action.payload;
      const [hour, minutes] = time.split(":");
      const taskDay = state.data[day];
      if (taskDay) {
        taskDay.tasks[`${hour}:00`]
          ? taskDay.tasks[`${hour}:00`].push({
              id: time,
              heading,
              detail,
              dueDate: `${hour} : ${minutes} | ${day}`,
            })
          : (taskDay.tasks[`${hour}:00`] = [
              {
                id: time,
                heading,
                detail,
                dueDate: `${time} | ${day}`,
              },
            ]);
      } else {
        state.data[day] = {
          title: day,
          tasks: {
            [`${hour}:00`]: [
              {
                id: time,
                heading,
                detail,
                dueDate: `${time} | ${day}`,
              },
            ],
          },
        };
      }
    },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    // editTask(state, action) {
    //   console.log("Edit Task");
    //   return { ...state };
    // },
  },
});

export const { createNewTask, editTask, setSelectedDate } = slice.actions;
export default slice.reducer;
