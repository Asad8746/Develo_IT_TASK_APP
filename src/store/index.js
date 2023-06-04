import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks";
const reducers = combineReducers({
  tasks: tasksReducer,
});

export default configureStore({
  reducer: reducers,
});
