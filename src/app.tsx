import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/layout";
import Login from "./login";
import Signup from "./signup";

const apolloBackend = new ApolloClient({
  uri: `https://graphql-bn-ts-be.herokuapp.com/graphql`,
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={apolloBackend}>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/dashboard" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
export default App;
