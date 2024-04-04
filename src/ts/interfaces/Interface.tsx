export interface TodoStore {
  tasks: Task[];
  loadSavedTasks: () => void;
  setTasksAndSave: (newTasks: Task[]) => void;
  addTask: (taskTitle: string) => void;
  deleteTaskById: (taskId: number) => void;
  toggleTaskCompletedById: (taskId: number) => void;
}

export interface HeaderProps {
  handleAddTask: (taskTitle: string) => void;
}

export interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface TodoItemsProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

export interface TodoItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}
