import React, { useState } from "react";
import MerchantDashboard from "@/Layouts/Merchant/Dashboard/MerchantDashboard";
import { Link, useForm } from "@inertiajs/inertia-react";
import PriceFormat from "@/Components/Price/PriceFormat";
import Pagination from "@/Components/Pagination/Pagination";
import { useAlert } from "react-alert";
import { customConfirmAlert } from "@/Utils/customConfirmAlert";

export default function Index(props) {
    const { products } = props;

    const { delete: d } = useForm();

    const alert = useAlert();

    const handleDelete = (product) => {
        return (e) => {
            e.preventDefault();

            customConfirmAlert({
                title: "Confirm to delete",
                message: `Are you sure to delete product "${product.name}" ?`,
            }).then(() => {
                d(route("merchants.dashboard.products.destroy", product), {
                    onSuccess: () =>
                        alert.error("Product has been deleted successfully"),
                });
            });
        };
    };
    return (
        <MerchantDashboard title="Merchant Products">
            <div>
                <Link
                    href={route("merchants.dashboard.products.create")}
                    as="button"
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-sm"
                >
                    Create
                </Link>
            </div>
            {products.data.map((product) => (
                <div
                    className="border px-6 py-3 max-w-3xl rounded-lg flex justify-between items-center mb-5"
                    key={product.id}
                >
                    <div>
                        {product.image && (
                            <img
                                className="p-1 w-24 h-24 rounded-md"
                                src={`/storage/${product.image}`}
                                alt={product.name}
                            />
                        )}
                        <h1 className="font-md font-bold">{product.name}</h1>
                        <p>{product.description}</p>
                        <PriceFormat
                            value={product.price}
                            renderText={(value, props) => (
                                <div {...props}>price : {value}</div>
                            )}
                        />
                        <p>stock : {product.stock}</p>
                    </div>
                    <div>
                        <Link
                            className="mr-4 btn border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 px-4 py-1 rounded-md text-sm"
                            href={route(
                                "merchants.dashboard.products.edit",
                                product
                            )}
                        >
                            Udpate
                        </Link>
                        <button
                            onClick={handleDelete(product)}
                            className="btn border border-red-500 hover:bg-red-500 hover:text-white text-red-500 px-4 py-1 rounded-md text-sm"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            <Pagination
                links={products.links}
                from={products.from}
                to={products.to}
                total={products.total}
                last_page={products.last_page}
            />
        </MerchantDashboard>
    );
}
