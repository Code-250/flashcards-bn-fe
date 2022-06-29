import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import {
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/layout";
import Login from "./login";
import Signup from "./signup";

interface Token {
  token: string;
}
const authLink = setContext((_, { headers }): Object => {
  const token: Token | null = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") as string)
    : null;
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const apiLink = createHttpLink({
  uri: `https://graphql-bn-ts-be.herokuapp.com/graphql`,
});
const apolloBackend = new ApolloClient({
  link: authLink.concat(apiLink),
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
