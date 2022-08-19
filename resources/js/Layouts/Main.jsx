import Navbar from "@/Components/Navbar/Navbar";
import React from "react";

export default function Main({ children, user }) {
    return (
        <div className="min-h-screen">
            <Navbar user={user} />
            <div className="max-w-7xl mx-auto mt-5 px-10">{children}</div>
        </div>
    );
}
