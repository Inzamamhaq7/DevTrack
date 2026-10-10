
import Tasks from "./Tasks";
import styles from "./TaskList.module.css";

function TaskList({
  tasks,
  onComplete,
  onDelete,
  onEdit,
}) {
  if (tasks.length === 0) {
    return (
      <p className={styles.empty}>
        No tasks yet. Add a task above to get started.
      </p>
    );
  }

  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <Tasks
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
          onComplete={onComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;
