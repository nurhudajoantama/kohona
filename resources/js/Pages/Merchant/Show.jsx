import Main from "@/Layouts/Main";
import React from "react";
import ProductList from "@/Components/Product/ProductList";

export default function Show(props) {
    const {
        merchant: { products, ...merchant },
    } = props;
    return (
        <Main user={props.auth.user}>
            <div className="mt-24 mb-12 flex flex-col items-center">
                {merchant.image && (
                    <div className="mb-8">
                        <img
                            className="w-52 h-52 rounded-full ring-2 ring-gray-400"
                            src={`/storage/${merchant.image}`}
                            alt={merchant.name}
                        />
                    </div>
                )}
                <div className="text-center mb-3">
                    <h1 className="font-bold text-4xl mb-2">{merchant.name}</h1>
                    <p className="text-gray-600">{merchant.description}</p>
                </div>
            </div>
            <div>
                <div className="mb-4">
                    <h1 className="font-bold text-2xl ">Product</h1>
                </div>
                <ProductList products={products} />
            </div>
        </Main>
    );
}
