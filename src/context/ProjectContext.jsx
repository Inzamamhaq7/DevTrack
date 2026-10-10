
import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultProjects = [
  {
    id: 1,
    name: "DevTrack",
    description: "Developer learning and productivity dashboard",
  },
  {
    id: 2,
    name: "Movie Recommendation System",
    description: "A movie recommendation application",
  },
  {
    id: 3,
    name: "IP-SAKTI Sahayak",
    description:
      "RAG-based AI assistant for intellectual property guidance",
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
