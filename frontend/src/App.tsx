import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/me/projects" element={<Home />} />
        <Route path="/projects/:projectId" element={<h1>Project X</h1>} />
        <Route path="/me/tasks" element={<h1>Tasks</h1>} />
        <Route path="/me/comments" element={<h1>Task Comments</h1>} />
        <Route path="/settings" element={<h1>Settings</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
