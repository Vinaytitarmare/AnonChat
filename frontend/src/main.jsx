import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ChatRoom from "./components/Chatroom"
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";
// if you're using TailwindCSS
// import "./AnimatedList.css"
 import ChatroomLobby from "./components/ChatroomLobby";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/lobby" element={<ProtectedRoute><ChatroomLobby /></ProtectedRoute>}  />
        <Route path="/room/:roomId" element={<ProtectedRoute><ChatRoom /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
