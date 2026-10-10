
import { Link, NavLink } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import styles from "./Projects.module.css";

function Projects() {
  const { projects } = useProjects();

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1>Projects</h1>
          <p>
            Organize your development projects, track your ideas, and turn
            them into working applications.
          </p>
        </div>

        <div className={styles.headerActions}>
          <Link to="/projects/new" className={styles.primaryButton}>
            + New Project
          </Link>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Your Projects</h2>

          <span className={styles.projectCount}>
            {projects.length} {projects.length === 1 ? "Project" : "Projects"}
          </span>
        </div>

        {projects.length === 0 ? (
          <div className={styles.empty}>
            <h3>No projects yet</h3>
            <p>
              Start building your portfolio by creating your first development
              project.
            </p>

            <Link to="/projects/new" className={styles.primaryButton}>
              Create Your First Project
            </Link>
          </div>
        ) : (
          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <article className={styles.projectCard} key={project.id}>
                <h3 className={styles.projectTitle}>{project.name}</h3>

                <p className={styles.projectDescription}>
                  {project.description || "No description added yet."}
                </p>

                <div className={styles.cardActions}>
                  <NavLink
                    to={`/projects/${project.id}`}
                    className={styles.primaryButton}
                  >
                    View Details
                  </NavLink>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Projects;
