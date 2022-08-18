import React from "react";

export default function Show(props) {
    const {
        merchant: { products, ...merchant },
    } = props;
    return (
        <div className="m-24">
            <div className="text-center">
                <h1>{merchant.name}</h1>
                <h1>{merchant.description}</h1>
            </div>
            {products.map((product) => (
                <div key={product.id} className="mb-7">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <span>Buy Now</span>
                    <span>Add to Cart</span>
                </div>
            ))}
        </div>
    );
}
