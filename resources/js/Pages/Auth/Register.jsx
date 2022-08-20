import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Auth from "@/Layouts/Auth/Auth";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        code: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation", "code");
        };
    }, []);

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

        post(route("register"));
    };

    return (
        <Auth>
            <Head title="Register" />

            <div className="mb-7">
                <h1 className="font-semibold text-2xl">Register</h1>
                <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link className="underline" href="/login">
                        Log in
                    </Link>
                </p>
            </div>

            <form onSubmit={submit}>
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

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label forInput="email" value="Email" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label
                        forInput="password_confirmation"
                        value="Confirm Password"
                    />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
                    <Label forInput="code" value="Code (Optional)" />

                    <Input
                        type="text"
                        name="code"
                        value={data.code}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.code} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-5">
                    <Button
                        className="w-full flex justify-center bg-yellow-400 py-3"
                        processing={processing}
                    >
                        Register
                    </Button>
                </div>
            </form>
            <div className="flex justify-center mt-5">
                <p className="text-center">
                    Dengan mendaftar, saya menyetujui{" "}
                    <span className="text-yellow-400">
                        Syarat dan Ketentuan{" "}
                    </span>{" "}
                    serta{" "}
                    <span className="text-yellow-400">Kebijakan Privasi</span>
                </p>
            </div>
        </Auth>
    );
}
