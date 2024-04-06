import { createReducer } from "typesafe-actions";
import { Task } from "../../definitions/types";
import {
  TasksActions,
  addTask,
  removeTask,
  resetTodo,
  updateTask,
} from "../actions/tasks";

export type TasksSlice = {
  tasks: Task[];
};

const storedTasks: string | null = localStorage.getItem("todo-tasks");

const INITIAL_TASKS_STATE: TasksSlice = {
  tasks: storedTasks ? JSON.parse(storedTasks) : [],
};

export const tasksReducer = createReducer<TasksSlice, TasksActions>(
  INITIAL_TASKS_STATE
)
  .handleAction(resetTodo, () => {
    localStorage.removeItem("todo-tasks");
    return { tasks: [] };
  })
  .handleAction(addTask, (state, action) => {
    const updatedTasks = [...state.tasks, action.payload];
    localStorage.setItem("todo-tasks", JSON.stringify(updatedTasks));
    return {
      ...state,
      tasks: updatedTasks,
    };
  })
  .handleAction(updateTask, (state, action) => {
    const tasksClone = [...state.tasks];
    const { id: taskId, ...rest } = action.payload;
    const taskIndex = tasksClone.findIndex(({ id }) => taskId === id);
    const updatedTask = { ...tasksClone[taskIndex], ...rest };
    tasksClone[taskIndex] = updatedTask;
    localStorage.setItem("todo-tasks", JSON.stringify(tasksClone));
    return { ...state, tasks: tasksClone };
  })
  .handleAction(removeTask, (state, action) => {
    const updatedTasks = state.tasks.filter(
      ({ id }) => id !== action.payload.id
    );
    localStorage.setItem("todo-tasks", JSON.stringify(updatedTasks));
    return {
      ...state,
      tasks: updatedTasks,
    };
  });
