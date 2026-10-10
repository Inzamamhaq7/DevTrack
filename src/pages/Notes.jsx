
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import ConfirmDialog from "../components/ConfirmDialog";
import styles from "./Notes.module.css";

function Notes() {
  const [notes, setNotes] = useLocalStorage("notes", []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  function resetForm() {
    setTitle("");
    setContent("");
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return;
    }

    if (editingId !== null) {
      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: trimmedTitle,
                content: trimmedContent,
              }
            : note,
        ),
      );
    } else {
      const newNote = {
        id: Date.now(),
        title: trimmedTitle,
        content: trimmedContent,
        createdAt: new Date().toISOString(),
      };

      setNotes((previousNotes) => [
        ...previousNotes,
        newNote,
      ]);
    }

    resetForm();
  }

  function handleEdit(note) {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDelete() {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== deleteId),
    );

    if (editingId === deleteId) {
      resetForm();
    }

    setDeleteId(null);
  }

  function formatDate(dateValue) {
    if (!dateValue) {
      return "Date unavailable";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1>Notes</h1>
          <p>
            Capture ideas, save important information,
            and keep your development knowledge organized.
          </p>
        </div>
      </header>

      <section className={styles.formCard}>
        <div className={styles.sectionHeader}>
          <h2>
            {editingId !== null ? "Edit Note" : "Create a Note"}
          </h2>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="note-title"
            >
              Note Title
            </label>

            <input
              className={styles.input}
              id="note-title"
              type="text"
              placeholder="e.g. React hooks explained"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              maxLength={150}
              required
            />
          </div>

          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="note-content"
            >
              Note Content
            </label>

            <textarea
              className={styles.textarea}
              id="note-content"
              placeholder="Write your notes here..."
              value={content}
              onChange={(event) =>
                setContent(event.target.value)
              }
              rows={5}
              required
            />
          </div>

          <div className={styles.formActions}>
            {editingId !== null && (
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}

            <button
              className={styles.primaryButton}
              type="submit"
            >
              {editingId !== null ? "Save Changes" : "+ Add Note"}
            </button>
          </div>
        </form>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Your Notes</h2>

          <span className={styles.noteCount}>
            {notes.length} {notes.length === 1 ? "Note" : "Notes"}
          </span>
        </div>

        {notes.length === 0 ? (
          <div className={styles.empty}>
            <h3>No notes yet</h3>
            <p>
              Add your first note above to start building
              your personal knowledge library.
            </p>
          </div>
        ) : (
          <div className={styles.noteGrid}>
            {[...notes].reverse().map((note) => (
              <article
                className={styles.noteCard}
                key={note.id}
              >
                <h3 className={styles.noteTitle}>
                  {note.title}
                </h3>

                <p className={styles.noteContent}>
                  {note.content}
                </p>

                <div className={styles.noteDate}>
                  Created {formatDate(note.createdAt)}
                </div>

                <div className={styles.noteActions}>
                  <button
                    className={styles.secondaryButton}
                    type="button"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </button>

                  <button
                    className={styles.deleteButton}
                    type="button"
                    onClick={() => setDeleteId(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

export default Notes;
