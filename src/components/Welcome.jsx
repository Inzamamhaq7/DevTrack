
import { BadgeCheck } from "lucide-react";
import styles from "./Welcome.module.css";

function Welcome({ name }) {
  return (
    <div className={styles.welcome}>
      <h1 className={styles.title}>
        Welcome {name} <span> </span>
        <BadgeCheck
          size={24}
          strokeWidth={2}
          color="#7967d9"
          aria-hidden="true"
        />
      </h1>

      <p className={styles.subtitle}>
        Build skills. Ship projects. Track progress.
      </p>
    </div>
  );
}

export default Welcome;



// BadgeCheck