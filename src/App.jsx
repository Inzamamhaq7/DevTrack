
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Learning from "./pages/Learning";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import AddProject from "./pages/AddProject";
import Notes from "./pages/Notes";
import Goals from "./pages/Goals";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import { UserProvider } from "./context/UserContext";
import { ProjectProvider } from "./context/ProjectContext";

function NotFound() {
  return (
    <section
      style={{
        maxWidth: "600px",
        margin: "60px auto",
        textAlign: "center",
      }}
    >
      <h1>404 — Page Not Found</h1>
      <p>
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/">Return to Dashboard</Link>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProjectProvider>
          <Layout>
            <Header />

            <div className="app-body">
              <Sidebar />

              <main
                className="main-content"
                id="main-content"
                aria-label="Main content"
              >
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/learning" element={<Learning />} />
                  <Route path="/tasks" element={<Tasks />} />

                  {/* Keep project pages independent */}
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/new" element={<AddProject />} />
                  <Route
                    path="/projects/:projectId"
                    element={<ProjectDetails />}
                  />

                  <Route path="/notes" element={<Notes />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </Layout>
        </ProjectProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
