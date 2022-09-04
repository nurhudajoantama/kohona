import React from "react";
import moment from "moment/moment";
import PriceFormat from "@/Components/Price/PriceFormat";
import { Link } from "@inertiajs/inertia-react";
import QuantityField from "@/Components/Cart/QuantityField";
import { useCart } from "@/Context/CartProvider";

export default function ProductCartCard({
    product,
    productIndex,
    merchantIndex,
}) {
    const { addQuantity, removeQuantity, removeItem, checkboxChange } =
        useCart();

    const handleAddQuantity = (e) => {
        e.preventDefault();
        addQuantity(merchantIndex, productIndex);
    };

    const handleRemoveQuantity = (e) => {
        e.preventDefault();
        removeQuantity(merchantIndex, productIndex);
    };

    const handleRemove = (e) => {
        e.preventDefault();
        removeItem(product.carts[0]);
    };

    const handleCheckboxChange = (e) => {
        checkboxChange(merchantIndex, productIndex, e.target.checked);
    };

    return (
        <div className="mb-6 border border-gray-100 rounded-lg shadow-xl p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                    <div className="mr-4">
                        <input
                            type="checkbox"
                            name="carts"
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    <Link href={route("products.show", product)}>
                        <div className="flex items-center">
                            <img
                                className="h-28 w-28 object-cover rounded-md"
                                src={`/storage/${product.image}`}
                                alt={product.name}
                            />
                            <div className="flex flex-col ml-4">
                                <div className="mb-2">
                                    <h1 className="font-bold text-xl">
                                        {product.name}
                                    </h1>
                                    <p className="text-xs text-gray-500">
                                        Stock : {product.stock}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <PriceFormat
                                        value={product.price}
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
                                        {moment(
                                            product.carts[0].updated_at
                                        ).format("DD MMMM YYYY")}
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
                            quantity={product.carts[0].quantity}
                            onAddQuantity={handleAddQuantity}
                            onRemoveQuantity={handleRemoveQuantity}
                        />
                        <PriceFormat
                            value={product.price * product.carts[0].quantity}
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
                                onClick={handleRemove}
                                className="bg-red-600 text-white py-1 px-3 rounded-md"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
