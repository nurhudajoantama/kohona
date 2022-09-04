import MerchantDashboard from "@/Layouts/Merchant/Dashboard/MerchantDashboard";
import React from "react";
import { Link } from "@inertiajs/inertia-react";
import PriceFormat from "@/Components/Price/PriceFormat";
import moment from "moment/moment";

export default function Order(props) {
    const { transactions: per_merchant_transactions } = props;

    return (
        <MerchantDashboard title="Merchant Order">
            <div>
                {per_merchant_transactions.data.map(
                    (per_merchant_transaction) => (
                        <div
                            key={per_merchant_transaction.id}
                            className="mb-6 border border-gray-100 rounded-lg shadow-xl py-4"
                        >
                            <div className="grid grid-cols-4 px-7 border-b pb-3 mb-2">
                                <div>
                                    <span className="text-gray-500 text-xs">
                                        Transaction Date
                                    </span>
                                    <p className="text-sm">
                                        {moment(
                                            per_merchant_transaction.transaction
                                                .updated_at
                                        ).format("DD MMMM YYYY")}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-xs">
                                        Total
                                    </span>
                                    <PriceFormat
                                        value={
                                            per_merchant_transaction.total_price
                                        }
                                        renderText={(value, props) => (
                                            <p className="text-sm" {...props}>
                                                {value}
                                            </p>
                                        )}
                                    />
                                </div>
                                <div>
                                    <span className="text-gray-500 text-xs">
                                        Address
                                    </span>
                                    <p className="text-sm">
                                        {
                                            per_merchant_transaction.transaction
                                                .address
                                        }
                                    </p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-gray-500 text-xs">
                                        Status
                                    </span>
                                    <p
                                        className={`text-sm capitalize ${
                                            per_merchant_transaction.transaction
                                                .status_id === 1
                                                ? "text-yellow-400"
                                                : per_merchant_transaction
                                                      .transaction.status_id ===
                                                  2
                                                ? "text-green-400"
                                                : per_merchant_transaction
                                                      .transaction.status_id ===
                                                  3
                                                ? "text-red-400"
                                                : ""
                                        }`}
                                    >
                                        {
                                            per_merchant_transaction.transaction
                                                .status.status
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="px-7">
                                <div className="ml-1 ">
                                    <h2 className="text-sm">Products</h2>
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
                                                    alt={order.product?.name}
                                                    className="w-12 h-12 rounded-md"
                                                />
                                                <div className="ml-4">
                                                    <div className="text-lg font-semibold">
                                                        {order.product?.name}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        Qty: {order.quantity}
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
                            </div>
                        </div>
                    )
                )}
            </div>
        </MerchantDashboard>
    );
}
