import React, { useEffect } from "react";
import Main from "@/Layouts/Main";
import moment from "moment/moment";
import PriceFormat from "@/Components/Price/PriceFormat";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Alert from "@/Components/Alert/Alert";
import { Inertia } from "@inertiajs/inertia";
import QuantityField from "@/Components/Cart/QuantityField";

export default function Cart(props) {
    const c = props.carts;
    const { delete: d } = useForm();

    const [alerts, setAlerts] = React.useState([]);

    const [carts, setCarts] = React.useState(
        JSON.parse(JSON.stringify([...c]))
    );

    useEffect(() => {
        setCarts(JSON.parse(JSON.stringify([...c])));
    }, [c]);

    const [selectedCartsIndex, setSelectedCartsIndex] = React.useState([]);

    const total = selectedCartsIndex.reduce((acc, cartIndex) => {
        return acc + carts[cartIndex].quantity * carts[cartIndex].product.price;
    }, 0);

    const handleCheckboxChange = (e) => {
        const index = e.target.value;
        const isChecked = e.target.checked;
        const newSelectedCartsIndex = [...selectedCartsIndex];
        if (isChecked) {
            newSelectedCartsIndex.push(index);
        } else {
            newSelectedCartsIndex.splice(
                newSelectedCartsIndex.indexOf(index),
                1
            );
        }
        setSelectedCartsIndex(newSelectedCartsIndex);
    };

    const handleRemoveQuantity = (index) => (e) => {
        e.preventDefault();
        const newCarts = [...carts];
        if (newCarts[index].quantity > 1) {
            newCarts[index].quantity -= 1;
        }
        setCarts(newCarts);
    };

    const handleAddQuantity = (index) => (e) => {
        e.preventDefault();
        const stock = c[index].product.stock + c[index].quantity;
        const newCarts = [...carts];
        if (newCarts[index].quantity < stock) {
            newCarts[index].quantity += 1;
        }
        setCarts(newCarts);
    };

    const handleRemove = (cart) => {
        return (e) => {
            e.preventDefault();
            d(route("carts.destroy", cart), {
                onSuccess: () => {
                    setAlerts([
                        ...alerts,
                        {
                            color: "red",
                            title: "Success!!",
                            message: `Successfully remove item "${cart.product.name}" form your cart.`,
                        },
                    ]);
                },
            });
        };
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (selectedCartsIndex.length === 0) return;
        const data = selectedCartsIndex.map((index) => ({
            product_id: carts[index].product.id,
            quantity: carts[index].quantity,
        }));
        Inertia.post(route("carts.checkout"), data);
    };

    return (
        <Main user={props.auth.user}>
            <Head title="Cart" />
            <div className="mb-7 mt-12">
                <h1 className="font-bold text-4xl">Cart</h1>
                <p>Your cart is going full, let's pay... </p>
            </div>
            <Alert alerts={alerts} setAlerts={setAlerts} />
            <div className="grid grid-cols-3 gap-7">
                <div className="col-span-2">
                    {carts.map((cart, index) => (
                        <div
                            key={index}
                            className="mb-6 border border-gray-100 rounded-lg shadow-xl p-5"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="mr-4">
                                        <input
                                            value={index}
                                            type="checkbox"
                                            name="carts"
                                            onChange={handleCheckboxChange}
                                        />
                                    </div>
                                    <Link
                                        href={route(
                                            "products.show",
                                            cart.product
                                        )}
                                    >
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
                                                        Stock :{" "}
                                                        {cart.product.stock}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <PriceFormat
                                                        value={
                                                            cart.product.price
                                                        }
                                                        renderText={(
                                                            value,
                                                            props
                                                        ) => (
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
                                                        {moment(
                                                            cart.updated_at
                                                        ).format(
                                                            "DD MMMM YYYY"
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-semibold text-gray-700 font-sm">
                                            Qty
                                        </span>
                                        <QuantityField
                                            quantity={cart.quantity}
                                            onAddQuantity={handleAddQuantity(
                                                index
                                            )}
                                            onRemoveQuantity={handleRemoveQuantity(
                                                index
                                            )}
                                        />
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
                                        <div className="mt-3">
                                            <button
                                                onClick={handleRemove(cart)}
                                                className="bg-red-600 text-white py-1 px-3 rounded-md"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <div className="py-3 border border-gray-100 rounded-lg shadow-xl">
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
                                onClick={handleCheckout}
                                className="w-full bg-yellow-300 text-white py-1 px-3 rounded-sm"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
}
