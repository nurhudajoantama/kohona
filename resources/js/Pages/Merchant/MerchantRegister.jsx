import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Auth from "@/Layouts/Auth/Auth";

// UPLOAD IMAGE
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("merchants.register.store"));
    };

    return (
        <Auth>
            <Head title="Register" />
            <div className="mb-7">
                <h1 className="font-semibold text-2xl">Welcome</h1>
                <p className="text-gray-600">Welcome, join to our merchant.</p>
            </div>
            <form onSubmit={submit}>
                <div>
                    <Label forInput="name" value="Merchant Name" />
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
                </div>

                <div className="mt-4">
                    <Label
                        forInput="description"
                        value="Merchant Description"
                    />
                    <textarea
                        type="text"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        handleChange={onHandleChange}
                        required
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button
                        className="w-full bg-yellow-400 text-white flex justify-center py-3"
                        processing={processing}
                    >
                        Register
                    </Button>
                </div>
            </form>
        </Auth>
    );
}
