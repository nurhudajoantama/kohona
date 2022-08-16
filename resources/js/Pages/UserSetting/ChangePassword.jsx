import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";

export default function ChangePassword(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    useEffect(() => {
        reset("password", "new_password", "new_password_confirmation");
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("user.setting.change-password.update"));
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User Setting
                </h2>
            }
        >
            <Head title="User Setting" />

            <form onSubmit={submit} className="p-7">
                <div>
                    <Label forInput="password" value="Password" />
                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label forInput="new_password" value="New Password" />
                    <Input
                        type="password"
                        name="new_password"
                        value={data.new_password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                    <InputError
                        message={errors.new_password}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
                    <Label
                        forInput="new_password_confirmation"
                        value="New Password Confirmation"
                    />
                    <Input
                        type="password"
                        name="new_password_confirmation"
                        value={data.new_password_confirmation}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                    <InputError
                        message={errors.new_password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing}>
                        Update
                    </Button>
                </div>
            </form>
        </Authenticated>
    );
}
