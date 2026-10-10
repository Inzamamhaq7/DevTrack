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
      : Math.round(
          (completed / total) * 100,
        );

  const radius = 70;

  const circumference =
    2 * Math.PI * radius;

  const completedOffset =
    circumference -
    (completedPercentage / 100) *
      circumference;

  return (
    <div className={styles.chart}>

      {/* =========================
          CHART
      ========================= */}

      <div className={styles.circle}>

        <svg
          viewBox="0 0 180 180"
          className={styles.svg}
        >
          {/* Background */}

          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="18"
          />

          {/* Completed */}

          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#111827"
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={
              completedOffset
            }
            transform="rotate(-90 90 90)"
          />
        </svg>

        <div className={styles.center}>
          <strong>
            {completedPercentage}%
          </strong>

          <span>
            {completedLabel}
          </span>
        </div>

      </div>


      {/* =========================
          LEGEND
      ========================= */}

      <div className={styles.legend}>

        <div className={styles.legendItem}>
          <span
            className={`${styles.legendDot} ${styles.completedDot}`}
          />

          <div className={styles.legendInfo}>
            <strong>
              {completed}
            </strong>

            <span>
              {completedLabel}
            </span>
          </div>
        </div>


        <div className={styles.legendItem}>
          <span
            className={`${styles.legendDot} ${styles.pendingDot}`}
          />

          <div className={styles.legendInfo}>
            <strong>
              {pending}
            </strong>

            <span>
              {pendingLabel}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default ProgressChart;