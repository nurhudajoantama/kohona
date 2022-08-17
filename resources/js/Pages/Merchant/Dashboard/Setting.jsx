import React, { useEffect, useState } from "react";
import MerchantDashboard from "@/Layouts/Merchant/Dashboard/MerchantDashboard";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { useForm } from "@inertiajs/inertia-react";
import Alert from "@/Components/Alert/Alert";

export default function Setting(props) {
    const { merchant } = props;
    const { data, setData, post, processing, errors, progress } = useForm({
        name: merchant.name,
        description: merchant.description,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const [alerts, setAlerts] = useState([]);
    const submit = (e) => {
        e.preventDefault();
        post(route("merchants.dashboard.settings.update"), {
            onSuccess: () =>
                setAlerts([
                    ...alerts,
                    {
                        color: "green",
                        title: "Success",
                        message: `Successfully update your merchant setting.`,
                    },
                ]),
        });
    };

    return (
        <MerchantDashboard title="Merchant Setting" user={props.auth.user}>
            <Alert alerts={alerts} setAlerts={setAlerts} />
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
