import React from "react";
import Sidebar from "@/Components/Dashboard/Sidebar/Sidebar";
import SidebarLink from "@/Components/Dashboard/Sidebar/SidebarLink";
import BagShopping from "@/Components/Icon/BagShopping";
import GeneratingTokenRounded from "@/Components/Icon/GeneratingTokenRounded";
import DashboardFilled from "@/Components/Icon/DashboardFilled";
import ClipboardList from "@/Components/Icon/ClipboardList";

export default function AdminSidebar(props) {
    const { pathname } = window.location;
    return (
        <Sidebar {...props}>
            {/* Links */}
            <div className="space-y-8">
                {/* Pages group */}
                <div>
                    <h3 className="text-xs uppercase text-yellow-500 font-semibold pl-3">
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
                            to="/admin/dashboard"
                            active={pathname === "/admin/dashboard"}
                            Icon={DashboardFilled}
                        >
                            Admin Dashboard
                        </SidebarLink>
                        <SidebarLink
                            to="/admin/dashboard/admin-tokens"
                            active={
                                pathname === "/admin/dashboard/admin-tokens"
                            }
                            Icon={GeneratingTokenRounded}
                        >
                            Admin Tokens
                        </SidebarLink>
                        <SidebarLink
                            to="/admin/dashboard/merchants"
                            active={pathname === "/admin/dashboard/merchants"}
                            Icon={BagShopping}
                        >
                            Merchants
                        </SidebarLink>
                        <SidebarLink
                            // to="/admin/dashboard/merchants"
                            // active={pathname === "/admin/dashboard/merchants"}
                            Icon={ClipboardList}
                        >
                            Transactions
                        </SidebarLink>
                    </ul>
                </div>
            </div>
        </Sidebar>
    );
}
