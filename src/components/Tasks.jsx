
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import styles from "./Tasks.module.css";

function Tasks({
  id,
  title,
  completed,
  onComplete,
  onDelete,
  onEdit,
}) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleComplete() {
    onComplete(id);
  }

  function handleDeleteClick() {
    setShowConfirm(true);
  }

  function handleConfirmDelete() {
    onDelete(id);
    setShowConfirm(false);
  }

  function handleCancelDelete() {
    setShowConfirm(false);
  }

  function handleEdit() {
    setEditTitle(title);
    setEditing(true);
  }

  function handleCancel() {
    setEditTitle(title);
    setEditing(false);
  }

  function handleSave(event) {
    event.preventDefault();

    const trimmedTitle = editTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    onEdit(id, trimmedTitle);
    setEditing(false);
  }

  return (
    <>
      <div
        className={[
          styles.item,
          completed ? styles.completed : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {editing ? (
          <form
            className={styles.editForm}
            onSubmit={handleSave}
          >
            <input
              className={styles.input}
              type="text"
              aria-label="Edit task title"
              value={editTitle}
              onChange={(event) =>
                setEditTitle(event.target.value)
              }
              autoFocus
            />

            <button type="submit">
              Save
            </button>

            <button
              className={styles.secondaryButton}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <div className={styles.details}>
              <p className={styles.title}>
                {title}
              </p>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.completeButton}
                type="button"
                onClick={handleComplete}
              >
                {completed ? "Mark Pending" : "Mark Complete"}
              </button>

              <button
                className={styles.editButton}
                type="button"
                onClick={handleEdit}
              >
                Edit
              </button>

              <button
                className={styles.deleteButton}
                type="button"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}

export default Tasks;
