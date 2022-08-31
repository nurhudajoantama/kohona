import React, { useState } from "react";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import { useForm } from "@inertiajs/inertia-react";
import Alert from "@/Components/Alert/Alert";
import Pagination from "@/Components/Pagination/Pagination";

export default function Index(props) {
    const { merchants } = props;
    const [selectedMerchantDetails, setSelectedMerchantDetails] =
        useState(null);

    const { post } = useForm();
    const [alerts, setAlerts] = useState([]);

    const handleActive = ({ name, ...merchant }) => {
        return (e) => {
            e.preventDefault();
            post(route("admin.dashboard.merchants.activate", merchant), {
                onSuccess: () =>
                    setAlerts([
                        ...alerts,
                        {
                            color: "green",
                            title: "Success!!",
                            message: `Successfully activate ${name} merchant.`,
                        },
                    ]),
            });
        };
    };
    const handleReject = ({ name, ...merchant }) => {
        return (e) => {
            e.preventDefault();
            post(route("admin.dashboard.merchants.reject", merchant), {
                onSuccess: () =>
                    setAlerts([
                        ...alerts,
                        {
                            color: "red",
                            title: "Success!!",
                            message: `Successfully rejected ${name} merchant.`,
                        },
                    ]),
            });
        };
    };
    const handleDetails = (i) => {
        return (e) => {
            e.preventDefault();
            setSelectedMerchantDetails(merchants.data[i]);
        };
    };

    return (
        <AdminDashboard title="Merchants" user={props.auth.user}>
            <Alert alerts={alerts} setAlerts={setAlerts} />
            <div className="grid grid-cols-5 gap-7">
                <div className="col-span-3">
                    {merchants.data.map((merchant, i) => (
                        <div
                            className="border px-6 py-3 rounded-md flex justify-between items-center mb-5"
                            key={i}
                        >
                            <div>
                                <h5 className="font-bold text-lg">
                                    {merchant.name}
                                </h5>
                                <p className="text-sm">
                                    {merchant.description}
                                </p>
                            </div>
                            <div>
                                {merchant.status_id === 1 ? (
                                    <>
                                        <button
                                            className="btn border bg-blue-500 text-white px-4 py-1 rounded-md text-sm"
                                            onClick={handleDetails(i)}
                                        >
                                            Detail
                                        </button>
                                        <button
                                            className="ml-4 btn border bg-green-500 text-white px-4 py-1 rounded-md text-sm"
                                            onClick={handleActive(merchant)}
                                        >
                                            Accepted
                                        </button>
                                        <button
                                            className="ml-4 btn border bg-red-500 text-white px-4 py-1 rounded-md text-sm"
                                            onClick={handleReject(merchant)}
                                        >
                                            Reject
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex items-center">
                                        <span
                                            className={`capitalize ${
                                                merchant.status.id === 1
                                                    ? "text-yellow-400"
                                                    : merchant.status.id === 2
                                                    ? "text-green-400"
                                                    : merchant.status.id === 3
                                                    ? "text-red-400"
                                                    : ""
                                            }`}
                                        >
                                            {merchant.status.status}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-span-2">
                    {selectedMerchantDetails && (
                        <div className="px-7 py-5 border rounded-md">
                            <h1 className="text-xl font-bold mb-2">
                                {selectedMerchantDetails.name}
                            </h1>
                            <span className="text-yellow-400 font-semibold text-lg">
                                Deskripsi
                            </span>
                            <p>{selectedMerchantDetails.description}</p>
                        </div>
                    )}
                </div>
            </div>
            <Pagination
                links={merchants.links}
                from={merchants.from}
                to={merchants.to}
                total={merchants.total}
                last_page={merchants.last_page}
            />
        </AdminDashboard>
    );
}
