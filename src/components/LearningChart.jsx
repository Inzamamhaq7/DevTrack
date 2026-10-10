import styles from "./LearningChart.module.css";

function LearningChart({ topics }) {
  if (topics.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No learning topics available yet.</p>

        <span>
          Add topics from the Learning page to see your progress here.
        </span>
      </div>
    );
  }

  return (
    <div className={styles.chart}>
      {topics.map((topic) => {
        const progress = Math.min(100, Math.max(0, Number(topic.progress)));

        return (
          <div className={styles.topic} key={topic.id}>
            <div className={styles.topicHeader}>
              <span>{topic.name}</span>

              <strong>{progress}%</strong>
            </div>

            <div className={styles.bar}>
              <div
                className={styles.fill}
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

export default LearningChart;
