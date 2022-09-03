import PriceFormat from "@/Components/Price/PriceFormat";
import React from "react";
import moment from "moment/moment";
import Pagination from "@/Components/Pagination/Pagination";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";

export default function Wallet(props) {
    const { transfers } = props;

    return (
        <AdminDashboard user={props.auth.user} title="Merchant Wallet">
            <div className="mt-7">
                <h4 className="text-lg text-gray-400">Merchant Transfer</h4>
                <div>
                    {transfers.data.map((transfer) => (
                        <div
                            key={transfer.id}
                            className="border border-gray-100 shadow-md mt-5 p-5 rounded-md"
                        >
                            <p>Merchant Name : {transfer.merchant.name}</p>
                            <p>Bank Name : {transfer.bank_name}</p>
                            <p>
                                Bank Account Number :{" "}
                                {transfer.bank_account_number}
                            </p>
                            <PriceFormat
                                value={transfer.amount}
                                renderText={(value, props) => (
                                    <p {...props}>Amount : {value}</p>
                                )}
                            />
                            <p className="text-sm text-gray-400">
                                {moment(transfer.created_at).format(
                                    "DD MMMM YYYY, HH:mm:ss"
                                )}
                            </p>
                        </div>
                    ))}
                </div>
                <Pagination
                    links={transfers.links}
                    from={transfers.from}
                    to={transfers.to}
                    total={transfers.total}
                    last_page={transfers.last_page}
                />
            </div>
        </AdminDashboard>
    );
}
