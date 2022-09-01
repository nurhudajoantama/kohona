import React, { useState } from "react";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import { useForm } from "@inertiajs/inertia-react";
import Alert from "@/Components/Alert/Alert";
import Pagination from "@/Components/Pagination/Pagination";
import AdminTokenListCard from "@/Components/Admin/AdminTokenListCard";

export default function adminTokens(props) {
    const { adminTokens } = props;

    const { post, delete: d } = useForm();

    const [alerts, setAlerts] = useState([]);

    const handleGenerate = (e) => {
        e.preventDefault();
        post(route("admin.dashboard.admin-tokens.generate"), {
            onSuccess: () =>
                setAlerts([
                    {
                        color: "green",
                        title: "Success!!",
                        message: "Successfully generated admin token.",
                    },
                    ...alerts,
                ]),
        });
    };

    const handleDelete = (id) => {
        return (e) => {
            e.preventDefault();
            d(route("admin.dashboard.admin-tokens.destroy", id), {
                onSuccess: () =>
                    setAlerts([
                        {
                            color: "red",
                            title: "Success!!",
                            message: "Successfully deleted admin token.",
                        },
                        ...alerts,
                    ]),
            });
        };
    };

    const handleOnCopy = () =>
        setAlerts([
            {
                color: "green",
                title: "Success!!",
                message: "Successfully copied token.",
            },
            ...alerts,
        ]);

    return (
        <AdminDashboard title="Admin Token" user={props.auth.user}>
            <Alert alerts={alerts} setAlerts={setAlerts} />
            <form onSubmit={handleGenerate}>
                <button className="btn bg-yellow-400  text-white px-5 py-2 rounded-sm">
                    Generate Token
                </button>
            </form>

            <div className="mt-7">
                {adminTokens.data.map((token) => (
                    <AdminTokenListCard
                        key={token.id}
                        token={token}
                        handleDelete={handleDelete}
                        handleOnCopy={handleOnCopy}
                    />
                ))}
                <Pagination
                    links={adminTokens.links}
                    from={adminTokens.from}
                    to={adminTokens.to}
                    total={adminTokens.total}
                    last_page={adminTokens.last_page}
                />
            </div>
        </AdminDashboard>
    );
}
