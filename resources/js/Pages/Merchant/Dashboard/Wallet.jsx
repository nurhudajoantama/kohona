import PriceFormat from "@/Components/Price/PriceFormat";
import MerchantDashboard from "@/Layouts/Merchant/Dashboard/MerchantDashboard";
import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import moment from "moment/moment";
import Pagination from "@/Components/Pagination/Pagination";
import Alert from "@/Components/Alert/Alert";

export default function Wallet(props) {
    const { transfers } = props;
    const { merchant } = props.auth.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        bank_name: "",
        bank_account_number: "",
        amount: 100000,
    });

    const [noEnoughBalance, setNoEnoughBalance] = useState(false);

    useEffect(() => {
        if (data.amount < 100000 || data.amount > merchant.wallet_amount) {
            setNoEnoughBalance(true);
        } else {
            setNoEnoughBalance(false);
        }
    }, [data.amount]);

    useEffect(() => {
        return () => {
            reset(["bank_name", "bank_account_number", "amount"]);
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const [alerts, setAlerts] = useState([]);
    const handleSubmitWithdraw = (e) => {
        e.preventDefault();
        console.log("here");
        post(route("merchants.dashboard.wallet.withdraw"), {
            onSuccess: () => {
                setAlerts([
                    ...alerts,
                    {
                        color: "green",
                        title: "Success!!",
                        message: "Your withdraw will processed by admin.",
                    },
                ]);
                reset("bank_name", "bank_account_number", "amount");
            },
        });
    };

    return (
        <MerchantDashboard user={props.auth.user} title="Merchant Wallet">
            <div className="mt-5">
                <h4 className="text-lg text-gray-400">Amount</h4>
                <PriceFormat
                    value={merchant.wallet_amount}
                    renderText={(value, props) => (
                        <h2
                            className="font-semibold text-5xl text-yellow-400"
                            {...props}
                        >
                            {value}
                        </h2>
                    )}
                />
            </div>
            <div className="mt-10">
                <Alert alerts={alerts} setAlerts={setAlerts} />
                <form onSubmit={handleSubmitWithdraw}>
                    <div className="grid grid-cols-3 mb-3 gap-7">
                        <div>
                            <Label forInput="bank_name" value="Bank Name" />
                            <Input
                                type="text"
                                name="bank_name"
                                value={data.bank_name}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError
                                message={errors.bank_name}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label
                                forInput="bank_account_number"
                                value="Bank Account Number"
                            />
                            <Input
                                type="text"
                                name="bank_account_number"
                                value={data.bank_account_number}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <InputError
                                message={errors.bank_account_number}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label forInput="amount" value="Amount" />
                            <PriceFormat
                                displayType={"input"}
                                value={data.amount}
                                className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                                name="amount"
                                onValueChange={({ value }) =>
                                    setData("amount", value)
                                }
                            />
                            <InputError
                                message={errors.amount}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    {noEnoughBalance && (
                        <div className="text-red-500 text-xs italic">
                            Amount must be greater than{" "}
                            <PriceFormat value={100000} /> and less than your
                            wallet amount.
                        </div>
                    )}
                    <button
                        type="submit"
                        className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={noEnoughBalance || processing}
                    >
                        Withdraw
                    </button>
                </form>
            </div>
            <div className="mt-7">
                <h4 className="text-lg text-gray-400">History Transfer</h4>
                <div>
                    {transfers.data.map((transfer) => (
                        <div
                            key={transfer.id}
                            className="border border-gray-100 shadow-md mt-5 p-5 rounded-md"
                        >
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
        </MerchantDashboard>
    );
}
