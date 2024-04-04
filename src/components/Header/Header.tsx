import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState, ChangeEvent, FormEvent } from "react";
import { HeaderProps } from "../../ts/interfaces/Interface";

import styles from "./header.module.css";

export function Header({ handleAddTask }: HeaderProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 500);
      return;
    }
    handleAddTask(inputValue);
    setInputValue("");
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setInputValue(value);
      if (submitted && value.trim()) {
        setSubmitted(false);
      }
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Todos</h1>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className={`${submitted ? styles.animateShake : ""} ${
          styles.newTaskForm
        }`}
      >
        {inputValue.length >= 50 && (
          <p className={styles.inputMessage}>Limit is 50 symbols</p>
        )}
        <input
          placeholder="Add a new task"
          type="text"
          onChange={(e) => handleInput(e)}
          value={inputValue}
        />

        <button type="submit">
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
