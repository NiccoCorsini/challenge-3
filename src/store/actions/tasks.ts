import { ActionType, createAction } from "typesafe-actions";
import { Task } from "../../definitions/types";

export const resetTodo = createAction("todo::reset")<void>();

export const addTask = createAction("todo::addTask")<Task>();

type UpdateTaskPayload = Partial<Omit<Task, "id">> & { id: string };

export const updateTask = createAction("todo::updateTask")<UpdateTaskPayload>();

export const removeTask = createAction("todo::removeTask")<{ id: string }>();

export type TasksActions =
  | ActionType<typeof resetTodo>
  | ActionType<typeof addTask>
  | ActionType<typeof updateTask>
  | ActionType<typeof removeTask>;
