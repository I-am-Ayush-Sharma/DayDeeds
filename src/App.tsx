import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Dashboard from "./pages/Dashboard";
import NewEntry from "./pages/NewEntry";
import Layout from "./Layout";
import Calendar from "./pages/Calendar";

import Inshights  from "./pages/Inshights";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/journal/new" element={<NewEntry />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/journal/calendar" element={<Calendar />} />
          <Route path="/Inshights" element={Inshights}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
