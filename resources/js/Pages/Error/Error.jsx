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
        <Main user={user}>
            <div className="mt-32">
                <h1 className="font-bold text-8xl">{status}</h1>
                <h3 className="mt-2 font-semibold text-4xl text-gray-900">
                    {title}
                </h3>
                <div className="mt-4 text-gray-900">{description}</div>
            </div>
        </Main>
    );
}
