import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import VerifyPass from "./VerifyPass";
import Login from "./Login";
import QrScanner from "./QrScanner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/pass" element={<App />} />
        <Route path="/verify-pass/:id" element={<VerifyPass />} />
        <Route path="/login" element={<Login />} />
        <Route path="/scan" element={<QrScanner />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
