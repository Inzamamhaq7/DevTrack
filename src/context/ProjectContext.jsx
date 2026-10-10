
import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultProjects = [
  {
    id: 1,
    name: "DevTrack",
    description:
      "A developer learning and productivity dashboard built with React, featuring task tracking, learning progress, goals, and analytics.",
  },
  {
    id: 2,
    name: "IP-SAKTI Sahayak",
    description:
      "A multilingual, RAG-based AI assistant designed to provide intellectual property and regulatory guidance for Ayurveda.",
  },
  {
    id: 3,
    name: "Movie Recommendation System",
    description:
      "A personalized movie recommendation application using a Python recommendation engine, Flask API, React frontend, and Supabase.",
  },
  {
    id: 4,
    name: "Lost & Found Portal",
    description:
      "A web application for reporting lost and found items, browsing listings, and managing posts with authentication and database integration.",
  },
  {
    id: 5,
    name: "AgriAid",
    description:
      "An agriculture assistance platform concept designed to help users access useful agricultural information and resources.",
  },
];

const ProjectContext = createContext(null);

function ProjectProvider({ children }) {
  const [projects, setProjects] = useLocalStorage(
    "projects",
    defaultProjects
  );

  const addProject = (project) => {
    setProjects((previousProjects) => [
      ...previousProjects,
      {
        ...project,
        id: project.id ?? Date.now(),
      },
    ]);
  };

  const updateProject = (projectId, updates) => {
    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        String(project.id) === String(projectId)
          ? { ...project, ...updates }
          : project
      )
    );
  };

  const deleteProject = (projectId) => {
    setProjects((previousProjects) =>
      previousProjects.filter(
        (project) => String(project.id) !== String(projectId)
      )
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export { ProjectProvider, ProjectContext };
