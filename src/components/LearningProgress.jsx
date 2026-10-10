import styles from "./LearningProgress.module.css";

function LearningProgress({ topics }) {
  if (topics.length === 0) {
    return (
      <div className={styles.empty}>
        No learning topics added yet.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {topics.map((topic) => {
        const progress = Math.min(
          100,
          Math.max(
            0,
            Number(topic.progress),
          ),
        );

        return (
          <div
            className={styles.topic}
            key={topic.id}
          >
            <div
              className={
                styles.topicHeader
              }
            >
              <p
                className={
                  styles.topicName
                }
              >
                {topic.name}
              </p>

              <p
                className={
                  styles.topicProgress
                }
              >
                {progress}%
              </p>
            </div>

            <div
              className={
                styles.progressBar
              }
            >
              <div
                className={
                  styles.progressFill
                }
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LearningProgress;