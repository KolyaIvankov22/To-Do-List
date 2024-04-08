import { BsFillCheckCircleFill } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import { useTodoStore } from "../../store";
import { TodoItemProps } from "../../ts/interfaces/Interface";
import styles from "./todoItem.module.css";

export default function TodoItem({
  task,
  onDelete,
  onComplete,
}: TodoItemProps) {
  const setTasksAndSave = useTodoStore((state) => state.setTasksAndSave);

  const handleComplete = (taskId: string) => {
    onComplete(taskId);
    setTasksAndSave(useTodoStore.getState().tasks);
  };

  const handleDelete = (taskId: string) => {
    onDelete(taskId);
    setTasksAndSave(useTodoStore.getState().tasks);
  };

  return (
    <div className={styles.task}>
      <button
        className={styles.checkContainer}
        onClick={() => handleComplete(task.id)}
      >
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>
      <p className={task.isCompleted ? styles.textCompleted : ""}>
        {task.title}
      </p>
      <button
        className={styles.deleteButton}
        onClick={() => handleDelete(task.id)}
      >
        <TbTrash size={20} />
      </button>
    </div>
  );
}
