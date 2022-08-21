import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import React from "react";

export default function Transaction(props) {
    return (
        <AdminDashboard user={props.auth.user} title="Transactions">
            <p>tes</p>
        </AdminDashboard>
    );
}
