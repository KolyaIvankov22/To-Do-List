import { useEffect } from "react";
import { Header } from "./components/Header/Header";
import TodoItems from "./components/TodoItems/TodoItems";
import { useTodoStore } from "./store";

function App() {
  const tasks = useTodoStore((state) => state.tasks);
  const loadSavedTasks = useTodoStore((state) => state.loadSavedTasks);
  const addTask = useTodoStore((state) => state.addTask);
  const deleteTaskById = useTodoStore((state) => state.deleteTaskById);
  const toggleTaskCompletedById = useTodoStore(
    (state) => state.toggleTaskCompletedById
  );

  useEffect(() => {
    loadSavedTasks();
  }, []);

  return (
    <>
      <Header handleAddTask={addTask} />
      <TodoItems
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
      />
    </>
  );
}

export default App;
