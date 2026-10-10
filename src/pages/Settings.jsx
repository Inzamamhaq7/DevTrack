
import { useState } from "react";

import useUser from "../hooks/useUser";
import useLocalStorage from "../hooks/useLocalStorage";
import useProjects from "../hooks/useProjects";

import ConfirmDialog from "../components/ConfirmDialog";
import styles from "./Settings.module.css";

function Settings() {
  const { user, setUser } = useUser();
  const { setProjects } = useProjects();

  const [, setTasks] = useLocalStorage("tasks", []);
  const [, setTopics] = useLocalStorage("learningTopics", []);
  const [, setNotes] = useLocalStorage("notes", []);
  const [, setGoals] = useLocalStorage("goals", []);

  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [saved, setSaved] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  function handleSave(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedRole = role.trim();

    if (!trimmedName || !trimmedRole) {
      return;
    }

    setUser({
      name: trimmedName,
      role: trimmedRole,
    });

    setSaved(true);
  }

  function handleCancel() {
    setName(user.name);
    setRole(user.role);
    setSaved(false);
  }

  function handleNameChange(event) {
    setName(event.target.value);
    setSaved(false);
  }

  function handleRoleChange(event) {
    setRole(event.target.value);
    setSaved(false);
  }

  function askConfirmation(type) {
    setConfirmation(type);
  }

  function handleConfirm() {
    if (confirmation === "tasks") {
      setTasks([]);
    }

    if (confirmation === "topics") {
      setTopics([]);
    }

    if (confirmation === "notes") {
      setNotes([]);
    }

    if (confirmation === "goals") {
      setGoals([]);
    }

    if (confirmation === "projects") {
      setProjects([]);
    }

    if (confirmation === "reset") {
      setTasks([]);
      setTopics([]);
      setNotes([]);
      setGoals([]);
      setProjects([]);

      const defaultUser = {
        name: "Inzamam",
        role: "Developer",
      };

      setUser(defaultUser);
      setName(defaultUser.name);
      setRole(defaultUser.role);
      setSaved(false);
    }

    setConfirmation(null);
  }

  function handleCancelConfirmation() {
    setConfirmation(null);
  }

  function getConfirmationDetails() {
    const details = {
      tasks: {
        title: "Clear Tasks",
        message:
          "Are you sure you want to clear all tasks? This action cannot be undone.",
      },
      topics: {
        title: "Clear Learning",
        message:
          "Are you sure you want to clear all learning topics? This action cannot be undone.",
      },
      notes: {
        title: "Clear Notes",
        message:
          "Are you sure you want to clear all notes? This action cannot be undone.",
      },
      goals: {
        title: "Clear Goals",
        message:
          "Are you sure you want to clear all goals? This action cannot be undone.",
      },
      projects: {
        title: "Clear Projects",
        message:
          "Are you sure you want to clear all projects? This action cannot be undone.",
      },
      reset: {
        title: "Reset DevTrack",
        message:
          "Are you sure you want to reset DevTrack? This will delete all tasks, learning topics, notes, goals, and projects, and reset your profile. This action cannot be undone.",
      },
    };

    return details[confirmation] || {
      title: "",
      message: "",
    };
  }

  const confirmationDetails = getConfirmationDetails();

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>Settings</h1>
        <p>
          Manage your DevTrack profile and application
          data.
        </p>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Profile</h2>
          <p>
            Update the name and role displayed in your
            developer dashboard.
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSave}
        >
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="user-name"
            >
              Name
            </label>

            <input
              className={styles.input}
              id="user-name"
              type="text"
              value={name}
              onChange={handleNameChange}
              maxLength={100}
              required
            />
          </div>

          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="user-role"
            >
              Role
            </label>

            <input
              className={styles.input}
              id="user-role"
              type="text"
              value={role}
              onChange={handleRoleChange}
              maxLength={100}
              required
            />
          </div>

          <div className={styles.actions}>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              className={styles.primaryButton}
              type="submit"
            >
              Save Changes
            </button>
          </div>

          {saved && (
            <p
              className={styles.success}
              role="status"
            >
              Profile updated successfully.
            </p>
          )}
        </form>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Data Management</h2>
          <p>
            Clear individual sections of your DevTrack
            data. Each action requires confirmation.
          </p>
        </div>

        <div className={styles.dataList}>
          <div className={styles.dataRow}>
            <div className={styles.dataInfo}>
              <h3>Tasks</h3>
              <p>Remove all saved tasks.</p>
            </div>

            <button
              className={styles.dangerButton}
              type="button"
              onClick={() => askConfirmation("tasks")}
            >
              Clear Tasks
            </button>
          </div>

          <div className={styles.dataRow}>
            <div className={styles.dataInfo}>
              <h3>Learning Topics</h3>
              <p>Remove all learning topics and progress.</p>
            </div>

            <button
              className={styles.dangerButton}
              type="button"
              onClick={() => askConfirmation("topics")}
            >
              Clear Learning
            </button>
          </div>

          <div className={styles.dataRow}>
            <div className={styles.dataInfo}>
              <h3>Notes</h3>
              <p>Remove all saved notes.</p>
            </div>

            <button
              className={styles.dangerButton}
              type="button"
              onClick={() => askConfirmation("notes")}
            >
              Clear Notes
            </button>
          </div>

          <div className={styles.dataRow}>
            <div className={styles.dataInfo}>
              <h3>Goals</h3>
              <p>Remove all goals and their progress.</p>
            </div>

            <button
              className={styles.dangerButton}
              type="button"
              onClick={() => askConfirmation("goals")}
            >
              Clear Goals
            </button>
          </div>

          <div className={styles.dataRow}>
            <div className={styles.dataInfo}>
              <h3>Projects</h3>
              <p>Remove all saved projects.</p>
            </div>

            <button
              className={styles.dangerButton}
              type="button"
              onClick={() => askConfirmation("projects")}
            >
              Clear Projects
            </button>
          </div>
        </div>
      </section>

      <section className={styles.dangerZone}>
        <div>
          <h2>Danger Zone</h2>
          <p>
            Resetting DevTrack permanently clears all
            locally stored application data and restores
            your default profile.
          </p>
        </div>

        <button
          className={styles.resetButton}
          type="button"
          onClick={() => askConfirmation("reset")}
        >
          Reset DevTrack
        </button>
      </section>

      <ConfirmDialog
        isOpen={confirmation !== null}
        title={confirmationDetails.title}
        message={confirmationDetails.message}
        onConfirm={handleConfirm}
        onCancel={handleCancelConfirmation}
      />
    </div>
  );
}

export default Settings;
