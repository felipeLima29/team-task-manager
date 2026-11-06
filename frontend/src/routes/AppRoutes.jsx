import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";

export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />

            <Route element={<DashboardLayout />}>

                <Route path="/dashboard" element={<Dashboard />} />

            </Route>

            <Route path="*" element={<Navigate to="/dashboard" />} />

        </Routes>
    )
};