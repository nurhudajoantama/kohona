import React from "react";
import { Link } from "@inertiajs/inertia-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Auth({ children }) {
    return (
        <div className="md:grid grid-cols-2 min-h-screen">
            <div className="hidden md:flex bg-yellow-400 justify-center items-center">
                <div className="w-2/3 h-auto">
                    <img
                        src="/assets/images/login-image.png"
                        alt="login image"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <Link href="/" className="flex items-center mb-7">
                    <ApplicationLogo />
                    <h1 className="ml-3 font-semibold text-3xl">Kohona</h1>
                </Link>
                <div className="w-2/3 border border-gray-300 px-12 py-14 rounded-xl">
                    {children}
                </div>
            </div>
        </div>
    );
}
