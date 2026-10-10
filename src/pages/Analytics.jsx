
import useLocalStorage from "../hooks/useLocalStorage";
import useProjects from "../hooks/useProjects";

import ProgressChart from "../components/ProgressChart";
import LearningChart from "../components/LearningChart";

import {
  defaultTasks,
  defaultTopics,
  defaultGoals,
} from "../data/defaults";

import styles from "./Analytics.module.css";

function normalizeProgress(value) {
  const progress = Number(value);

  if (!Number.isFinite(progress)) {
    return 0;
  }

  return Math.min(100, Math.max(0, progress));
}

function Analytics() {
  const [tasks] = useLocalStorage("tasks", defaultTasks);
  const [topics] = useLocalStorage(
    "learningTopics",
    defaultTopics
  );
  const [goals] = useLocalStorage("goals", defaultGoals);

  const { projects } = useProjects();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const taskCompletionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const totalTopics = topics.length;

  const totalProgress = topics.reduce(
    (total, topic) =>
      total + normalizeProgress(topic.progress),
    0
  );

  const learningAverage =
    totalTopics === 0
      ? 0
      : Math.round(totalProgress / totalTopics);

  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (goal) => goal.completed
  ).length;

  const activeGoals = totalGoals - completedGoals;

  return (
    <div className={styles.analytics}>
      <header className={styles.pageHeader}>
        <h1>Analytics</h1>

        <p>
          Track your overall development progress and
          performance.
        </p>
      </header>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <span>Total Tasks</span>
          <strong>{totalTasks}</strong>
        </div>

        <div className={styles.summaryCard}>
          <span>Completed Tasks</span>
          <strong>{completedTasks}</strong>
        </div>

        <div className={styles.summaryCard}>
          <span>Projects</span>
          <strong>{projects.length}</strong>
        </div>

        <div className={styles.summaryCard}>
          <span>Learning Average</span>
          <strong>{learningAverage}%</strong>
        </div>
      </div>

      <div className={styles.analyticsGrid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Task Completion
          </h2>

          <ProgressChart
            completed={completedTasks}
            pending={pendingTasks}
            completedLabel="Completed"
            pendingLabel="Pending"
          />

          <div className={styles.progressHeader}>
            <span>Completion Rate</span>
            <span>{taskCompletionRate}%</span>
          </div>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${taskCompletionRate}%`,
              }}
            />
          </div>

          <p className={styles.description}>
            {completedTasks} of {totalTasks} tasks completed.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Learning Progress
          </h2>

          <div className={styles.learningStats}>
            <strong className={styles.learningPercentage}>
              {learningAverage}%
            </strong>

            <div className={styles.learningInfo}>
              <strong>Average Progress</strong>
              <span>
                Across {totalTopics} learning topics
              </span>
            </div>
          </div>

          <LearningChart topics={topics} />
        </section>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Goals Overview
        </h2>

        <div className={styles.goalGrid}>
          <div className={styles.goalCard}>
            <strong>{totalGoals}</strong>
            <span>Total Goals</span>
          </div>

          <div className={styles.goalCard}>
            <strong>{completedGoals}</strong>
            <span>Completed</span>
          </div>

          <div className={styles.goalCard}>
            <strong>{activeGoals}</strong>
            <span>In Progress</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Analytics;
