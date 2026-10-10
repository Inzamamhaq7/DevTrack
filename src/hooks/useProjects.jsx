import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";

function useProjects() {
  return useContext(ProjectContext);
}

export default useProjects;