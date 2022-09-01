import Pagination from "@/Components/Pagination/Pagination";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import TransactionListCard from "@/Components/Admin/TransactionListCard";

export default function Transaction(props) {
    const { transactions } = props;
    const { post } = useForm();
    const handleAccept = (transaction) => {
        return (e) => {
            e.preventDefault();
            post(route("admin.dashboard.transactions.accept", transaction));
        };
    };
    const handleReject = (transaction) => {
        return (e) => {
            e.preventDefault();
            post(route("admin.dashboard.transactions.reject", transaction));
        };
    };
    return (
        <AdminDashboard user={props.auth.user} title="Transactions">
            <div>
                {transactions.data.map((transaction) => (
                    <TransactionListCard
                        key={transaction.id}
                        transaction={transaction}
                        handleAccept={handleAccept}
                        handleReject={handleReject}
                    />
                ))}
            </div>
            <Pagination
                links={transactions.links}
                from={transactions.from}
                to={transactions.to}
                total={transactions.total}
                last_page={transactions.last_page}
                className="mt-7"
            />
        </AdminDashboard>
    );
}
