import PriceFormat from "@/Components/Price/PriceFormat";
import Main from "@/Layouts/Main";
import React from "react";
import moment from "moment/moment";
import { Head, Link } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination/Pagination";
import ArrowRight from "@/Components/Icon/ArrowRight";

export default function Index(props) {
    const { transactions } = props;

    return (
        <Main>
            <Head title="Transaction" />
            <div className="mt-12">
                <h1 className="text-3xl font-bold">History Transactions</h1>
            </div>
            <div className="mt-7">
                {transactions.data.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="mb-6 border border-gray-100 rounded-lg shadow-xl py-4"
                    >
                        <div className="grid grid-cols-4 px-7 border-b pb-3 mb-2">
                            <div>
                                <span className="text-gray-500 text-xs">
                                    Transaction ID
                                </span>
                                <p className="text-sm">{transaction.id}</p>
                                <p className="text-xs text-gray-600">
                                    {moment(transaction.updated_at).format(
                                        "DD MMMM YYYY"
                                    )}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500 text-xs">
                                    Total
                                </span>
                                <PriceFormat
                                    value={transaction.total_price}
                                    renderText={(value, props) => (
                                        <p className="text-sm" {...props}>
                                            {value}
                                        </p>
                                    )}
                                />
                            </div>
                            <div>
                                <span className="text-gray-500 text-xs">
                                    Status
                                </span>
                                <p
                                    className={`text-sm capitalize ${
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
                                </p>
                            </div>
                            <div className="flex justify-end items-center">
                                <Link
                                    href={route(
                                        "transactions.show",
                                        transaction
                                    )}
                                >
                                    <button className="flex items-center text-yellow-400 text-sm font-semibold px-2 py-1.5 border border-yellow-400 rounded-sm">
                                        <span className="mr-1">Detail</span>
                                        <ArrowRight />
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="px-7">
                            {transaction.per_merchant_transactions.map(
                                (per_merchant_transaction) => (
                                    <div
                                        className="mt-4 pb-2 border-b border-gray-200"
                                        key={per_merchant_transaction.id}
                                    >
                                        <div>
                                            <Link
                                                href={route(
                                                    "merchants.show",
                                                    per_merchant_transaction.merchant
                                                )}
                                                className="hover:underline"
                                            >
                                                {
                                                    per_merchant_transaction
                                                        .merchant.name
                                                }
                                            </Link>
                                        </div>
                                        {per_merchant_transaction.orders.map(
                                            (order) => (
                                                <Link
                                                    href={route(
                                                        "products.show",
                                                        order?.product
                                                    )}
                                                    key={order.id}
                                                    className="flex justify-between mt-4"
                                                >
                                                    <div className="flex items-center">
                                                        <img
                                                            src={`/storage/${order.product?.image}`}
                                                            alt={
                                                                order.product
                                                                    ?.name
                                                            }
                                                            className="w-12 h-12 rounded-md"
                                                        />
                                                        <div className="ml-4">
                                                            <div className="text-lg font-semibold">
                                                                {
                                                                    order
                                                                        .product
                                                                        ?.name
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                Qty:{" "}
                                                                {order.quantity}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <PriceFormat
                                                            value={order.price}
                                                            renderText={(
                                                                value,
                                                                props
                                                            ) => (
                                                                <div
                                                                    className="text-sm text-gray-600"
                                                                    {...props}
                                                                >
                                                                    {value}
                                                                </div>
                                                            )}
                                                        />
                                                        <PriceFormat
                                                            value={
                                                                order.price *
                                                                order.quantity
                                                            }
                                                            renderText={(
                                                                value,
                                                                props
                                                            ) => (
                                                                <div
                                                                    className="text-sm font-semibold text-gray-600"
                                                                    {...props}
                                                                >
                                                                    {value}
                                                                </div>
                                                            )}
                                                        />
                                                    </div>
                                                </Link>
                                            )
                                        )}
                                        <div className="flex justify-end mt-3">
                                            <PriceFormat
                                                value={
                                                    per_merchant_transaction.total_price
                                                }
                                                className="text-sm font-semibold"
                                            />
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))}
                <Pagination
                    links={transactions.links}
                    from={transactions.from}
                    to={transactions.to}
                    total={transactions.total}
                    last_page={transactions.last_page}
                />
            </div>
        </Main>
    );
}
