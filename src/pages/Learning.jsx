
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import ConfirmDialog from "../components/ConfirmDialog";
import { defaultTopics } from "../data/defaults";
import styles from "./Learning.module.css";

function normalizeProgress(value) {
  const progress = Number(value);

  if (!Number.isFinite(progress)) {
    return 0;
  }

  return Math.min(100, Math.max(0, progress));
}

function Learning() {
  const [topics, setTopics] = useLocalStorage(
    "learningTopics",
    defaultTopics
  );

  const [newTopic, setNewTopic] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editProgress, setEditProgress] = useState(0);
  const [deleteId, setDeleteId] = useState(null);

  function handleAddTopic(event) {
    event.preventDefault();

    const name = newTopic.trim();

    if (!name) {
      return;
    }

    const topic = {
      id: Date.now(),
      name,
      progress: 0,
    };

    setTopics((previousTopics) => [
      ...previousTopics,
      topic,
    ]);

    setNewTopic("");
  }

  function handleEdit(topic) {
    setEditingId(topic.id);
    setEditName(topic.name);
    setEditProgress(normalizeProgress(topic.progress));
  }

  function handleSaveEdit(event) {
    event.preventDefault();

    const name = editName.trim();

    if (!name) {
      return;
    }

    setTopics((previousTopics) =>
      previousTopics.map((topic) =>
        topic.id === editingId
          ? {
              ...topic,
              name,
              progress: normalizeProgress(editProgress),
            }
          : topic
      )
    );

    setEditingId(null);
    setEditName("");
    setEditProgress(0);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditProgress(0);
  }

  function handleCancel() {
    setDeleteId(null);
  }

  function handleDeleteTopic() {
    setTopics((previousTopics) =>
      previousTopics.filter(
        (topic) => topic.id !== deleteId
      )
    );

    setDeleteId(null);
  }

  const totalProgress = topics.reduce(
    (total, topic) =>
      total + normalizeProgress(topic.progress),
    0
  );

  const averageProgress =
    topics.length > 0
      ? Math.round(totalProgress / topics.length)
      : 0;

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>Learning</h1>

        <p>
          Track your learning topics and monitor your
          progress as you build your developer skills.
        </p>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Your Learning Journey</h2>

          <span className={styles.progressValue}>
            {averageProgress}% average
          </span>
        </div>

        <form
          className={styles.addForm}
          onSubmit={handleAddTopic}
        >
          <input
            type="text"
            placeholder="Enter a new learning topic"
            aria-label="New learning topic"
            value={newTopic}
            onChange={(event) =>
              setNewTopic(event.target.value)
            }
            maxLength={100}
            required
          />

          <button type="submit">
            + Add Topic
          </button>
        </form>

        {topics.length === 0 ? (
          <div className={styles.empty}>
            <p>No learning topics yet.</p>

            <p>
              Add your first topic above to start
              tracking your progress.
            </p>
          </div>
        ) : (
          <div className={styles.topicGrid}>
            {topics.map((topic) => {
              const progress = normalizeProgress(
                topic.progress
              );

              return (
                <article
                  className={styles.topicCard}
                  key={topic.id}
                >
                  {editingId === topic.id ? (
                    <form
                      className={styles.editForm}
                      onSubmit={handleSaveEdit}
                    >
                      <label>
                        Topic name

                        <input
                          type="text"
                          value={editName}
                          onChange={(event) =>
                            setEditName(event.target.value)
                          }
                          maxLength={100}
                          required
                        />
                      </label>

                      <label>
                        Progress: {editProgress}%

                        <input
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
                      </label>

                      <div className={styles.cardActions}>
                        <button type="submit">
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
                      <div className={styles.topicHeader}>
                        <h3 className={styles.topicTitle}>
                          {topic.name}
                        </h3>

                        <span className={styles.progressValue}>
                          {progress}%
                        </span>
                      </div>

                      <p className={styles.topicDescription}>
                        {progress === 100
                          ? "Topic completed. Great work!"
                          : progress === 0
                            ? "Ready to get started?"
                            : "Keep learning and make progress."}
                      </p>

                      <div className={styles.progressHeader}>
                        <span>Learning progress</span>
                        <span>{progress}%</span>
                      </div>

                      <div
                        className={styles.progressTrack}
                        role="progressbar"
                        aria-label={`${topic.name} progress`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progress}
                      >
                        <div
                          className={styles.progressFill}
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>

                      <div className={styles.cardActions}>
                        <button
                          type="button"
                          onClick={() => handleEdit(topic)}
                        >
                          Edit
                        </button>

                        <button
                          className={styles.deleteButton}
                          type="button"
                          onClick={() =>
                            setDeleteId(topic.id)
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
        isOpen={deleteId !== null}
        title="Delete Learning Topic"
        message="Are you sure you want to delete this learning topic? This action cannot be undone."
        onConfirm={handleDeleteTopic}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default Learning;
