import React, { useState } from "react";
import MerchantDashboard from "@/Layouts/Merchant/Dashboard/MerchantDashboard";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import Alert from "@/Components/Alert/Alert";
import { useForm } from "@inertiajs/inertia-react";
import CurrencyInput from "react-currency-input-field";

export default function FormProduct(props) {
    const { update = false } = props;

    const { data, setData, post, processing, errors, progress, put } = useForm(
        update
            ? {
                  name: props.product.name,
                  description: props.product.description,
                  price: props.product.price,
                  stock: props.product.stock,
              }
            : {
                  name: "",
                  description: "",
                  price: 0,
                  stock: 1,
              }
    );

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (update) {
            put(route("merchants.dashboard.products.update", props.product), {
                onSuccess: () =>
                    setAlerts([
                        ...alerts,
                        {
                            color: "green",
                            title: "Success",
                            message: `Successfully update your product.`,
                        },
                    ]),
            });
        } else {
            post(route("merchants.dashboard.products.store"));
        }
    };

    const [alerts, setAlerts] = useState([]);
    return (
        <MerchantDashboard
            title={`${update ? "Update" : "Create"} Products`}
            user={props.auth.user}
        >
            <Alert alerts={alerts} setAlerts={setAlerts} />

            <form onSubmit={submit} encType="multipart/form-data">
                <div className="mt-4">
                    <Label forInput="name" value="Name" />
                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                    <InputError message={errors.slug} className="mt-2" />
                </div>
                <div className="mt-4">
                    <Label forInput="description" value="Description" />
                    <Input
                        type="text"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>
                <div className="mt-4">
                    <Label forInput="price" value="Price  (Rp.)" />
                    <CurrencyInput
                        name="price"
                        value={data.price}
                        onValueChange={(value, name) => setData(name, value)}
                        className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                        required
                        autoComplete="off"
                    />
                    <InputError message={errors.price} className="mt-2" />
                </div>
                <div className="mt-4">
                    <Label forInput="stock" value="Stock" />
                    <Input
                        type="number"
                        name="stock"
                        value={data.stock}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        autoComplete="off"
                        required
                    />
                    <InputError message={errors.stock} className="mt-2" />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing}>
                        {update ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </MerchantDashboard>
    );
}
