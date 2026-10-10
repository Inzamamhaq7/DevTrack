import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import styles from "./AddProject.module.css";

function AddProject() {
  const navigate = useNavigate();
  const { projects, setProjects } = useProjects();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      return;
    }

    const newProject = {
      id: Date.now(),
      name: trimmedName,
      description: trimmedDescription,
    };

    setProjects((previousProjects) => [
      ...previousProjects,
      newProject,
    ]);

    navigate(`/projects/${newProject.id}`);
  }

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>Create a Project</h1>

        <p>
          Give your next idea a name and describe what
          you want to build.
        </p>
      </header>

      <section className={styles.formCard}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="project-name"
            >
              Project Name *
            </label>

            <input
              className={styles.input}
              id="project-name"
              type="text"
              placeholder="e.g. Movie Recommendation System"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
              maxLength={100}
            />

            <p className={styles.hint}>
              Choose a short, descriptive name.
            </p>
          </div>

          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="project-description"
            >
              Description
            </label>

            <textarea
              className={styles.textarea}
              id="project-description"
              placeholder="Describe your project, its goals, and the technologies you plan to use..."
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              rows={5}
              maxLength={1000}
            />

            <p className={styles.hint}>
              Explain what you're building and why.
            </p>
          </div>

          <div className={styles.actions}>
            <Link
              to="/projects"
              className={styles.cancelButton}
            >
              Cancel
            </Link>

            <button
              className={styles.submitButton}
              type="submit"
            >
              Create Project
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddProject;