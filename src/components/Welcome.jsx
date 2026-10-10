
import styles from "./Welcome.module.css";

function Welcome(props) {
  return (
    <div className={styles.welcome}>
      <h1 className={styles.title}>
        Welcome {props.name} 🚀
      </h1>

      <p className={styles.subtitle}>
        Build skills. Ship projects. Track progress
      </p>
    </div>
  );
}

export default Welcome;
