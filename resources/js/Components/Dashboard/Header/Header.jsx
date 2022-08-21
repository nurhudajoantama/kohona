import React from "react";
import UserMenu from "@/Components/Dashboard/Header/UserMenu";
import PriceFormat from "@/Components/Price/PriceFormat";
import { Link } from "@inertiajs/inertia-react";

function Header({ sidebarOpen, setSidebarOpen, user, level, image, title }) {
    return (
        <header className="sticky top-0 bg-white border-b z-30 shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px">
                    {/* Header: Left side */}
                    <div className="flex">
                        {/* Hamburger button */}
                        <button
                            className="text-yellow-400 lg:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="w-6 h-6 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="4" y="5" width="16" height="2" />
                                <rect x="4" y="11" width="16" height="2" />
                                <rect x="4" y="17" width="16" height="2" />
                            </svg>
                        </button>
                        <h4>
                            {title}
                            {user.merchant && ` - ${user.merchant.name}`}
                        </h4>
                    </div>

                    {/* Header: Right side */}
                    <div className="flex items-center">
                        {user.merchant && (
                            <Link href="/merchants/dashboard/wallet">
                                <PriceFormat
                                    value={user.merchant.wallet_amount}
                                    renderText={(value, props) => (
                                        <h4
                                            className="font-semibold text-gray-700"
                                            {...props}
                                        >
                                            {value}
                                        </h4>
                                    )}
                                />
                            </Link>
                        )}
                        {/*  Divider */}
                        <hr className="w-px h-6 bg-yellow-200 mx-3" />
                        <UserMenu user={user} level={level} image={image} />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
