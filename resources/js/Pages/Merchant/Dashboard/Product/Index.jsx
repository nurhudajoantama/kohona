import React from "react";
import MerchantDashboard from "@/Layouts/Merchant/Dashboard/MerchantDashboard";
import { Link, useForm } from "@inertiajs/inertia-react";
import PriceFormat from "@/Components/Price/PriceFormat";
import Pagination from "@/Components/Pagination/Pagination";
import { useAlert } from "react-alert";
import { customConfirmAlert } from "@/Utils/customConfirmAlert";
import moment from "moment/moment";

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
                    className="btn bg-yellow-400 text-white px-5 py-2 rounded-md"
                >
                    Create
                </Link>
            </div>
            <div className="mt-5">
                {products.data.map((product) => (
                    <div
                        className="border p-4 bg-white shadow-sm rounded-lg flex justify-between items-center mb-5"
                        key={product.id}
                    >
                        <div>
                            {product.image && (
                                <img
                                    className="w-32 h-32 rounded-xl border"
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                />
                            )}
                        </div>
                        <div className="flex flex-col justify-between flex-auto ml-5">
                            <h1 className="text-xl font-semibold capitalize mb-5">
                                {product.name}
                            </h1>
                            <PriceFormat
                                className="text-xl font-semibold"
                                value={product.price}
                            />
                            <p className="text-xs text-gray-600 mt-1">
                                {moment(product.updated_at).format(
                                    "DD MMMM YYYY"
                                )}
                            </p>
                        </div>
                        <div className="flex">
                            <Link
                                className="mr-4 btn border bg-green-600 text-white px-5 py-2 rounded-lg text-sm"
                                href={route(
                                    "merchants.dashboard.products.edit",
                                    product
                                )}
                            >
                                Udpate
                            </Link>
                            <button
                                onClick={handleDelete(product)}
                                className="btn border bg-red-500 text-white px-5 py-2 rounded-lg text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
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
