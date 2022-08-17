import React from "react";
import Sidebar from "@/Components/Dashboard/Sidebar/Sidebar";
import SidebarLink from "@/Components/Dashboard/Sidebar/SidebarLink";

export default function MerchantSidebar(props) {
    const { pathname } = window.location;
    return (
        <Sidebar {...props}>
            {/* Links */}
            <div className="space-y-8">
                {/* Pages group */}
                <div>
                    <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                        <span
                            className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                            aria-hidden="true"
                        >
                            •••
                        </span>
                        <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            Pages
                        </span>
                    </h3>
                    <ul className="mt-3">
                        <SidebarLink
                            to="/merchants/dashboard"
                            active={pathname === "/merchants/dashboard"}
                        >
                            Merchant Dashboard
                        </SidebarLink>
                        <SidebarLink>Products</SidebarLink>
                        <SidebarLink
                            to="/merchants/dashboard/settings"
                            active={
                                pathname === "/merchants/dashboard/settings"
                            }
                        >
                            Merchant Settings
                        </SidebarLink>
                    </ul>
                </div>
            </div>
        </Sidebar>
    );
}
