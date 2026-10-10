
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import ConfirmDialog from "../components/ConfirmDialog";
import { defaultGoals } from "../data/defaults";
import styles from "./Goals.module.css";

function normalizeProgress(value) {
  const progress = Number(value);

  if (!Number.isFinite(progress)) {
    return 0;
  }

  return Math.min(100, Math.max(0, progress));
}

function Goals() {
  const [goals, setGoals] = useLocalStorage(
    "goals",
    defaultGoals
  );

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [progress, setProgress] = useState(0);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTargetDate, setEditTargetDate] = useState("");
  const [editProgress, setEditProgress] = useState(0);

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);
  const [deleteId, setDeleteId] = useState(null);

  function handleAddGoal(event) {
    event.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      !targetDate
    ) {
      return;
    }

    const validProgress = normalizeProgress(progress);

    const newGoal = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      targetDate,
      progress: validProgress,
      completed: validProgress === 100,
    };

    setGoals((prevGoals) => [...prevGoals, newGoal]);

    setTitle("");
    setDescription("");
    setTargetDate("");
    setProgress(0);
    setShowForm(false);
  }

  function handleDeleteGoal(id) {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  }

  function handleConfirmDelete() {
    setGoals((prevGoals) =>
      prevGoals.filter((goal) => goal.id !== deleteId)
    );

    setDeleteId(null);
    setShowDeleteConfirm(false);
  }

  function handleCancelDelete() {
    setDeleteId(null);
    setShowDeleteConfirm(false);
  }

  function handleEdit(goal) {
    setEditingId(goal.id);
    setEditTitle(goal.title);
    setEditDescription(goal.description);
    setEditTargetDate(goal.targetDate);
    setEditProgress(normalizeProgress(goal.progress));
  }

  function handleSaveEdit(event, id) {
    event.preventDefault();

    if (
      !editTitle.trim() ||
      !editDescription.trim() ||
      !editTargetDate
    ) {
      return;
    }

    const validProgress = normalizeProgress(editProgress);

    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              title: editTitle.trim(),
              description: editDescription.trim(),
              targetDate: editTargetDate,
              progress: validProgress,
              completed: validProgress === 100,
            }
          : goal
      )
    );

    handleCancelEdit();
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditTargetDate("");
    setEditProgress(0);
  }

  function handleCancelAdd() {
    setTitle("");
    setDescription("");
    setTargetDate("");
    setProgress(0);
    setShowForm(false);
  }

  function formatDate(dateString) {
    if (!dateString) {
      return "Not set";
    }

    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const completedCount = goals.filter(
    (goal) => goal.completed
  ).length;

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1>Goals</h1>
          <p>
            Set meaningful goals, track your progress, and
            celebrate your learning milestones.
          </p>
        </div>

        {!showForm && (
          <button
            className={styles.primaryButton}
            type="button"
            onClick={() => setShowForm(true)}
          >
            + Add Goal
          </button>
        )}
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Your Goals</h2>

          <span className={styles.goalCount}>
            {completedCount} of {goals.length} completed
          </span>
        </div>

        {showForm && (
          <section className={styles.formCard}>
            <h2 className={styles.formTitle}>
              Add New Goal
            </h2>

            <form
              className={styles.form}
              onSubmit={handleAddGoal}
            >
              <div className={styles.field}>
                <label
                  className={styles.label}
                  htmlFor="goal-title"
                >
                  Goal Title
                </label>

                <input
                  className={styles.input}
                  id="goal-title"
                  type="text"
                  placeholder="e.g. Learn React"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  maxLength={150}
                  required
                />
              </div>

              <div className={styles.field}>
                <label
                  className={styles.label}
                  htmlFor="goal-description"
                >
                  Description
                </label>

                <textarea
                  className={styles.textarea}
                  id="goal-description"
                  placeholder="Describe your goal..."
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  rows={3}
                  required
                />
              </div>

              <div className={styles.field}>
                <label
                  className={styles.label}
                  htmlFor="goal-date"
                >
                  Target Date
                </label>

                <input
                  className={styles.input}
                  id="goal-date"
                  type="date"
                  value={targetDate}
                  onChange={(event) =>
                    setTargetDate(event.target.value)
                  }
                  required
                />
              </div>

              <div className={styles.field}>
                <label
                  className={styles.label}
                  htmlFor="goal-progress"
                >
                  Progress: {progress}%
                </label>

                <input
                  className={styles.range}
                  id="goal-progress"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={progress}
                  onChange={(event) =>
                    setProgress(
                      normalizeProgress(event.target.value)
                    )
                  }
                />
              </div>

              <div className={styles.formActions}>
                <button
                  className={styles.secondaryButton}
                  type="button"
                  onClick={handleCancelAdd}
                >
                  Cancel
                </button>

                <button
                  className={styles.primaryButton}
                  type="submit"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </section>
        )}

        {goals.length === 0 ? (
          <div className={styles.empty}>
            <h3>No goals yet</h3>
            <p>
              Create your first goal and start tracking your
              progress.
            </p>

            {!showForm && (
              <button
                className={styles.primaryButton}
                type="button"
                onClick={() => setShowForm(true)}
              >
                Create Your First Goal
              </button>
            )}
          </div>
        ) : (
          <div className={styles.goalGrid}>
            {goals.map((goal) => {
              const goalProgress = normalizeProgress(
                goal.progress
              );

              return (
                <article
                  className={styles.goalCard}
                  key={goal.id}
                >
                  {editingId === goal.id ? (
                    <form
                      className={styles.form}
                      onSubmit={(event) =>
                        handleSaveEdit(event, goal.id)
                      }
                    >
                      <div className={styles.field}>
                        <label
                          className={styles.label}
                          htmlFor={`edit-title-${goal.id}`}
                        >
                          Goal Title
                        </label>

                        <input
                          className={styles.input}
                          id={`edit-title-${goal.id}`}
                          type="text"
                          value={editTitle}
                          onChange={(event) =>
                            setEditTitle(event.target.value)
                          }
                          maxLength={150}
                          required
                        />
                      </div>

                      <div className={styles.field}>
                        <label
                          className={styles.label}
                          htmlFor={`edit-description-${goal.id}`}
                        >
                          Description
                        </label>

                        <textarea
                          className={styles.textarea}
                          id={`edit-description-${goal.id}`}
                          value={editDescription}
                          onChange={(event) =>
                            setEditDescription(
                              event.target.value
                            )
                          }
                          rows={3}
                          required
                        />
                      </div>

                      <div className={styles.field}>
                        <label
                          className={styles.label}
                          htmlFor={`edit-date-${goal.id}`}
                        >
                          Target Date
                        </label>

                        <input
                          className={styles.input}
                          id={`edit-date-${goal.id}`}
                          type="date"
                          value={editTargetDate}
                          onChange={(event) =>
                            setEditTargetDate(
                              event.target.value
                            )
                          }
                          required
                        />
                      </div>

                      <div className={styles.field}>
                        <label
                          className={styles.label}
                          htmlFor={`edit-progress-${goal.id}`}
                        >
                          Progress: {editProgress}%
                        </label>

                        <input
                          className={styles.range}
                          id={`edit-progress-${goal.id}`}
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          value={editProgress}
                          onChange={(event) =>
                            setEditProgress(
                              normalizeProgress(
                                event.target.value
                              )
                            )
                          }
                        />
                      </div>

                      <div className={styles.goalActions}>
                        <button
                          className={styles.primaryButton}
                          type="submit"
                        >
                          Save Changes
                        </button>

                        <button
                          className={styles.secondaryButton}
                          type="button"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className={styles.goalHeader}>
                        <h3 className={styles.goalTitle}>
                          {goal.title}
                        </h3>

                        <span
                          className={`${styles.status} ${
                            goal.completed
                              ? styles.statusCompleted
                              : styles.statusActive
                          }`}
                        >
                          {goal.completed
                            ? "Completed"
                            : "In Progress"}
                        </span>
                      </div>

                      <p className={styles.goalDescription}>
                        {goal.description}
                      </p>

                      <div className={styles.goalMeta}>
                        <span>
                          Target: {formatDate(goal.targetDate)}
                        </span>
                      </div>

                      <div className={styles.progressHeader}>
                        <span>Progress</span>

                        <span className={styles.progressValue}>
                          {goalProgress}%
                        </span>
                      </div>

                      <div
                        className={styles.progressTrack}
                        role="progressbar"
                        aria-label={`${goal.title} progress`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={goalProgress}
                      >
                        <div
                          className={styles.progressFill}
                          style={{
                            width: `${goalProgress}%`,
                          }}
                        />
                      </div>

                      <div className={styles.goalActions}>
                        <button
                          className={styles.secondaryButton}
                          type="button"
                          onClick={() => handleEdit(goal)}
                        >
                          Edit
                        </button>

                        <button
                          className={styles.deleteButton}
                          type="button"
                          onClick={() =>
                            handleDeleteGoal(goal.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Goal"
        message="Are you sure you want to delete this goal?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default Goals;
