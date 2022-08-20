import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function SidebarLink({ children, to, active, Icon }) {
    return (
        <li
            className={`px-3 py-3.5 rounded-lg mb-0.5 last:mb-0 ${
                active && "bg-yellow-400"
            }`}
        >
            <Link
                href={to}
                className={`block truncate transition duration-150 ${
                    active ? "text-white" : "text-yellow-400"
                }`}
            >
                <div className="flex items-center">
                    {Icon && <Icon className="shrink-0 h-6 w-6" />}
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        {children}
                    </span>
                </div>
            </Link>
        </li>
    );
}
