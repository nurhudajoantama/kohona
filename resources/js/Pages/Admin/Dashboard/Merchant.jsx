import React, { useState } from "react";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import { Inertia } from "@inertiajs/inertia";
import Drawer from "@/Components/Dashboard/Drawer/Drawer";

export default function Index(props) {
    const { merchants } = props;

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [selectedMerchantDetails, setSelectedMerchantDetails] =
        useState(null);

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
    const handleDetails = (i) => {
        return (e) => {
            e.preventDefault();
            setSelectedMerchantDetails(merchants[i]);
            setIsOpenDrawer(true);
        };
    };

    return (
        <AdminDashboard title="Merchants" user={props.auth.user}>
            {merchants.map((merchant, i) => (
                <div
                    className="border px-6 py-3 max-w-4xl rounded-lg flex justify-between items-center mb-5"
                    key={i}
                >
                    <div>
                        <h5 className="font-bold text-lg">{merchant.name}</h5>
                        <p className="text-sm">{merchant.description}</p>
                    </div>
                    <div>
                        {merchant.status_id === 1 && (
                            <>
                                <button
                                    className="btn border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 px-4 py-1 rounded-md text-sm"
                                    onClick={handleDetails(i)}
                                >
                                    Detail
                                </button>
                                <button
                                    className="ml-4 btn border border-green-500 hover:bg-green-500 hover:text-white text-green-500 px-4 py-1 rounded-md text-sm"
                                    onClick={handleActive(merchant.id)}
                                >
                                    Accepted
                                </button>
                                <button
                                    className="ml-4 btn border border-red-500 hover:bg-red-500 hover:text-white text-red-500 px-4 py-1 rounded-md text-sm"
                                    onClick={handleReject(merchant.id)}
                                >
                                    Reject
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}
            <Drawer isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer}>
                <div className="px-3 py-2">
                    <h1 className="mb-5 font-bold text-xl">Merchant Detail</h1>
                    <h2 className="font-bold text-xl mb-3">
                        {selectedMerchantDetails?.name}
                    </h2>
                    <p className="">{selectedMerchantDetails?.description}</p>
                </div>
            </Drawer>
        </AdminDashboard>
    );
}