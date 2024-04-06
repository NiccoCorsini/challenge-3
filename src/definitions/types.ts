export type Task = {
  readonly id: string;
  description: string;
  isCompleted?: boolean;
  dueDate?: Date;
};
