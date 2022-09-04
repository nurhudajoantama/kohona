import Pagination from "@/Components/Pagination/Pagination";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import React from "react";
import TransactionListCard from "@/Components/Admin/TransactionListCard";

export default function Transaction(props) {
    const { transactions } = props;

    return (
        <AdminDashboard title="Transactions">
            <div>
                {transactions.data.map((transaction) => (
                    <TransactionListCard
                        key={transaction.id}
                        transaction={transaction}
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
