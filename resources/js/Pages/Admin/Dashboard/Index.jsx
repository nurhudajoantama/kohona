import React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import AdminTokenListCard from "@/Components/Admin/AdminTokenListCard";
import MerchantListCard from "@/Components/Admin/MerchantListCard";
import TransactionListCard from "@/Components/Admin/TransactionListCard";

function Dashboard(props) {
    const { adminTokens, merchants, transactions } = props;

    return (
        <AdminDashboard title="Admin Dashboard" user={props.auth.user}>
            <Head title="Admin Dashboard" />
            <div>
                <Link href={route("admin.dashboard.admin-tokens.index")}>
                    <h1 className="text-xl font-bold mb-1 underline">
                        Admin Token
                    </h1>
                </Link>
                {adminTokens.map((token) => (
                    <AdminTokenListCard key={token.id} token={token} />
                ))}
            </div>

            <div className="mt-7">
                <Link href={route("admin.dashboard.merchants.index")}>
                    <h1 className="text-xl font-bold mb-1 underline">
                        Merchants
                    </h1>
                </Link>
                {merchants.map((merchant) => (
                    <MerchantListCard key={merchant.id} merchant={merchant} />
                ))}
            </div>

            <div className="mt-7">
                <Link href={route("admin.dashboard.transactions.index")}>
                    <h1 className="text-xl font-bold mb-1 underline">
                        Transactions
                    </h1>
                </Link>
                {transactions.map((transaction) => (
                    <TransactionListCard
                        key={transaction.id}
                        transaction={transaction}
                    />
                ))}
            </div>
        </AdminDashboard>
    );
}

export default Dashboard;
