import React from "react";
import Main from "@/Layouts/Main";
import moment from "moment/moment";
import { Head } from "@inertiajs/inertia-react";
import Detail from "@/Layouts/Detail";
import { Link } from "@inertiajs/inertia-react";
import PriceFormat from "@/Components/Price/PriceFormat";
import LocationPin from "@/Components/Icon/LocationPin";
import CreditCardFilled from "@/Components/Icon/CreditCardFilled";
import CopyIcon from "@/Components/Icon/CopyIcon";
import CopyToClipboard from "react-copy-to-clipboard";

export default function Show(props) {
    const { transaction } = props;
    return (
        <Detail>
            <Head title="Detail Transaction" />
            <div className="grid grid-cols-2 gap-7 m-7">
                <div>
                    <h1 className="text-xl font-semibold">Order Details</h1>
                    <div>
                        {transaction.per_merchant_transactions.map(
                            (per_merchant_transaction) => (
                                <div
                                    className="mt-4"
                                    key={per_merchant_transaction.id}
                                >
                                    <div className="flex justify-between">
                                        <Link
                                            href={route(
                                                "merchants.show",
                                                per_merchant_transaction.merchant
                                            )}
                                            className="hover:underline font-semibold text-sm"
                                        >
                                            {
                                                per_merchant_transaction
                                                    .merchant.name
                                            }
                                        </Link>

                                        <PriceFormat
                                            value={
                                                per_merchant_transaction.total_price
                                            }
                                            className="text-sm font-semibold"
                                        />
                                    </div>
                                    {per_merchant_transaction.orders.map(
                                        (order) => (
                                            <Link
                                                href={route(
                                                    "products.show",
                                                    order?.product
                                                )}
                                                key={order.id}
                                                className="flex justify-between mt-2 p-3 border shadow-md rounded-md"
                                            >
                                                <div className="flex items-center">
                                                    <img
                                                        src={`/storage/${order.product?.image}`}
                                                        alt={
                                                            order.product?.name
                                                        }
                                                        className="w-12 h-12 rounded-md"
                                                    />
                                                    <div className="ml-4">
                                                        <h5 className="text-lg font-semibold">
                                                            {
                                                                order.product
                                                                    ?.name
                                                            }
                                                        </h5>
                                                        <div className="text-sm text-gray-600">
                                                            <PriceFormat
                                                                value={
                                                                    order.price
                                                                }
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
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="mb-1">
                                                        <span className="text-xs text-gray-500">
                                                            x{order.quantity}
                                                        </span>
                                                    </div>
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
                                                                className="text-sm text-gray-600"
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
                            )
                        )}
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-semibold">Payment</h1>
                    <div className="flex mt-4">
                        <div className="text-4xl w-10 text-yellow-400">
                            <LocationPin />
                        </div>
                        <div className="ml-3">
                            <h3 className="font-bold text-md">
                                Shipping Address
                            </h3>
                            <p className="text-sm">{transaction.address}</p>
                        </div>
                    </div>

                    <div className="flex mt-4">
                        <div className="text-3xl w-10 text-yellow-400">
                            <CreditCardFilled />
                        </div>
                        <div className="ml-3">
                            <div>
                                <h3 className="font-bold text-md">Bank Name</h3>
                                <p className="text-sm">
                                    {transaction.bank_name}
                                </p>
                            </div>
                            <div className="mt-3">
                                <h3 className="font-bold text-md">
                                    Bank Account Number
                                </h3>
                                <p className="text-sm">
                                    {transaction.bank_account_number}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <div className="flex items-center">
                            <img
                                src="/assets/images/bni-logo.png"
                                alt="bni"
                                className="h-14 w-14"
                            />
                            <p className="ml-7 text-gray-600">Bank BNI</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600 text-sm">
                                Account Number :
                            </p>
                            <div className="flex items-center">
                                <p className="text-yellow-400 font-semibold text-2xl mr-3">
                                    8728-3839-8292-907
                                </p>
                                <CopyToClipboard text="872838398292907">
                                    <button className="border border-gray-400 text-gray-400 px-4 py-3 rounded-md">
                                        <CopyIcon />
                                    </button>
                                </CopyToClipboard>
                            </div>
                        </div>
                        <div className="text-sm text-gray-400 mt-3">
                            <p>
                                The transaction will be confirmed by the admin
                            </p>
                            <p className="mt-1">
                                Please use the account you entered so that the
                                confirmation process is faster
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-yellow-400 text-white p-7 flex justify-between">
                <div className="flex items-center">
                    <p>Total pembayaran</p>
                    <PriceFormat
                        value={transaction.total_price}
                        className="ml-3 text-xl font-semibold"
                    />
                </div>
            </div>
        </Detail>
    );
}
