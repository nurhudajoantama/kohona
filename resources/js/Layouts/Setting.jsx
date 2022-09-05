import React from "react";
import { Link } from "@inertiajs/inertia-react";
import Main from "./Main";

export default function Setting({ children }) {
    return (
        <Main>
            <div className="flex mt-9">
                <div className="mr-12">
                    <div className="hover:text-gray-500 ">
                        <Link href="/user/settings">User Setting</Link>
                    </div>
                    <div className="mt-4 hover:text-gray-500">
                        <Link href="/user/settings/change-password">
                            Change Password
                        </Link>
                    </div>
                </div>
                <div className="flex-1 border bg-white shadow-lg rounded-md p-7">
                    {children}
                </div>
            </div>
        </Main>
    );
}
