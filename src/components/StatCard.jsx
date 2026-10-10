import styles from "./StatCard.module.css";

function StatCard({
  title,
  value,
  description,
  icon,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.icon}>
          {icon}
        </div>

        <span className={styles.title}>
          {title}
        </span>
      </div>

      <strong className={styles.value}>
        {value}
      </strong>

      {description && (
        <span className={styles.description}>
          {description}
        </span>
      )}
    </div>
  );
}

export default StatCard;