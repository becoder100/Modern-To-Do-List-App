import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import LoginSignup from "./LoginSignup.jsx";
import App from "./App.jsx";
import "./index.css";

const Main = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize with localStorage value
    return localStorage.getItem("isAuthenticated") === "true";
  });
  
  const [username, setUsername] = useState(() => {
    // Initialize with localStorage value
    return localStorage.getItem("username") || "";
  });

  const handleAuthSuccess = (user) => {
    setIsAuthenticated(true);
    setUsername(user);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
  };

  return (
    <>
      {isAuthenticated ? (
        <App username={username} onLogout={handleLogout} />
      ) : (
        <LoginSignup onAuthSuccess={handleAuthSuccess} />
      )}
    </>
  );
};

// Create root separately to ensure it only happens once
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <StrictMode>
    <Main />
  </StrictMode>
);