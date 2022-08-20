import React, { useState } from "react";
import MerchantDashboard from "@/Layouts/Merchant/Dashboard/MerchantDashboard";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import Alert from "@/Components/Alert/Alert";
import { useForm } from "@inertiajs/inertia-react";
import PriceFormat from "@/Components/Price/PriceFormat";

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
            post(route("merchants.dashboard.products.update", props.product), {
                forceFormData: true,
                replace: true,
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
                <div>
                    {update && !data.image && props?.product?.image && (
                        <img
                            className="p-1 w-24 h-24 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                            src={`/storage/${props?.product.image}`}
                            alt={props?.product.name}
                        />
                    )}
                    <Label forInput="image" value="Image" />
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => setData("image", e.target.files[0])}
                    />
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                    <InputError message={errors.image} className="mt-2" />
                </div>

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
                    <textarea
                        type="text"
                        name="description"
                        value={data.description}
                        className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                        onChange={onHandleChange}
                        required
                    ></textarea>
                    <InputError message={errors.description} className="mt-2" />
                </div>
                <div className="mt-4">
                    <Label forInput="price" value="Price  (Rp.)" />
                    <PriceFormat
                        displayType={"input"}
                        value={data.price}
                        className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                        name="price"
                        onValueChange={({ value }) => setData("price", value)}
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
