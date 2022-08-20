import React from "react";
import CartDash from "@/Components/Icon/CartDash";
import CartPlus from "@/Components/Icon/CartPlus";

export default function QuantityField({
    onAddQuantity,
    onRemoveQuantity,
    quantity,
}) {
    return (
        <div className="flex mt-1">
            <button
                onClick={onRemoveQuantity}
                className="flex items-center justify-center px-3 py-2 border border-1 border-gray-200 rounded-l-md hover:bg-gray-100 hover:text-gray-700"
            >
                <CartDash className="mx-1" />
            </button>
            <input
                className="border w-16 border-1 border-gray-200 "
                type="number"
                value={quantity}
                readOnly
            />
            <button
                onClick={onAddQuantity}
                className="flex items-center justify-center px-3 py-2 border border-1 border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-gray-700"
            >
                <CartPlus className="mx-1" />
            </button>
        </div>
    );
}
