import Main from "@/Layouts/Main";
import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import PriceFormat from "@/Components/Price/PriceFormat";
import moment from "moment/moment";
import LocationPin from "@/Components/Icon/LocationPin";
import CreditCardFilled from "@/Components/Icon/CreditCardFilled";
import Modal from "@/Components/Modal/Modal";

export default function Checkout(props) {
    const { carts } = props;
    const { data, setData, post } = useForm({
        address: "",
        bank_name: "",
        bank_account_number: "",
        carts_id: carts.map((cart) => cart.id),
    });

    const handleBuy = (e) => {
        e.preventDefault();
        if (!data.address || !data.bank_name || !data.bank_account_number)
            return;
        post(route("buy.store"));
    };

    const [modalAddress, setModalAddress] = React.useState(false);
    const [modalBank, setModalBank] = React.useState(false);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const total = carts.reduce((acc, cart) => {
        return acc + cart.quantity * cart.product.price;
    }, 0);
    return (
        <Main user={props.auth.user}>
            <Head title="Checkout" />
            <div className="mb-7 mt-12">
                <h1 className="font-bold text-4xl">Checkout</h1>
                <p>Let's pay your cart... </p>
            </div>

            <div className="grid grid-cols-3 gap-7">
                <div className="col-span-2">
                    {carts.map((cart, index) => (
                        <div
                            key={index}
                            className="mb-6 border border-gray-100 rounded-lg shadow-xl p-5"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        className="h-28 w-28 object-cover rounded-md"
                                        src={`/storage/${cart.product.image}`}
                                        alt={cart.product.name}
                                    />
                                    <div className="flex flex-col ml-4">
                                        <div className="mb-2">
                                            <h1 className="font-bold text-xl">
                                                {cart.product.name}
                                            </h1>
                                            <p className="text-xs text-gray-500">
                                                Stock : {cart.product.stock}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <PriceFormat
                                                value={cart.product.price}
                                                renderText={(value, props) => (
                                                    <span
                                                        className="font-semibold text-xl"
                                                        {...props}
                                                    >
                                                        {value}
                                                    </span>
                                                )}
                                            />
                                        </div>

                                        <div>
                                            <span className="text-sm text-gray-500">
                                                {moment(cart.updated_at).format(
                                                    "DD MMMM YYYY"
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-semibold text-gray-700 font-sm">
                                            Qty
                                        </span>
                                        <span>{cart.quantity}</span>
                                        <PriceFormat
                                            value={
                                                cart.product.price *
                                                cart.quantity
                                            }
                                            renderText={(value, props) => (
                                                <span
                                                    className="font-semibold text-md"
                                                    {...props}
                                                >
                                                    {value}
                                                </span>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <div
                        onClick={() => setModalAddress(true)}
                        className="flex py-4 px-5 border border-gray-100 rounded-lg shadow-lg mb-5 cursor-pointer"
                    >
                        <div className="text-4xl w-10 mt-2 text-yellow-400">
                            <LocationPin />
                        </div>
                        <div className="ml-3">
                            <h3 className="font-bold text-md">
                                Shipping Address
                            </h3>
                            <p className="text-sm">{data.address || "-"}</p>
                        </div>
                    </div>
                    <div
                        onClick={() => setModalBank(true)}
                        className="flex py-4 px-5 border border-gray-100 rounded-lg shadow-lg mb-5 cursor-pointer"
                    >
                        <div className="text-3xl w-10 mt-2 text-yellow-400">
                            <CreditCardFilled />
                        </div>
                        <div className="ml-3">
                            <div>
                                <h3 className="font-bold text-md">Bank Name</h3>
                                <p className="text-sm">
                                    {data.bank_name || "-"}
                                </p>
                            </div>
                            <div className="mt-3">
                                <h3 className="font-bold text-md">
                                    Bank Account Number
                                </h3>
                                <p className="text-sm">
                                    {data.bank_account_number || "-"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="py-3 border border-gray-100 rounded-lg shadow-lg">
                        <div className="px-5 pb-3 border-b border-gray-200">
                            <h3 className="font-bold text-2xl">
                                Shopping Summary
                            </h3>
                            <div className="mt-5 flex justify-between">
                                <h3 className=" text-sm">Subtotal</h3>
                                <PriceFormat
                                    value={total}
                                    renderText={(value, props) => (
                                        <span className="text-sm" {...props}>
                                            {value}
                                        </span>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="px-5 my-5 flex justify-between">
                            <h3 className="font-semibold text-xl">Total</h3>
                            <PriceFormat
                                value={total}
                                renderText={(value, props) => (
                                    <span className="text-lg" {...props}>
                                        {value}
                                    </span>
                                )}
                            />
                        </div>
                        <div className="px-5 mb-2">
                            <button
                                onClick={handleBuy}
                                className="w-full bg-yellow-300 text-white py-1 px-3 rounded-sm"
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            <Modal modalOpen={modalAddress} setModalOpen={setModalAddress}>
                <div className="py-5">
                    <h3 className="font-semibold text-xl">Address</h3>
                    <div className="mt-2">
                        <label
                            htmlFor="address"
                            value="Address"
                            className="block font-medium text-sm text-gray-700"
                        />

                        <textarea
                            name="address"
                            className="mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm block w-full"
                            onChange={onHandleChange}
                            value={data.address}
                        ></textarea>
                    </div>
                </div>
            </Modal>
            <Modal modalOpen={modalBank} setModalOpen={setModalBank}>
                <div className="py-5">
                    <h3 className="font-semibold text-xl">Payment</h3>
                    <div className="mt-7">
                        <label
                            htmlFor="bank_name"
                            className="block font-medium text-sm text-gray-700"
                        >
                            Bank Name
                        </label>
                        <input
                            type="text"
                            name="bank_name"
                            placeholder="Bank Name"
                            value={data.bank_name}
                            className="mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm block w-full"
                            onChange={onHandleChange}
                        />
                    </div>
                    <div className="mt-7">
                        <label
                            htmlFor="bank_account_number"
                            className="block font-medium text-sm text-gray-700"
                        >
                            Bank Account Number
                        </label>
                        <input
                            type="text"
                            name="bank_account_number"
                            placeholder="Bank Account Number"
                            value={data.bank_account_number}
                            className="mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm block w-full"
                            onChange={onHandleChange}
                        />
                    </div>
                </div>
            </Modal>
        </Main>
    );
}
