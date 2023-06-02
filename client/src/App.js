import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import EntryPage from "./pages/EntryPage";
import Expenses from "./pages/Expenses";
import Incomes from "./pages/Incomes";
import AuthLayout from "./components/AuthLayout";

import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <Router>
      <div className="custom-container">
        <UserProvider>
          <Routes>
            <Route path="/auth" element={<Authentication />} />

            <Route element={<AuthLayout />}>
              <Route exact path="/" element={<Dashboard />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route exact path="/exenses" element={<Expenses />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route exact path="/incomes" element={<Incomes />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route exact path="/incomes" element={<Incomes />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route exact path="/new" element={<EntryPage />} />
            </Route>
          </Routes>
        </UserProvider>
      </div>
    </Router>
  );
}
