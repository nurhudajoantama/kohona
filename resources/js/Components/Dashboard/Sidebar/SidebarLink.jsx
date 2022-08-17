import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function SidebarLink({ children, to, active }) {
    return (
        <li
            className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                active && "bg-slate-900"
            }`}
        >
            <Link
                href={to}
                className={`block text-slate-200 hover:text-white truncate transition duration-150`}
            >
                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    {children}
                </span>
            </Link>
        </li>
    );
}
