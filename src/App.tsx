import { ClerkProvider } from "@clerk/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./Layout";
import AuthPage from "./pages/AuthPage";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import NewEntry from "./pages/NewEntry";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim();

function App() {
  if (!clerkPublishableKey) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5e9da] px-6 text-[#4d3124]">
        <div className="max-w-lg rounded-[28px] border border-[#d7b18d] bg-[#fffaf3] p-8 text-center shadow-[0_25px_80px_rgba(91,54,35,0.12)]">
          <h1 className="mb-3 text-2xl font-bold">Clerk is not configured</h1>
          <p className="text-base leading-7 text-[#6d4735]">
            Add <code>VITE_CLERK_PUBLISHABLE_KEY</code> to your <code>.env</code> file to enable sign-in and sign-up.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <BrowserRouter>
        <Routes>
          <Route path="/login/*" element={<AuthPage mode="login" />} />
          <Route path="/signup/*" element={<AuthPage mode="signup" />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/journal/new" element={<NewEntry />} />
            <Route path="/history" element={<History />} />
            <Route path="/calendar" element={<Calendar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
