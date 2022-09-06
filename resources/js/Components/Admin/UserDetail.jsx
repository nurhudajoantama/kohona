import { customConfirmAlert } from "@/Utils/customConfirmAlert";
import React, { useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import InputError from "../InputError";
import { useAlert } from "react-alert";

export default function UserDetail({ user }) {
    const { data, setData, post, errors } = useForm({
        name: user.name,
        email: user.email,
        password: "",
    });

    useEffect(() => {
        setData({
            name: user.name,
            email: user.email,
            password: "",
        });
    }, [user]);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const alert = useAlert();
    const handleSubmit = (e) => {
        e.preventDefault();
        customConfirmAlert({
            title: "Confirm to update",
            message: `Are you sure to update this user '${user.name}' ?`,
        }).then(() => {
            post(route("admin.dashboard.users.update", user), {
                onSuccess: () =>
                    alert.success(
                        `User ${user.name} has been updated successfully`
                    ),
            });
        });
    };

    return (
        <div className="px-7 py-5 bg-white shadow-sm border rounded-md">
            <h3 className="mb-2 text-lg font-semibold">
                Change User Configuration
            </h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="text-sm text-gray-700">
                        Name
                    </label>
                    <input
                        className="block w-full border-gray-200 rounded-md shadow-sm px-3 py-2"
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        onChange={handleChange}
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="mt-3">
                    <label htmlFor="email" className="text-sm text-gray-700">
                        Email
                    </label>
                    <input
                        className="block w-full border-gray-200 rounded-md shadow-sm px-3 py-2"
                        type="text"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={handleChange}
                    />
                    <InputError message={errors.email} />
                </div>
                <div className="mt-3">
                    <label htmlFor="password" className="text-sm text-gray-700">
                        Password
                    </label>
                    <input
                        className="block w-full border-gray-200 rounded-md shadow-sm px-3 py-2"
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={handleChange}
                    />
                    <InputError message={errors.password} />
                </div>
                <div className="mt-3">
                    <button
                        type="submit"
                        className="border border-yellow-400 text-yellow-400 rounded-md px-5 py-2"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
