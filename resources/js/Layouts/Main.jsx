import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import React from "react";

export default function Main({ children }) {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5 px-10">{children}</div>
            <Footer />
        </div>
    );
}
