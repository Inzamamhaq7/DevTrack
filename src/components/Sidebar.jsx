
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const navigationItems = [
  {
    label: "Dashboard",
    icon: "🏠",
    path: "/",
    end: true,
  },
  {
    label: "Learning",
    icon: "📚",
    path: "/learning",
  },
  {
    label: "Tasks",
    icon: "✅",
    path: "/tasks",
  },
  {
    label: "Projects",
    icon: "🚀",
    path: "/projects",
  },
  {
    label: "Notes",
    icon: "📝",
    path: "/notes",
  },
  {
    label: "Goals",
    icon: "🎯",
    path: "/goals",
  },
  {
    label: "Analytics",
    icon: "📊",
    path: "/analytics",
  },
  {
    label: "Settings",
    icon: "⚙️",
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarTitle}>
          <span>Workspace</span>
        </div>

        <nav aria-label="Main navigation">
          <ul className={styles.navList}>
            {navigationItems.map((item) => (
              <li
                key={item.label}
                className={styles.navItem}
              >
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      styles.navLink,
                      isActive ? styles.active : "",
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                >
                  <span
                    className={styles.navIcon}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>

                  <span className={styles.navLabel}>
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
