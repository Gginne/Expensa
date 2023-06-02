import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import Navigation from "./Navigation";

export default function AuthLayout() {
  const { currentUser } = useAuth();

  return currentUser !== null ? (
    <>
      <Navigation />
      <Outlet />
    </>
  ) : (
    <Navigate to={"/auth"} replace />
  );
}
