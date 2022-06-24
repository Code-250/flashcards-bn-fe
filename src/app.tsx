import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Login from "./login";
import Signup from "./signup";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Signup />} />
      <Route path="/dashboard" element={<Layout />} />
    </Routes>
  </BrowserRouter>
);
export default App;
