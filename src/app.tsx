import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Login from "./login";
import Signup from "./signup";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Layout />} />
    </Routes>
  </BrowserRouter>
);
export default App;
