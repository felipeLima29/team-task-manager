import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import Tasks from "../pages/Tasks/Tasks";
import Settings from "../pages/Settings/Settings";
import Profile from "../pages/Profile/Profile";
import Teams from "../pages/Teams/Teams";

export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />

            <Route element={<DashboardLayout />}>

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/tasks" element={<Tasks />} />

                <Route path="/teams" element={<Teams />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/settings" element={<Settings />} />

            </Route>

            <Route path="*" element={<Navigate to="/dashboard" />} />

        </Routes>
    )
};