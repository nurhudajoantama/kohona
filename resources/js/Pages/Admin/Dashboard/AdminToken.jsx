import React, { useState } from "react";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import { useForm } from "@inertiajs/inertia-react";
import Alert from "@/Components/Alert/Alert";
import moment from "moment";
import Pagination from "@/Components/Pagination/Pagination";

export default function adminTokens(props) {
    const { adminTokens } = props;

    const { post, delete: d } = useForm();

    const [alerts, setAlerts] = useState([]);

    const handleGenerate = (e) => {
        e.preventDefault();
        post(route("admin.dashboard.admin-tokens.generate"), {
            onSuccess: () =>
                setAlerts([
                    ...alerts,
                    {
                        color: "green",
                        title: "Success!!",
                        message: "Successfully generated admin token.",
                    },
                ]),
        });
    };

    const handleDelete = (id) => {
        return (e) => {
            e.preventDefault();
            d(route("admin.dashboard.admin-tokens.destroy", id), {
                onSuccess: () =>
                    setAlerts([
                        ...alerts,
                        {
                            color: "red",
                            title: "Success!!",
                            message: "Successfully deleted admin token.",
                        },
                    ]),
            });
        };
    };

    return (
        <AdminDashboard title="Admin Token" user={props.auth.user}>
            <Alert alerts={alerts} setAlerts={setAlerts} />
            <form onSubmit={handleGenerate}>
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-sm">
                    Generate Token
                </button>
            </form>

            <div className="mt-7">
                {adminTokens.data.map((token, i) => (
                    <div
                        className="border px-6 py-3 max-w-3xl rounded-lg flex justify-between items-center mb-5"
                        key={i}
                    >
                        <div>
                            <p className="underline">{token.token}</p>
                            <span className="font-bold text-sm">
                                Created By {token.user.name} on{" "}
                                {moment(token.created_at).format(
                                    "DD MMMM YYYY, HH:mm:ss"
                                )}
                            </span>
                        </div>
                        <div>
                            <button
                                className="btn border border-red-500 hover:bg-red-500 hover:text-white text-red-500 px-4 py-1 rounded-md text-sm"
                                onClick={handleDelete(token.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
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
