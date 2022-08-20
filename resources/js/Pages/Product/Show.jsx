import Main from "@/Layouts/Main";
import React from "react";
import NumberFormat from "react-number-format";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import QuantityField from "@/Components/Cart/QuantityField";
import CartPlus from "@/Components/Icon/CartPlus";
import ShippingBox01 from "@/Components/Icon/ShippingBox01";

export default function Show(props) {
    const { product, cart } = props;
    const { merchant } = product;
    const { post, data, setData } = useForm({
        product_id: product.id,
        quantity: cart ? cart.quantity : 1,
    });
    const stock = product.stock + (cart ? cart.quantity : 0);

    const handleAddQuantity = (e) => {
        e.preventDefault();
        if (data.quantity >= stock) {
            return;
        }
        setData("quantity", data.quantity + 1);
    };

    const handleRemoveQuantity = (e) => {
        e.preventDefault();
        if (data.quantity <= 1) {
            return;
        }
        setData("quantity", data.quantity - 1);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        post(route("carts.store"));
    };

    return (
        <Main user={props.auth.user}>
            <Head title={product.name} />
            <div className="mt-24 grid grid-cols-3 gap-12">
                <div>
                    <img
                        className="h-96 w-full object-cover border border-gray-300 rounded-lg"
                        src={`/storage/${product.image}`}
                        alt={product.name}
                    />
                </div>
                <div>
                    <h1 className="capitalize font-semibold text-3xl">
                        {product.name}
                    </h1>
                    <div className="mt-3 flex items-center">
                        <ShippingBox01 className="mr-1 text-yellow-300 text-sm" />
                        <span className="text-sm">5 Terjual</span>
                    </div>
                    <NumberFormat
                        value={product.price}
                        displayType={"text"}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix={"Rp. "}
                        renderText={(value, props) => (
                            <h3 className="mt-7 font-bold text-4xl" {...props}>
                                {value}
                            </h3>
                        )}
                    />
                    <Link href={route("merchants.show", merchant)}>
                        <div className="flex mt-10 px-5 py-3 border border-1 border-gray-300 rounded-xl shadow-xl">
                            <div>
                                {merchant.image && (
                                    <img
                                        className="w-12 h-12 rounded-full border border-1 border-gray-300 mr-4"
                                        src={`/storage/${merchant.image}`}
                                        alt={merchant.name}
                                    />
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900">
                                    {merchant.name}
                                </h3>
                            </div>
                        </div>
                    </Link>
                    <div className="mt-10 px-5 py-3 border border-1 border-gray-300 rounded-md shadow-xl">
                        <h4 className="font-semibold text-lg text-yellow-400">
                            Description
                        </h4>
                        <p className="mt-3 text-gray-800 text-sm">
                            {product.description}
                        </p>
                    </div>
                </div>
                <div>
                    <div className="mt-10 px-5 py-3 border border-1 border-gray-300 rounded-md shadow-xl">
                        <h1 className="capitalize font-semibold text-xl">
                            {product.name}
                        </h1>
                        <div className="mt-1 text-gray-700 text-sm">
                            <span className="mr-1 text-gray-700">Stock :</span>
                            <span className="font-bold">{product.stock}</span>
                        </div>
                        <div className="mt-4">
                            <span className="block text-gray-700">
                                Quantity
                            </span>
                            <QuantityField
                                quantity={data.quantity}
                                onAddQuantity={handleAddQuantity}
                                onRemoveQuantity={handleRemoveQuantity}
                            />
                        </div>
                        <div className="mt-7">
                            <span className="block text-gray-700">
                                Subtotal
                            </span>
                            <NumberFormat
                                value={product.price * data.quantity}
                                displayType={"text"}
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix={"Rp. "}
                                renderText={(value, props) => (
                                    <h3
                                        className="font-semibold text-2xl"
                                        {...props}
                                    >
                                        {value}
                                    </h3>
                                )}
                            />
                        </div>
                        <div className="mt-5 mb-3 w-full flex flex-row justify-center">
                            <button
                                onClick={handleAddToCart}
                                className="flex items-center px-5 py-2 text-yellow-400 border border-1 border-yellow-400 rounded-lg"
                            >
                                <CartPlus className="mr-2 inline" />
                                Add To Cart
                            </button>
                            <Link
                                as="button"
                                href="#"
                                className="ml-3 px-3 py-2 text-white border border-1 border-yellow-400 bg-yellow-400 rounded-lg"
                            >
                                Buy Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
}
