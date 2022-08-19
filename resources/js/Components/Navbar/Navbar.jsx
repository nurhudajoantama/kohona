/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import userCircle from "@iconify/icons-bxs/user-circle";
import searchIcon from "@iconify/icons-akar-icons/search";
import cartIcon from "@iconify/icons-bxs/cart";
import ApplicationLogo from "../ApplicationLogo";
import { Link } from "@inertiajs/inertia-react";

const navigation = [
    { name: "Dashboard", href: "#", current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar({ user }) {
    return (
        <Disclosure as="nav" className="bg-white drop-shadow-lg sticky top-0">
            <>
                <div className="max-w-7xl py-1 mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                            <Link href="/" className="flex items-center">
                                <ApplicationLogo className="block h-8 w-auto" />
                                <h1 className="ml-5 font-semibold text-lg">
                                    Kohona
                                </h1>
                            </Link>
                        </div>
                        {/*  */}

                        <form
                            className="items-center hidden lg:flex mx-3"
                            style={{ width: "500px" }}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <label htmlFor="simple-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative w-full">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <Icon
                                        icon={searchIcon}
                                        className="h-5 w-5 text-gray-500"
                                    />
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-yellow-300 focus:border-yellow-100 block w-full pl-10 p-2"
                                    placeholder="Search"
                                />
                            </div>
                            <button
                                type="submit"
                                className="p-2 ml-2 text-sm font-medium text-white bg-yellow-300 rounded-full border border-yellow-300 focus:ring-4 focus:outline-none focus:ring-yellow-100"
                            >
                                <Icon icon={searchIcon} className="h-5 w-5" />
                                <span className="sr-only">Search</span>
                            </button>
                        </form>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 mr-4 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                className="p-1 text-gray-800 hover:text-gray-700"
                            >
                                <span className="sr-only">Cart</span>
                                <Icon icon={cartIcon} className="h-6 w-6" />
                            </button>
                            {/* Divider */}
                            <hr className="w-px h-6 bg-slate-200 mx-3" />
                            {/* Profile dropdown */}
                            {user ? (
                                <Menu as="div" className="relative">
                                    <div>
                                        <Menu.Button className="flex text-sm rounded-full ">
                                            <span className="sr-only">
                                                Open user menu
                                            </span>
                                            <Icon
                                                icon={userCircle}
                                                className="h-6 w-6 rounded-full text-gray-800 hover:text-gray-700"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                <Link
                                                    href="/user/settings"
                                                    className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    User Setting
                                                </Link>
                                            </Menu.Item>
                                            {user.merchant && (
                                                <Menu.Item>
                                                    <Link
                                                        href="/merchants/dashboard"
                                                        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    >
                                                        Merchant Dashboard
                                                    </Link>
                                                </Menu.Item>
                                            )}
                                            {user.is_admin && (
                                                <Menu.Item>
                                                    <Link
                                                        href="/admin/dashboard"
                                                        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    >
                                                        Admin Dashboard
                                                    </Link>
                                                </Menu.Item>
                                            )}
                                            <Menu.Item>
                                                <Link
                                                    as="button"
                                                    method="post"
                                                    href="/logout"
                                                    className="w-full text-start block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    Logout
                                                </Link>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="ml-3 px-2 py-1 text-yellow-400 border border-1 border-yellow-400 rounded-md"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="ml-3 px-2 py-1 text-white border border-1 border-yellow-400 bg-yellow-400 rounded-md"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </>
        </Disclosure>
    );
}
