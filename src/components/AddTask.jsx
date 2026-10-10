
import { useState } from "react";
import styles from "./AddTask.module.css";

function AddTask({ onAddTask }) {
  const [title, setTitle] = useState("");

  function handleAdd(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddTask(trimmedTitle);
    setTitle("");
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleAdd}
    >
      <input
        className={styles.input}
        type="text"
        placeholder="What do you want to accomplish?"
        aria-label="New task title"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
      />

      <button
        className={styles.button}
        type="submit"
      >
        + Add Task
      </button>
    </form>
  );
}

export default AddTask;
