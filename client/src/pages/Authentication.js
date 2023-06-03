import React from "react";
import AuthForms from "../components/AuthForms";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

export default function Authentication() {
  const navigate = useNavigate();
  const {login, register, currentUser} = useAuth()

  const handleAuth = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries([...formData]);

    const formName = e.target.name

    if (formName === "login") {
      await login(formObject);
    } else if (formName === "register") {
      await register(formObject);
    }

    navigate("/");
  };

  return currentUser === null ? <AuthForms onSubmit={handleAuth} /> : <Navigate to={"/"} replace />;
}
