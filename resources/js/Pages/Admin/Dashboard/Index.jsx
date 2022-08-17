import React from "react";
import { Head } from "@inertiajs/inertia-react";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";

function Dashboard(props) {
    return (
        <AdminDashboard title="Admin Dashboard" user={props.auth.user}>
            <h1>Admin Dashboard</h1>
        </AdminDashboard>
    );
}

export default Dashboard;
