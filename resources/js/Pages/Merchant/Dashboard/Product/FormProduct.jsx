import React from "react";
import MerchantDashboard from "@/Layouts/Merchant/Dashboard/MerchantDashboard";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { useAlert } from "react-alert";
import { useForm } from "@inertiajs/inertia-react";
import PriceFormat from "@/Components/Price/PriceFormat";
import { customConfirmAlert } from "@/Utils/customConfirmAlert";
import ButtonFile from "@/Components/ButtonFile";

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

    const alert = useAlert();

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (update) {
            customConfirmAlert({
                title: "Confirm to update",
                message: `Are you sure to update product "${data.name}" ?`,
            }).then(() => {
                post(
                    route("merchants.dashboard.products.update", props.product),
                    {
                        forceFormData: true,
                        replace: true,
                        onSuccess: () =>
                            alert.success(
                                "Product has been updated successfully"
                            ),
                    }
                );
            });
        } else {
            customConfirmAlert({
                title: "Confirm to create",
                message: `Are you sure to create product "${data.name}" ?`,
            }).then(() => {
                post(route("merchants.dashboard.products.store"), {
                    onSuccess: () =>
                        alert.success("Product has been created successfully"),
                });
            });
        }
    };
    return (
        <MerchantDashboard title={`${update ? "Update" : "Create"} Products`}>
            <form onSubmit={submit} encType="multipart/form-data">
                <div className="flex">
                    <div className="mr-12 w-72 h-72">
                        {(data.image || props?.product?.image) && (
                            <img
                                className="w-72 h-72 rounded-xl object-cover border"
                                src={
                                    data.image
                                        ? URL.createObjectURL(data?.image)
                                        : `/storage/${props?.product?.image}`
                                }
                                alt={props?.product?.name}
                            />
                        )}
                        <div className="mt-3">
                            <Label forInput="image" value="Image" />
                            <ButtonFile
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                            >
                                Upload File
                            </ButtonFile>
                            {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                            )}
                            <InputError
                                message={errors.image}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex-auto">
                        <div>
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
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                            <InputError
                                message={errors.slug}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <Label forInput="description" value="Description" />
                            <textarea
                                type="text"
                                name="description"
                                value={data.description}
                                className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                                onChange={onHandleChange}
                                rows="6"
                                required
                            ></textarea>
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex mt-4">
                            <div className="flex-auto mr-4">
                                <Label forInput="price" value="Price  (Rp.)" />
                                <PriceFormat
                                    displayType={"input"}
                                    value={data.price}
                                    className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                                    name="price"
                                    onValueChange={({ value }) =>
                                        setData("price", value)
                                    }
                                />
                                <InputError
                                    message={errors.price}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex-auto">
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
                                <InputError
                                    message={errors.stock}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <Button
                                className="ml-4 bg-yellow-400"
                                processing={processing}
                            >
                                {update ? "Update" : "Create"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </MerchantDashboard>
    );
}
