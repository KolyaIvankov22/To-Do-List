export interface TodoStore {
  tasks: Task[];
  loadSavedTasks: () => void;
  setTasksAndSave: (newTasks: Task[]) => void;
  addTask: (taskTitle: string) => void;
  deleteTaskById: (taskId: string) => void;
  toggleTaskCompletedById: (taskId: string) => void;
}

export interface HeaderProps {
  tasks: Task[];
  handleAddTask: (taskTitle: string) => void;
}

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface TodoItemsProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

export interface TodoItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}
