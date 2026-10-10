
import useLocalStorage from "../hooks/useLocalStorage";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import { defaultTasks } from "../data/defaults";
import styles from "./Tasks.module.css";

function Tasks() {
  const [tasks, setTasks] = useLocalStorage(
    "tasks",
    defaultTasks
  );

  function handleComplete(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }

  function handleAddTask(title) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
    };

    setTasks((prevTasks) => [
      ...prevTasks,
      newTask,
    ]);
  }

  function handleDelete(id) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  }

  function handleEdit(id, newTitle) {
    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: trimmedTitle,
            }
          : task
      )
    );
  }

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>Tasks</h1>

        <p>
          Manage your development tasks and keep
          your learning on track.
        </p>
      </header>

      <AddTask onAddTask={handleAddTask} />

      <section className={styles.taskList}>
        <div className={styles.listHeader}>
          <h2>All Tasks</h2>

          <span className={styles.taskCount}>
            {completedCount} / {tasks.length} completed
          </span>
        </div>

        <TaskList
          tasks={tasks}
          onComplete={handleComplete}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </section>
    </div>
  );
}

export default Tasks;
