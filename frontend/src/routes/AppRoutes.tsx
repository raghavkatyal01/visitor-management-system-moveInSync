import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import VisitorLogin from "../pages/VisitorLogin";
import VisitorRegister from "../pages/VisitorRegister";
import NotFound from "../pages/NotFound";
import { FC } from "react";
import VisitorDashboard from "../pages/VisitorDashboard";
import AdminLogin from "../pages/AdminLogin";
import AdminRegister from "../pages/AdminRegister";
import ProtectedRoutes from "../Components/ProtectedRoutes";

import VisitorProfile from "../pages/VisitorProfile";
import VisitorProtectedRoute from "../Components/VisitorProtectedRoute";
import Home from "../pages/Home";


const AppRoutes: FC= () => {
  return (
    <Router>
      <Routes>
        <Route path="/visitorlogin" element={<VisitorLogin />} />
        <Route path="/register" element={<VisitorRegister />} />
        <Route path="/visitor/profile" element={<VisitorProtectedRoute component={VisitorProfile}  />} />
        <Route path="/register" element={<VisitorRegister />} />
        <Route path="/visitordashboard" element={<VisitorDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route index element={<Home/>}/>
        {/* Protected Route for Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoutes Component={AdminDashboard} role="admin" />}
        />
        <Route path="*" element={<NotFound />} /> {/* 404 Page */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
