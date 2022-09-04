import React, { useState } from "react";
import Header from "@/Components/Dashboard/Header/Header";
import AdminSidebar from "@/Layouts/Admin/AdminSidebar";
import { Head } from "@inertiajs/inertia-react";

export default function AdminDashboard({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">
            <Head title={title} />

            {/* Sidebar */}
            <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50">
                {/*  Site header */}
                <Header
                    title={title}
                    level="admin"
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <h1 className="text-3xl font-bold mb-7">{title}</h1>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
