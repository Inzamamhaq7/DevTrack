import { AudioLines } from "lucide-react";
import useUser from "../hooks/useUser";
import styles from "./Header.module.css";

function Header() {
  const { user } = useUser();

  const userName = user?.name?.trim() || "Developer";
  const userRole = user?.role?.trim() || "Developer";
  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h1>
          DevTrack
          <AudioLines
            size={23}
            strokeWidth={2}
            aria-label="DevTrack"
          />
        </h1>
        <span>Developer Dashboard</span>
      </div>

      <div className={styles.user}>
        <div
          className={styles.avatar}
          aria-label={`${userName}'s avatar`}
        >
          {avatarLetter}
        </div>

        <div className={styles.info}>
          <strong>{userName}</strong>
          <span>{userRole}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
