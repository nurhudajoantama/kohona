import ProductList from "@/Components/Product/ProductList";
import Main from "@/Layouts/Main";
import React from "react";
import { Link } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination/Pagination";

export default function Index(props) {
    const { search } = props;
    const { products } = props;
    return (
        <Main>
            <div className="mt-12">
                <div className="mb-5">
                    <Link href={route("products.index")}>
                        <h1 className="text-3xl font-semibold text-gray-900">
                            Products
                        </h1>
                    </Link>
                    {search && (
                        <div className="text-gray-600 mt-1">
                            Result from "{search}"
                        </div>
                    )}
                </div>
                {products.data.length > 0 ? (
                    <ProductList products={products.data} />
                ) : (
                    <div className="text-center text-gray-600">
                        No products found,{" "}
                        <Link
                            href="/products"
                            className="underline text-yellow-400"
                        >
                            See products
                        </Link>
                    </div>
                )}
            </div>

            <Pagination
                links={products.links}
                from={products.from}
                to={products.to}
                total={products.total}
                last_page={products.last_page}
            />
        </Main>
    );
}
