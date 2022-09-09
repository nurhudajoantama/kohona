import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import Main from "@/Layouts/Main";
import React from "react";

export default function ErrorPage({ status, user }) {
    const title = {
        503: "Service Unavailable",
        500: "Server Error",
        404: "Page Not Found",
        403: "Forbidden",
    }[status];

    const description = {
        503: "Sorry, we are doing some maintenance. Please check back soon.",
        500: "Whoops, something went wrong on our servers.",
        404: "Sorry, the page you are looking for could not be found.",
        403: "Sorry, you are forbidden from accessing this page.",
    }[status];

    return (
        <div className="min-h-screen flex flex-col ">
            <Navbar />

            <div className="md:grid grid-cols-2 flex-1 mt-40">
                <div className="hidden md:flex justify-center items-center">
                    <div className="w-2/3 h-auto">
                        <img
                            src="/assets/images/errorpage-img.png"
                            alt="login image"
                        />
                    </div>
                </div>
                <div className="hidden md:flex items-center">
                    <div className="text-gray-600">
                        <h2 className="mb-7 text-7xl tracking-wide">Opps !</h2>
                        <h1 className="font-semibold text-3xl">{status}</h1>
                        <h3 className="font-semibold text-2xl">{title}</h3>
                        <div className="mt-4">{description}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
