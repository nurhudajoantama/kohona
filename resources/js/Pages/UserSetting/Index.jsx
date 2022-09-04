import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Label from "@/Components/Label";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";
import Setting from "@/Layouts/Setting";

export default function Index(props) {
    const { user } = props;
    const { data, setData, post, processing, errors } = useForm({
        name: user.name,
        email: user.email,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("user.setting.update"));
    };

    return (
        <Setting>
            <Head title="User Setting" />
            <form onSubmit={submit}>
                <div>
                    <Label forInput="name" value="Name" />
                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label forInput="email" value="Email" />
                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Button processing={processing}>Update</Button>
                </div>
            </form>
        </Setting>
    );
}
