import React, { useEffect, useState } from "react";
import PriceFormat from "@/Components/Price/PriceFormat";

export default function SummaryCard({ total, handleCheckout }) {
    return (
        <div className="py-3 border border-gray-100 rounded-lg shadow-xl">
            <div className="px-5 pb-3 border-b border-gray-200">
                <h3 className="font-bold text-2xl">Shopping Summary</h3>
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
    );
}
