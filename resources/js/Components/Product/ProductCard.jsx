import React from "react";
import { Link } from "@inertiajs/inertia-react";
import ShippingBox01 from "../Icon/ShippingBox01";
import PriceFormat from "../Price/PriceFormat";

export default function ProductCard({ product }) {
    return (
        <Link href={`/products/${product.slug}`}>
            <div
                key={product.id}
                className="relative mb-4 rounded-md border border-1 border-gray-200 overflow-hidden hover:ring-2 ring-yellow-200 pb-5"
            >
                {product.stock < 1 && (
                    <div>
                        <section className="absolute inset-0 bg-gray-500 opacity-50 flex justify-center items-center"></section>
                        <div className="absolute inset-0 flex justify-center items-center">
                            <p className="font-semibold">Out Of Stock</p>
                        </div>
                    </div>
                )}
                <div className="mb-5 border-b border-b-gray-200">
                    {product.image && (
                        <img
                            className="w-full h-48 object-cover"
                            src={`/storage/${product.image}`}
                            alt={product.name}
                        />
                    )}
                </div>
                <div className="px-3">
                    <h1 className="capitalize mb-1 text-sm">{product.name}</h1>
                    <PriceFormat
                        value={product.price}
                        renderText={(value, props) => (
                            <span
                                className="block font-semibold text-xl mb-5"
                                {...props}
                            >
                                {value}
                            </span>
                        )}
                    />

                    <div className="flex items-center">
                        <ShippingBox01 className="mr-1 text-yellow-300 text-sm" />
                        <span className="text-xs">{product.sold} Sold</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
