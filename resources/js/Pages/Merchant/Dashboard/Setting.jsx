import React, { useEffect, useState } from "react";
import MerchantDashboard from "@/Layouts/Merchant/Dashboard/MerchantDashboard";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { useForm } from "@inertiajs/inertia-react";

export default function Setting(props) {
    const { merchant } = props;
    const { data, setData, post, processing, errors, progress, wasSuccessful } =
        useForm({
            name: merchant.name,
            description: merchant.description,
        });
    const [openSuccessMessage, setOpenSuccessMessage] = useState(false);

    useEffect(() => {
        if (wasSuccessful) {
            setOpenSuccessMessage(true);
        }
    }, [wasSuccessful]);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("merchants.dashboard.settings.update"));
    };

    return (
        <MerchantDashboard title="Merchant Setting" user={props.auth.user}>
            {openSuccessMessage && (
                <div
                    class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-5"
                    role="alert"
                >
                    <strong class="font-bold">Success!!</strong>
                    <span class="block sm:inline ml-2">
                        Successfully Updated Your Merchant Setting.
                    </span>
                    <button
                        class="absolute top-0 bottom-0 right-0 px-4 py-3"
                        onClick={() => setOpenSuccessMessage(false)}
                    >
                        <svg
                            class="fill-current h-6 w-6 text-green-500"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <title>Close</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                    </button>
                </div>
            )}
            <form onSubmit={submit} encType="multipart/form-data">
                <div>
                    {merchant?.image && (
                        <img
                            className="p-1 w-24 h-24 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                            src={`/storage/${merchant.image}`}
                            alt={merchant.name}
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
                        autoComplete="name"
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

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing}>
                        Update
                    </Button>
                </div>
            </form>
        </MerchantDashboard>
    );
}
