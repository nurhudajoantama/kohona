import React, { useState, useEffect } from "react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { useAlert } from "react-alert";
import { Inertia } from "@inertiajs/inertia";

export const CartContext = React.createContext();

export const useCart = () => React.useContext(CartContext);

export default function CartProvider({ children }) {
    const props = usePage().props;
    const [carts, setCarts] = useState(props.carts);
    useEffect(() => {
        setCarts(props.carts);
    }, [props.carts]);

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

    const checkboxChange = (merchantIndex, productIndex, isChecked) => {
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

    const removeQuantity = (merchantIndex, productIndex) => {
        const newCarts = [...carts];
        if (carts[merchantIndex].products[productIndex].carts[0].quantity > 1) {
            carts[merchantIndex].products[productIndex].carts[0].quantity -= 1;
        }
        setCarts(newCarts);
    };

    const addQuantity = (merchantIndex, productIndex) => {
        const newCarts = [...carts];
        if (
            carts[merchantIndex].products[productIndex].carts[0].quantity <
            carts[merchantIndex].products[productIndex].stock
        ) {
            carts[merchantIndex].products[productIndex].carts[0].quantity += 1;
        }
        setCarts(newCarts);
    };

    const { delete: d } = useForm();
    const alert = useAlert();
    const removeItem = (cart) => {
        d(route("carts.destroy", cart), {
            onSuccess: () => alert.error("Product has been deleted from cart"),
        });
    };

    const checkout = () => {
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

    const value = {
        carts,
        total,
        selectedCartsIndex,
        checkboxChange,
        removeQuantity,
        addQuantity,
        removeItem,
        checkout,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
