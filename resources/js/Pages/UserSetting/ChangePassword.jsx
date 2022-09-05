import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { Head, useForm } from "@inertiajs/inertia-react";
import Setting from "@/Layouts/Setting";
import { customConfirmAlert } from "@/Utils/customConfirmAlert";
import { useAlert } from "react-alert";

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

    const alert = useAlert();
    const submit = (e) => {
        e.preventDefault();
        customConfirmAlert({
            title: "Confirm to change password",
            message: "Are you sure to change your password ?",
        }).then(() => {
            post(route("user.setting.change-password.update"), {
                onSuccess: () => alert.success("Password changed successfully"),
            });
        });
    };

    return (
        <Setting>
            <Head title="User Setting" />

            <form onSubmit={submit}>
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

                <div className="mt-4">
                    <Button processing={processing} className="bg-yellow-400">
                        Update
                    </Button>
                </div>
            </form>
        </Setting>
    );
}
