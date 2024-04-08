import { create } from "zustand";
import { TodoStore } from "./ts/interfaces/Interface";

const LOCAL_STORAGE_KEY = "todo:tasks";

let idCounter = 1;

export const useTodoStore = create<TodoStore>((set) => ({
  tasks: [],
  loadSavedTasks: () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      set({ tasks: JSON.parse(saved) });
    } else {
      set({ tasks: [] });
    }
  },
  setTasksAndSave: (newTasks) => {
    set({ tasks: newTasks });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  },
  addTask: (taskTitle) => {
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: String(idCounter++),
          title: taskTitle,
          isCompleted: false,
        },
      ],
    }));
  },
  deleteTaskById: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId.toString()),
    }));
  },

  toggleTaskCompletedById: (taskId) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === taskId.toString()) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          };
        }
        return task;
      }),
    }));
  },
}));
