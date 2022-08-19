import React from "react";
import ProductCard from "@/Components/Product/ProductCard";

export default function ProductList({ products }) {
    return (
        <div className="grid grid-cols-5 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
