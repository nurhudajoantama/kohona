import React from "react";
import MerchantDashboard from "@/Layouts/Merchant/Dashboard/MerchantDashboard";

function Dashboard(props) {
    return (
        <MerchantDashboard title="Merchant Dashboard" user={props.auth.user}>
            <h1>Merchant Dashboard</h1>
        </MerchantDashboard>
    );
}

export default Dashboard;
