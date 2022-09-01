import React, { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import AdminTokenListCard from "@/Components/Admin/AdminTokenListCard";
import MerchantListCard from "@/Components/Admin/MerchantListCard";
import Alert from "@/Components/Alert/Alert";
import TransactionListCard from "@/Components/Admin/TransactionListCard";
import { useForm } from "@inertiajs/inertia-react";

function Dashboard(props) {
    const { adminTokens, merchants, transactions } = props;

    const [alerts, setAlerts] = useState([]);

    const { post, delete: d } = useForm();

    const handleDeleteToken = (id) => {
        return (e) => {
            e.preventDefault();
            d(route("admin.dashboard.admin-tokens.destroy", id), {
                onSuccess: () =>
                    setAlerts([
                        {
                            color: "red",
                            title: "Success!!",
                            message: "Successfully deleted admin token.",
                        },
                        ...alerts,
                    ]),
            });
        };
    };

    const handleOnCopyToken = () =>
        setAlerts([
            {
                color: "green",
                title: "Success!!",
                message: "Successfully copied token.",
            },
            ...alerts,
        ]);

    const handleAcceptTransaction = (transaction) => {
        return (e) => {
            e.preventDefault();
            post(route("admin.dashboard.transactions.accept", transaction));
        };
    };
    const handleRejectTransaction = (transaction) => {
        return (e) => {
            e.preventDefault();
            post(route("admin.dashboard.transactions.reject", transaction));
        };
    };

    const handleActiveMerchant = ({ name, ...merchant }) => {
        return (e) => {
            e.preventDefault();
            post(route("admin.dashboard.merchants.activate", merchant), {
                onSuccess: () =>
                    setAlerts([
                        ...alerts,
                        {
                            color: "green",
                            title: "Success!!",
                            message: `Successfully activate ${name} merchant.`,
                        },
                    ]),
            });
        };
    };
    const handleRejectMerchant = ({ name, ...merchant }) => {
        return (e) => {
            e.preventDefault();
            post(route("admin.dashboard.merchants.reject", merchant), {
                onSuccess: () =>
                    setAlerts([
                        ...alerts,
                        {
                            color: "red",
                            title: "Success!!",
                            message: `Successfully rejected ${name} merchant.`,
                        },
                    ]),
            });
        };
    };

    return (
        <AdminDashboard title="Admin Dashboard" user={props.auth.user}>
            <Head title="Admin Dashboard" />
            <Alert alerts={alerts} setAlerts={setAlerts} />
            <div>
                <Link href={route("admin.dashboard.admin-tokens.index")}>
                    <h1 className="text-xl font-bold mb-1 underline">
                        Admin Token
                    </h1>
                </Link>
                {adminTokens.map((token) => (
                    <AdminTokenListCard
                        key={token.id}
                        token={token}
                        handleDelete={handleDeleteToken}
                        handleOnCopy={handleOnCopyToken}
                    />
                ))}
            </div>

            <div className="mt-7">
                <Link href={route("admin.dashboard.merchants.index")}>
                    <h1 className="text-xl font-bold mb-1 underline">
                        Merchants
                    </h1>
                </Link>
                {merchants.map((merchant) => (
                    <MerchantListCard
                        handleActive={handleActiveMerchant}
                        handleReject={handleRejectMerchant}
                        merchant={merchant}
                        key={merchant.id}
                    />
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
                        handleAccept={handleAcceptTransaction}
                        handleReject={handleRejectTransaction}
                    />
                ))}
            </div>
        </AdminDashboard>
    );
}

export default Dashboard;
