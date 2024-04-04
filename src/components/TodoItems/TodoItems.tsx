import { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./todoItems.module.css";

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

export default function TodoItems({ tasks, onDelete, onComplete }: Props) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "completed") return task.isCompleted;
    if (statusFilter === "in progress") return !task.isCompleted;
    return false;
  });

  const tasksQuantity = filteredTasks.length;

  const handleStatusChange = (newStatusFilter: string) => {
    setStatusFilter(newStatusFilter);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p className={styles.primaryText}>Created tasks</p>
          <span className={styles.taskCount}>{tasksQuantity}</span>
        </div>

        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader} onClick={toggleDropdown}>
            <p className={styles.textPurple}>
              {statusFilter === "completed"
                ? "Completed tasks"
                : statusFilter === "in progress"
                ? "In progress"
                : "All tasks"}
            </p>
            <div className={styles.dropdownIcon}>
              {isDropdownOpen ? "▲" : "▼"}
            </div>
          </div>
          {isDropdownOpen && (
            <div className={styles.dropdownContent}>
              {["all", "completed", "in progress"].map((filter) => (
                <p
                  key={filter}
                  className={styles.dropdownItem}
                  onClick={() => handleStatusChange(filter)}
                >
                  {filter === "in progress" ? "In progress" : `${filter} tasks`}
                </p>
              ))}
            </div>
          )}
        </div>
      </header>

      {tasksQuantity === 0 ? (
        <div className={styles.clearList}>Your task list is empty</div>
      ) : (
        <div className={styles.list}>
          {filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onComplete={onComplete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
