import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Dashboard from "./pages/Dashboard";
import NewEntry from "./pages/NewEntry";
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/journal/new" element={<NewEntry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
