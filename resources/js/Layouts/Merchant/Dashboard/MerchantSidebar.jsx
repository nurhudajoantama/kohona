import React from "react";
import Sidebar from "@/Components/Dashboard/Sidebar/Sidebar";
import SidebarLink from "@/Components/Dashboard/Sidebar/SidebarLink";
import DashboardFilled from "@/Components/Icon/DashboardFilled";
import GearIcon from "@/Components/Icon/GearIcon";
import AdProduct from "@/Components/Icon/AdProduct";
import OrderDetails from "@/Components/Icon/OrderDetails";

export default function MerchantSidebar(props) {
    const { pathname } = window.location;
    return (
        <Sidebar {...props}>
            {/* Links */}
            <div className="space-y-8">
                {/* Pages group */}
                <div>
                    <h3 className="text-xs uppercase text-yellow-400 font-semibold pl-3">
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
                            Icon={DashboardFilled}
                        >
                            Merchant Dashboard
                        </SidebarLink>
                        <SidebarLink
                            to="/merchants/dashboard/products"
                            active={
                                pathname === "/merchants/dashboard/products"
                            }
                            Icon={AdProduct}
                        >
                            Products
                        </SidebarLink>
                        <SidebarLink
                            to="/merchants/dashboard/orders"
                            active={pathname === "/merchants/dashboard/orders"}
                            Icon={OrderDetails}
                        >
                            Order
                        </SidebarLink>
                        <SidebarLink
                            to="/merchants/dashboard/settings"
                            active={
                                pathname === "/merchants/dashboard/settings"
                            }
                            Icon={GearIcon}
                        >
                            Merchant Settings
                        </SidebarLink>
                    </ul>
                </div>
            </div>
        </Sidebar>
    );
}
