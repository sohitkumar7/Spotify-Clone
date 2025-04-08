import React from "react";
import Login from "./pages/Login.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./Context/Authprovider.jsx";
import Admin from "./pages/Admin.jsx";
function App() {

  const [authUser] = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={
          authUser ? (
          <Home/>
          ): (<Navigate to = {"/login"}/>)
          }/>
        <Route path="/admin" element={
          authUser ? (
          <Admin/>
          ): (<Navigate to = {"/login"}/>)
          }/>
        <Route path="/login" element={ authUser ? <Navigate to={"/"}/> : <Login />}></Route>
        <Route path="/Register" element={authUser ? <Navigate to={"/"}/> : <Register />}></Route>
      </Routes>
      <Toaster/>
    </>
  );
}

export default App;
