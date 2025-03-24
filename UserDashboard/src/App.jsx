import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  useLocation,
} from "react-router-dom";
import Signup from "./page/Signup";
import Home from "./page/Home";
import Login from "./page/Login";
import ProtectedRoute from "./page/ProtectedRoute";
import MainLayout from "./Components/MainLayout";
import Adduser from "./page/Adduser";
import Driver from "./page/Driver";
import Warehouse from "./page/Warehouse";


function App() {
  const location = useLocation();
  const isHome = location.pathname.includes("/");

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/adduser" element={<Adduser />} />
            <Route path="/driver" element={<Driver />} />
            <Route path="/warehouse" element={<Warehouse />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
