import React, { useEffect, useState } from "react";
import Main from "@/Layouts/Main";
import { Head, useForm } from "@inertiajs/inertia-react";
import Alert from "@/Components/Alert/Alert";
import { Inertia } from "@inertiajs/inertia";
import ProductCartCard from "@/Components/Cart/ProductCartCard";
import SummaryCard from "@/Components/Cart/SummaryCard";

export default function Cart(props) {
    const { delete: d } = useForm();
    const [alerts, setAlerts] = useState([]);
    const [carts, setCarts] = useState(props.carts);
    const [selectedCartsIndex, setSelectedCartsIndex] = useState([]);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(
            selectedCartsIndex.reduce(
                (acc, { merchantIndex, productIndex }) => {
                    return (
                        acc +
                        carts[merchantIndex].products[productIndex].carts[0]
                            .quantity *
                            carts[merchantIndex].products[productIndex].price
                    );
                },
                0
            )
        );
    }, [selectedCartsIndex, carts]);

    const handleCheckboxChange = (merchantIndex, productIndex) => (e) => {
        const isChecked = e.target.checked;
        const newSelectedCartsIndex = [...selectedCartsIndex];
        if (isChecked) {
            newSelectedCartsIndex.push({ merchantIndex, productIndex });
        } else {
            newSelectedCartsIndex.splice(
                newSelectedCartsIndex.indexOf({ merchantIndex, productIndex }),
                1
            );
        }
        setSelectedCartsIndex(newSelectedCartsIndex);
    };

    const handleRemoveQuantity = (merchantIndex, productIndex) => (e) => {
        e.preventDefault();
        const newCarts = [...carts];
        if (carts[merchantIndex].products[productIndex].carts[0].quantity > 1) {
            carts[merchantIndex].products[productIndex].carts[0].quantity -= 1;
        }
        setCarts(newCarts);
    };

    const handleAddQuantity = (merchantIndex, productIndex) => (e) => {
        e.preventDefault();
        const newCarts = [...carts];
        if (
            carts[merchantIndex].products[productIndex].carts[0].quantity <
            carts[merchantIndex].products[productIndex].stock
        ) {
            carts[merchantIndex].products[productIndex].carts[0].quantity += 1;
        }
        setCarts(newCarts);
    };

    const handleRemove = (cart) => {
        return (e) => {
            e.preventDefault();
            d(route("carts.destroy", cart), {
                onSuccess: () => {
                    setAlerts([
                        ...alerts,
                        {
                            color: "red",
                            title: "Success!!",
                            message: `Successfully remove item "${cart.product.name}" form your cart.`,
                        },
                    ]);
                },
            });
        };
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (selectedCartsIndex.length === 0) return;
        const data = selectedCartsIndex.map(
            ({ merchantIndex, productIndex }) => ({
                product_id: carts[merchantIndex].products[productIndex].id,
                quantity:
                    carts[merchantIndex].products[productIndex].carts[0]
                        .quantity,
            })
        );
        Inertia.post(route("carts.checkout"), data);
    };

    return (
        <Main user={props.auth.user}>
            <Head title="Cart" />
            <div className="mb-7 mt-12">
                <h1 className="font-bold text-4xl">Cart</h1>
                <p>Your cart is going full, let's pay... </p>
            </div>
            <Alert alerts={alerts} setAlerts={setAlerts} />
            <div className="grid grid-cols-3 gap-7">
                <div className="col-span-2">
                    {carts.map((merchant, merchantIndex) => (
                        <div
                            key={merchantIndex}
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
                                    key={productIndex}
                                    handleCheckboxChange={handleCheckboxChange(
                                        merchantIndex,
                                        productIndex
                                    )}
                                    handleRemoveQuantity={handleRemoveQuantity(
                                        merchantIndex,
                                        productIndex
                                    )}
                                    handleAddQuantity={handleAddQuantity(
                                        merchantIndex,
                                        productIndex
                                    )}
                                    handleRemove={handleRemove(
                                        product.carts[0]
                                    )}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div>
                    <SummaryCard
                        total={total}
                        handleCheckout={handleCheckout}
                    />
                </div>
            </div>
        </Main>
    );
}
