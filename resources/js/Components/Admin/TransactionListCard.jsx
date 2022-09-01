import React from "react";
import PriceFormat from "@/Components/Price/PriceFormat";

export default function TransactionListCard({
    transaction,
    handleAccept,
    handleReject,
}) {
    return (
        <div className="p-6 border border-gray-300 shadow-md mb-5 rounded-md bg-white flex justify-between">
            <div>
                <h3 className="text-lg font-semibold">
                    {transaction.user.name}
                </h3>
                <h5 className="text-yellow-400 text-sm font-semibold mt-2">
                    Transaksi Bank
                </h5>
                <div className="mt-1 text-sm">
                    <span className="text-gray-400">Bank Name :</span>
                    <span className="font-bold ml-2 capitalize">
                        {transaction.bank_name}
                    </span>
                </div>
                <div className="mt-1 text-sm">
                    <span className="text-gray-400">Bank Account Number :</span>
                    <span className="font-bold ml-2 capitalize">
                        {transaction.bank_account_number}
                    </span>
                </div>
                <div className="mt-1 text-sm">
                    <span className="text-gray-400">Total :</span>
                    <PriceFormat
                        value={transaction.total_price}
                        renderText={(value, props) => (
                            <span
                                className="font-bold ml-2 capitalize"
                                {...props}
                            >
                                {value}
                            </span>
                        )}
                    />
                </div>
            </div>
            <div className="flex items-center">
                <span
                    className={`capitalize ${
                        transaction.status.id === 1
                            ? "text-yellow-400"
                            : transaction.status.id === 2
                            ? "text-green-400"
                            : transaction.status.id === 3
                            ? "text-red-400"
                            : ""
                    }`}
                >
                    {transaction.status.status}
                </span>
            </div>
            {transaction.status_id === 1 && (
                <div className="flex items-center">
                    <button
                        onClick={handleAccept(transaction)}
                        className="ml-4 btn border bg-green-500 text-white px-5 py-2 rounded-md"
                    >
                        Accepted
                    </button>
                    <button
                        onClick={handleReject(transaction)}
                        className="ml-4 btn border bg-red-500 text-white  px-5 py-2 rounded-md"
                    >
                        Reject
                    </button>
                </div>
            )}
        </div>
    );
}