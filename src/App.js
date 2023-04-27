import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Login from "./components/Login";

import SignUp from "./components/SignUp";

import Admin from "./components/Admin";
import NotFound from "./components/NotFound";
import User from "./components/User";
import Chat from "./components/Chat";
import UserProtectedRoute from "./ProtectedRoutes/UserProtectedRoute";
import AdminProtectedRoute from "./ProtectedRoutes/AdminProtectedRoute";
import Cookies from "js-cookie";

function App() {
  const role = Cookies.get("role");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/admin"
            element={
              role === "admin" ? (
                <AdminProtectedRoute>
                  <Admin />
                </AdminProtectedRoute>
              ) : (
                // <NotFound />
                <Navigate to="/notfound" />
              )
            }
          />
          <Route
            path="/user"
            element={
              role === "user" ? (
                <UserProtectedRoute>
                  <User />
                </UserProtectedRoute>
              ) : (
                <Navigate to="/notfound" />
              )
            }
          />

          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="/notfound" />} />
          <Route path="/notfound" exact element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
