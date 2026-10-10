
import useLocalStorage from "../hooks/useLocalStorage";
import useUser from "../hooks/useUser";
import useProjects from "../hooks/useProjects";

import Welcome from "../components/Welcome";
import StatCard from "../components/StatCard";
import LearningProgress from "../components/LearningProgress";
import ProgressChart from "../components/ProgressChart";

import {
  defaultTasks,
  defaultTopics,
  defaultGoals,
} from "../data/defaults";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const { user } = useUser();

  const [tasks] = useLocalStorage("tasks", defaultTasks);
  const [topics] = useLocalStorage("learningTopics", defaultTopics);
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

  const totalProgress = topics.reduce((total, topic) => {
    const progress = Number(topic.progress);

    const validProgress = Number.isFinite(progress)
      ? Math.min(100, Math.max(0, progress))
      : 0;

    return total + validProgress;
  }, 0);

  const learningAverage =
    totalTopics === 0
      ? 0
      : Math.round(totalProgress / totalTopics);

  const totalGoals = goals.length;
  const completedGoals = goals.filter(
    (goal) => goal.completed
  ).length;
  const activeGoals = totalGoals - completedGoals;

  const totalProjects = projects.length;

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <Welcome name={user.name} />
        <p>Here's an overview of your development progress.</p>
      </header>

      <div className={styles.statsGrid}>
        <StatCard
          title="Learning Topics"
          value={totalTopics}
          description="Topics you're currently learning"
          icon="📚"
        />

        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          description={`${completedTasks} tasks completed`}
          icon="✅"
        />

        <StatCard
          title="Active Projects"
          value={totalProjects}
          description="Projects in your workspace"
          icon="🚀"
        />
      </div>

      <div className={styles.overviewGrid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Task Overview
          </h2>

          <div className={styles.overviewStats}>
            <div className={styles.overviewStat}>
              <strong>{totalTasks}</strong>
              <span>Total Tasks</span>
            </div>

            <div className={styles.overviewStat}>
              <strong>{completedTasks}</strong>
              <span>Completed</span>
            </div>

            <div className={styles.overviewStat}>
              <strong>{pendingTasks}</strong>
              <span>Pending</span>
            </div>
          </div>

          <div className={styles.progressContainer}>
            <div className={styles.progressHeader}>
              <span>Completion</span>
              <span>{taskCompletionRate}%</span>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${taskCompletionRate}%` }}
              />
            </div>

            <p className={styles.progressDescription}>
              {completedTasks} of {totalTasks} tasks completed.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Goals Overview
          </h2>

          <div className={styles.overviewStats}>
            <div className={styles.overviewStat}>
              <strong>{totalGoals}</strong>
              <span>Total Goals</span>
            </div>

            <div className={styles.overviewStat}>
              <strong>{completedGoals}</strong>
              <span>Completed</span>
            </div>

            <div className={styles.overviewStat}>
              <strong>{activeGoals}</strong>
              <span>In Progress</span>
            </div>
          </div>
        </section>
      </div>

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
      </section>

      <section
        className={`${styles.section} ${styles.learningSection}`}
      >
        <h2 className={styles.sectionTitle}>
          Learning Progress
        </h2>

        <div className={styles.learningAverage}>
          <strong>{learningAverage}%</strong>
          <span>Average learning progress</span>
        </div>

        <LearningProgress topics={topics} />
      </section>

      <section
        className={`${styles.section} ${styles.projectsSection}`}
      >
        <h2 className={styles.sectionTitle}>
          Projects Overview
        </h2>

        <div className={styles.overviewStats}>
          <div className={styles.overviewStat}>
            <strong>{totalProjects}</strong>
            <span>Total Projects</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
