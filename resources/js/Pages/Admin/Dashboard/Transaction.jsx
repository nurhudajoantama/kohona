import Pagination from "@/Components/Pagination/Pagination";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import React from "react";
import TransactionListCard from "@/Components/Admin/TransactionListCard";
import { useForm } from "@inertiajs/inertia-react";

export default function Transaction(props) {
    const { transactions } = props;

    const params = new URLSearchParams(window.location.search);
    const { get, setData, data } = useForm({
        user: params.get("user") || undefined,
        id: params.get("id") || undefined,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value || undefined);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route("admin.dashboard.transactions.index"));
    };

    return (
        <AdminDashboard title="Transactions">
            <form action="" className="flex items-end" onSubmit={handleSubmit}>
                <div className="flex-auto">
                    <label htmlFor="user" className="text-sm text-gray-700">
                        User
                    </label>
                    <input
                        className="block w-full border-gray-200 rounded-md shadow-sm px-3 py-2"
                        type="text"
                        name="user"
                        id="user"
                        placeholder="User"
                        value={data.user ?? ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="ml-2 flex-auto">
                    <label htmlFor="id" className="text-sm text-gray-700">
                        ID Transaction
                    </label>
                    <input
                        className=" w-full border-gray-200 rounded-md shadow-sm px-3 py-2"
                        type="text"
                        name="id"
                        id="id"
                        placeholder="ID"
                        value={data.id ?? ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="ml-2">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Search
                    </button>
                </div>
            </form>

            <div className="mt-7">
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
