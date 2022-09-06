import React, { useState } from "react";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import Pagination from "@/Components/Pagination/Pagination";
import UserListCard from "@/Components/Admin/UserListCard";
import UserDetail from "@/Components/Admin/UserDetail";
import { useForm } from "@inertiajs/inertia-react";

export default function User(props) {
    const { users } = props;
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);

    const params = new URLSearchParams(window.location.search);
    const { data, setData, get } = useForm({
        name: params.get("name") || undefined,
        email: params.get("email") || undefined,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value || undefined);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route("admin.dashboard.users.index"));
    };

    return (
        <AdminDashboard title="User">
            <form action="" className="flex items-end" onSubmit={handleSubmit}>
                <div className="flex-auto">
                    <label htmlFor="name" className="text-sm text-gray-700">
                        Name
                    </label>
                    <input
                        className="block w-full border-gray-200 rounded-md shadow-sm px-3 py-2"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="name"
                        value={data.name ?? ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="ml-2 flex-auto">
                    <label htmlFor="email" className="text-sm text-gray-700">
                        Email
                    </label>
                    <input
                        className="block w-full border-gray-200 rounded-md shadow-sm px-3 py-2"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="email"
                        value={data.email ?? ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="ml-2">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Search
                    </button>
                </div>
            </form>

            <div className="mt-7 grid grid-cols-5 gap-7">
                <div className="col-span-3">
                    {users.data.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => setSelectedUserDetails(user)}
                        >
                            <UserListCard user={user} />
                        </div>
                    ))}
                </div>
                <div className="col-span-2">
                    {selectedUserDetails && (
                        <UserDetail user={selectedUserDetails} />
                    )}
                </div>
            </div>
            <Pagination
                links={users.links}
                from={users.from}
                to={users.to}
                total={users.total}
                last_page={users.last_page}
            />
        </AdminDashboard>
    );
}
