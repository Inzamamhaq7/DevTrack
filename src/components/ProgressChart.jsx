import styles from "./ProgressChart.module.css";

function ProgressChart({
  completed,
  pending,
  completedLabel = "Completed",
  pendingLabel = "Pending",
}) {
  const total = completed + pending;

  const completedPercentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const completedOffset =
    circumference -
    (completedPercentage / 100) * circumference;

  return (
    <div className={styles.chart}>
      {/* Circular progress chart */}
      <div className={styles.circle}>
        <svg
          viewBox="0 0 180 180"
          className={styles.svg}
          role="img"
          aria-label={`${completedPercentage}% of tasks completed`}
        >
          {/* Background ring */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#dedaf2"
            strokeWidth="18"
          />

          {/* Completed ring */}
          {completedPercentage > 0 && (
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="#7462e8"
              strokeWidth="18"
              strokeLinecap={
                completedPercentage === 100
                  ? "butt"
                  : "round"
              }
              strokeDasharray={circumference}
              strokeDashoffset={completedOffset}
              transform="rotate(-90 90 90)"
              style={{
                transition: "stroke-dashoffset 500ms ease",
              }}
            />
          )}
        </svg>

        <div className={styles.center}>
          <strong>{completedPercentage}%</strong>
          <span>{completedLabel}</span>
        </div>
      </div>

      {/* Chart legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span
            className={`${styles.legendDot} ${styles.completedDot}`}
            aria-hidden="true"
          />

          <div className={styles.legendInfo}>
            <strong>{completed}</strong>
            <span>{completedLabel}</span>
          </div>
        </div>

        <div className={styles.legendItem}>
          <span
            className={`${styles.legendDot} ${styles.pendingDot}`}
            aria-hidden="true"
          />

          <div className={styles.legendInfo}>
            <strong>{pending}</strong>
            <span>{pendingLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressChart;