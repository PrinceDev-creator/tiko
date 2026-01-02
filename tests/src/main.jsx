import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import VerifyPass from "./components/VerifyPass";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import QrScanner from "./components/QrScanner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/pass" element={<App />} />
        <Route path="/verify-pass/:id" element={<VerifyPass />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/scan" element={<QrScanner />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
