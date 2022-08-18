import Main from "@/Layouts/Main";
import React from "react";
import NumberFormat from "react-number-format";
import { Icon } from "@iconify/react";
import shippingBox01 from "@iconify/icons-akar-icons/shipping-box-01";

export default function Show(props) {
    const {
        merchant: { products, ...merchant },
    } = props;
    return (
        <Main user={props.auth.user}>
            <div className="m-24 flex flex-col items-center">
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
            <div className="grid grid-cols-5 gap-7">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="mb-4 rounded-sm ring-1 ring-gray-200 overflow-hidden"
                    >
                        <div className="mb-5">
                            {product.image && (
                                <img
                                    className="w-full h-48 object-cover"
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                />
                            )}
                        </div>
                        <div className="px-3 mb-3">
                            <h1 className="capitalize mb-1">{product.name}</h1>
                            <NumberFormat
                                value={product.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp. "}
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
                                <Icon
                                    icon={shippingBox01}
                                    className="mr-1 text-yellow-300 text-sm"
                                />
                                <span className="text-xs">5 Terjual</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Main>
    );
}
