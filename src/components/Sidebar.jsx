
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  Rocket,
  NotebookPen,
  Target,
  ChartNoAxesColumn,
  Settings,
  X,
  Menu,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/", end: true },
  { label: "Learning", icon: BookOpen, path: "/learning" },
  { label: "Tasks", icon: CheckSquare, path: "/tasks" },
  { label: "Projects", icon: Rocket, path: "/projects" },
  { label: "Notes", icon: NotebookPen, path: "/notes" },
  { label: "Goals", icon: Target, path: "/goals" },
  {
    label: "Analytics",
    icon: ChartNoAxesColumn,
    path: "/analytics",
  },
  { label: "Settings", icon: Settings, path: "/settings" },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        className={styles.menuButton}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="devtrack-sidebar"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <button
          type="button"
          className={styles.backdrop}
          onClick={closeSidebar}
          aria-label="Close navigation menu"
        />
      )}

      <aside
        id="devtrack-sidebar"
        className={`${styles.sidebar} ${
          isOpen ? styles.sidebarOpen : ""
        }`}
      >
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarTitle}>
            <span>Workspace</span>
          </div>

          <nav aria-label="Main navigation">
            <ul className={styles.navList}>
              {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label} className={styles.navItem}>
                    <NavLink
                      to={item.path}
                      end={item.end}
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        [
                          styles.navLink,
                          isActive ? styles.active : "",
                        ]
                          .filter(Boolean)
                          .join(" ")
                      }
                    >
                      <Icon
                        className={styles.navIcon}
                        size={20}
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                      <span className={styles.navLabel}>
                        {item.label}
                      </span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
