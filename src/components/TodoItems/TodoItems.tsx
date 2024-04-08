import { useState } from "react";
import { TodoItemsProps } from "../../ts/interfaces/Interface";
import { FaInbox } from "react-icons/fa";

import TodoItem from "../TodoItem/TodoItem";

import styles from "./todoItems.module.css";

export default function TodoItems({
  tasks,
  onDelete,
  onComplete,
}: TodoItemsProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredTasks =
    tasks && Array.isArray(tasks)
      ? tasks.filter((task) => {
          if (statusFilter === "all") return true;
          if (statusFilter === "completed") return task.isCompleted;
          if (statusFilter === "in progress") return !task.isCompleted;
          return false;
        })
      : [];

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
        <div className={styles.clearList}>
          <FaInbox />
        </div>
      ) : (
        <div className={styles.list}>
          {filteredTasks.map((task, index) => (
            <TodoItem
              key={index}
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
