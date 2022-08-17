import React from "react";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import Button from "@/Components/Button";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function adminTokens(props) {
    const { adminTokens } = props;

    const { post, processing } = useForm();
    const submitGenerate = (e) => {
        e.preventDefault();
        post(route("admin.dashboard.admin-tokens.generate"));
    };

    const handleDelete = (id) => {
        return (e) => {
            e.preventDefault();
            Inertia.delete(route("admin.dashboard.admin-tokens.destroy", id));
        };
    };

    return (
        <AdminDashboard title="Admin Token" user={props.auth.user}>
            <form onSubmit={submitGenerate}>
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-sm">
                    Generate Token
                </button>
            </form>

            <div className="mt-7">
                {adminTokens.map((token, i) => (
                    <div
                        className="border px-6 py-3 max-w-3xl rounded-lg flex justify-between items-center mb-5"
                        key={i}
                    >
                        <div>
                            <p className="underline">{token.token}</p>
                            <span className="font-bold text-sm">
                                Created By {token.user.name}
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
            </div>
        </AdminDashboard>
    );
}
