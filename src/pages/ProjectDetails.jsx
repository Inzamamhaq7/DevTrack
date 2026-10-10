
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import ConfirmDialog from "../components/ConfirmDialog";
import styles from "./ProjectDetails.module.css";

function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, setProjects } = useProjects();

  const project = projects.find(
    (item) => String(item.id) === String(projectId)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project?.name ?? "");
  const [description, setDescription] = useState(
    project?.description ?? ""
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  if (!project) {
    return (
      <div className={styles.page}>
        <section className={styles.empty}>
          <h1>Project Not Found</h1>
          <p>
            This project may have been deleted or the URL may be incorrect.
          </p>
          <Link to="/projects" className={styles.primaryButton}>
            Back to Projects
          </Link>
        </section>
      </div>
    );
  }

  function handleEdit() {
    setName(project.name);
    setDescription(project.description ?? "");
    setError("");
    setIsEditing(true);
  }

  function handleCancel() {
    setName(project.name);
    setDescription(project.description ?? "");
    setError("");
    setIsEditing(false);
  }

  function handleSave(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      setError("Project name is required.");
      return;
    }

    setProjects((previousProjects) =>
      previousProjects.map((item) =>
        String(item.id) === String(projectId)
          ? {
              ...item,
              name: trimmedName,
              description: trimmedDescription,
            }
          : item
      )
    );

    setError("");
    setIsEditing(false);
  }

  function handleDelete() {
    setProjects((previousProjects) =>
      previousProjects.filter(
        (item) => String(item.id) !== String(projectId)
      )
    );

    setShowConfirm(false);
    navigate("/projects");
  }

  return (
    <div className={styles.page}>
      <Link to="/projects" className={styles.backLink}>
        ← Back to Projects
      </Link>

      <section className={styles.projectCard}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <p className={styles.subtitle}>Project Details</p>
            <h1 className={styles.title}>
              {isEditing ? "Edit Project" : project.name}
            </h1>
          </div>

          {!isEditing && (
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleEdit}
              >
                Edit Project
              </button>

              <button
                type="button"
                className={styles.dangerButton}
                onClick={() => setShowConfirm(true)}
              >
                Delete Project
              </button>
            </div>
          )}
        </header>

        {isEditing ? (
          <form className={styles.form} onSubmit={handleSave}>
            <div className={styles.section}>
              <label htmlFor="projectName" className={styles.sectionTitle}>
                Project Name
              </label>

              <input
                id="projectName"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter project name"
                required
                maxLength={100}
                autoFocus
              />
            </div>

            <div className={styles.section}>
              <label
                htmlFor="projectDescription"
                className={styles.sectionTitle}
              >
                Description
              </label>

              <textarea
                id="projectDescription"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe your project"
                rows={5}
                maxLength={2000}
              />
            </div>

            {error && <p role="alert">{error}</p>}

            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.primaryButton}
              >
                Save Changes
              </button>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Description</h2>
              <p className={styles.description}>
                {project.description || "No description added yet."}
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Project Information</h2>
              <p className={styles.description}>
                <strong>Project ID:</strong> {project.id}
              </p>
            </div>
          </>
        )}
      </section>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Project"
        message={`Are you sure you want to delete "${project.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}

export default ProjectDetails;
