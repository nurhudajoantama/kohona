import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";
import { Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function Index(props) {
    const { merchants } = props;

    const handleActive = (id) => {
        return (e) => {
            e.preventDefault();
            Inertia.post(route("admin.dashboard.merchants.activate", id));
        };
    };
    const handleReject = (id) => {
        return (e) => {
            e.preventDefault();
            Inertia.post(route("admin.dashboard.merchants.reject", id));
        };
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Merchant
                </h2>
            }
        >
            <Head title="Admin Merchant" />

            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {merchants.map((merchant, i) => (
                        <tr key={i}>
                            <td>{merchant.name}</td>
                            <td>{merchant.description}</td>
                            <td>{merchant.status_id}</td>
                            <td>
                                {merchant.status_id === 1 && (
                                    <>
                                        <Button
                                            className="ml-4"
                                            onClick={handleActive(merchant.id)}
                                        >
                                            Make Active
                                        </Button>
                                        <Button
                                            className="ml-4"
                                            onClick={handleReject(merchant.id)}
                                        >
                                            Reject
                                        </Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Authenticated>
    );
}
