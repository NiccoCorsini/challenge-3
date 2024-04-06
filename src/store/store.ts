import {
  Middleware,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import loggerMiddleware from "redux-logger";
import { TasksSlice, tasksReducer } from "./reducers/tasks";

export type Store = {
  tasks: TasksSlice;
};

const rootReducer = combineReducers<Store>({
  tasks: tasksReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware as unknown as Middleware)
);
