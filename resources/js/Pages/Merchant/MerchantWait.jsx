import React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function MerchantWait(props) {
    const { merchant } = props;
    return (
        <div className="md:grid grid-cols-2 min-h-screen">
            <Head title="Merchant" />
            <div className="hidden md:flex bg-yellow-400 justify-center items-center">
                <div className="w-2/3 h-auto">
                    <img
                        src="/assets/images/merchant-wait.png"
                        alt="login image"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <Link href="/" className="flex items-center mb-7">
                    <ApplicationLogo className="text-yellow-400" />
                    <h1 className="ml-3 font-semibold text-3xl">Kohona</h1>
                </Link>
                <div
                    className="border border-gray-300 rounded-xl px-20 py-12"
                    style={{ width: "515px" }}
                >
                    <h1 className="font-semibold text-3xl text-center">
                        Merchant Status
                    </h1>
                    <div className="mt-7 flex justify-between items-center text-lg">
                        <p className="text-gray-600">Status :</p>
                        <div
                            className={`border-2 rounded-full px-5 py-2 ${
                                merchant.status_id === 1
                                    ? "border-yellow-400 text-yellow-400"
                                    : "border-red-400 text-red-400"
                            }`}
                        >
                            <p className="capitalize">
                                {merchant.status.status}
                            </p>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-400">
                        {merchant.status_id === 1
                            ? "Wait for admin to accepted the request"
                            : "Sorry!, Admin doesn't accept your Merchant, Please try again."}
                    </p>
                </div>
            </div>
        </div>
    );
}
