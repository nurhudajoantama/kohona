import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Main from "@/Layouts/Main";

export default function MerchantWait(props) {
    const { merchant } = props;
    return (
        <Main user={props.auth.user} title="Merchant Wait">
            <Head title="Dashboard" />
            <div className="pt-7">
                <div className="flex flex-col items-center">
                    <h1 className="capitalize font-bold text-xl">
                        {merchant.name}
                    </h1>
                    <p className="text-gray-600 text-center">
                        {merchant.description}
                    </p>
                </div>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div
                            className={`p-6 rounded-lg border-b border-gray-200 flex justify-center ${
                                merchant.status_id === 1
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            }`}
                        >
                            <div className="font-semibold text-white text-lg">
                                {merchant.status.status}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
}
