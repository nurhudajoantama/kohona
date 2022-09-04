import { useCart } from "@/Context/CartProvider";
import React from "react";
import ProductCartCard from "./ProductCartCard";

export default function ListProductCart() {
    const { carts } = useCart();
    return (
        <div>
            {carts.map((merchant, merchantIndex) => (
                <div
                    key={merchant.id}
                    className="border-b-2 border-gray-300 mb-3 pb-3"
                >
                    <div className="mb-3">
                        <h1 className="text-lg font-semibold">
                            {merchant.name}
                        </h1>
                    </div>
                    {merchant.products.map((product, productIndex) => (
                        <ProductCartCard
                            product={product}
                            key={product.id}
                            productIndex={productIndex}
                            merchantIndex={merchantIndex}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
