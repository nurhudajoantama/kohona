import React from "react";
import { useAlert } from "react-alert";
import { useForm } from "@inertiajs/inertia-react";
import { customConfirmAlert } from "@/Utils/customConfirmAlert";

export default function MerchantListCard({ merchant, handleDetails }) {
    const { post } = useForm();
    const alert = useAlert();

    const handleActive = (e) => {
        e.preventDefault();
        customConfirmAlert({
            title: "Confirm to activate",
            message: `Are you sure to activate merchant "${merchant.name}" ?`,
        }).then(() => {
            post(route("admin.dashboard.merchants.activate", merchant), {
                onSuccess: () =>
                    alert.success(
                        `Successfully activate ${merchant.name} merchant.`
                    ),
            });
        });
    };

    const handleReject = (e) => {
        e.preventDefault();
        customConfirmAlert({
            title: "Confirm to reject",
            message: `Are you sure to reject merchant "${merchant.name}" ?`,
        }).then(() => {
            post(route("admin.dashboard.merchants.reject", merchant), {
                onSuccess: () =>
                    alert.error(
                        `Successfully rejected ${merchant.name} merchant.`
                    ),
            });
        });
    };
    return (
        <div className="border px-6 py-3 rounded-md flex justify-between items-center mb-5">
            <div>
                <h5 className="font-bold text-lg">{merchant.name}</h5>
                <p className="text-sm">{merchant.description}</p>
            </div>
            <div>
                {merchant.status_id === 1 ? (
                    <>
                        {handleDetails && (
                            <button
                                className="btn border bg-blue-500 text-white px-4 py-1 rounded-md text-sm"
                                onClick={handleDetails(merchant)}
                            >
                                Detail
                            </button>
                        )}
                        <button
                            className="ml-4 btn border bg-green-500 text-white px-4 py-1 rounded-md text-sm"
                            onClick={handleActive}
                        >
                            Accepted
                        </button>
                        <button
                            className="ml-4 btn border bg-red-500 text-white px-4 py-1 rounded-md text-sm"
                            onClick={handleReject}
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
    );
}
