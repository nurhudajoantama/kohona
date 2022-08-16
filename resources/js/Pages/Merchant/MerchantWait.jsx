import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";

export default function MerchantWait(props) {
    const { merchant } = props;
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <p>name : {merchant.name}</p>
            <p>description : {merchant.description}</p>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-yellow-500 border-b border-gray-200">
                            {merchant.status_id}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
