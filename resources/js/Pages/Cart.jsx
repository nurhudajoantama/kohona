import React, { useEffect, useState } from "react";
import Main from "@/Layouts/Main";
import { Head } from "@inertiajs/inertia-react";
import SummaryCard from "@/Components/Cart/SummaryCard";
import ListProductCart from "@/Components/Cart/ListProductCart";
import CartProvider from "@/Context/CartProvider";

export default function Cart() {
    return (
        <CartProvider>
            <Main>
                <Head title="Cart" />
                <div className="mb-7 mt-12">
                    <h1 className="font-bold text-4xl">Cart</h1>
                    <p>Your cart is going full, let's pay... </p>
                </div>

                <div className="grid grid-cols-3 gap-7">
                    <div className="col-span-2">
                        <ListProductCart />
                    </div>
                    <div>
                        <SummaryCard />
                    </div>
                </div>
            </Main>
        </CartProvider>
    );
}
