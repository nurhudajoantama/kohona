import React, { useState } from "react";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import { useForm } from "@inertiajs/inertia-react";
import Alert from "@/Components/Alert/Alert";
import moment from "moment";
import Pagination from "@/Components/Pagination/Pagination";
import CopyToClipboard from "react-copy-to-clipboard";
import CopyIcon from "@/Components/Icon/CopyIcon";

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
                {adminTokens.data.map((token, i) => (
                    <div
                        className="border p-3 rounded-md flex justify-between items-center mb-5"
                        key={i}
                    >
                        <div>
                            <div className="border bg-white px-3 py-1 rounded-sm">
                                {token.token}
                            </div>
                            <span className="text-xs text-gray-400">
                                Created By {token.user.name} on{" "}
                                {moment(token.created_at).format(
                                    "DD MMMM YYYY, HH:mm:ss"
                                )}
                            </span>
                        </div>
                        <div className="flex">
                            <CopyToClipboard
                                text={token.token}
                                onCopy={handleOnCopy}
                            >
                                <button className="border border-gray-400 text-gray-400 px-4 py-3 rounded-md">
                                    <CopyIcon />
                                </button>
                            </CopyToClipboard>
                            <button
                                className="ml-2 border bg-red-500 text-white px-7 py-3 rounded-md text-sm"
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
