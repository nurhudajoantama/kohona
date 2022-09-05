import React, { useEffect, useState } from "react";
import MerchantDashboard from "@/Layouts/Merchant/Dashboard/MerchantDashboard";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { useForm } from "@inertiajs/inertia-react";
import { useAlert } from "react-alert";
import { customConfirmAlert } from "@/Utils/customConfirmAlert";
import ButtonFile from "@/Components/ButtonFile";

export default function Setting(props) {
    const { merchant } = props;
    const { data, setData, post, processing, errors, progress } = useForm({
        name: merchant.name,
        description: merchant.description,
    });

    const alert = useAlert();

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        customConfirmAlert({
            title: "Confirm to update",
            message: `Are you sure to update merchant ?`,
        }).then(() => {
            post(route("merchants.dashboard.settings.update"), {
                onSuccess: () =>
                    alert.success("Merchant has been updated successfully"),
            });
        });
    };

    return (
        <MerchantDashboard title="Merchant Setting">
            <form onSubmit={submit} encType="multipart/form-data">
                <div className="flex">
                    <div className="mr-12 w-72 h-72">
                        {(data.image || merchant?.image) && (
                            <img
                                className="w-72 h-72 rounded-xl object-cover border"
                                src={
                                    data.image
                                        ? URL.createObjectURL(data?.image)
                                        : `/storage/${merchant?.image}`
                                }
                                alt={merchant.name}
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
                                autoComplete="name"
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
                                name="description"
                                className="mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm block w-full"
                                rows={7}
                                onChange={onHandleChange}
                                value={data.description}
                            ></textarea>
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <Button
                                className="ml-4 bg-yellow-400"
                                processing={processing}
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </MerchantDashboard>
    );
}
