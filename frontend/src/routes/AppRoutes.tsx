import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import VisitorLogin from "../pages/VisitorLogin";
import VisitorRegister from "../pages/VisitorRegister";
import NotFound from "../pages/NotFound";
import { FC } from "react";


const AppRoutes: FC= () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VisitorLogin />} />
        <Route path="/register" element={<VisitorRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} /> {/* 404 Page */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
