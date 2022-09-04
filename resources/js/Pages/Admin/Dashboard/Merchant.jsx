import React, { useState } from "react";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import Pagination from "@/Components/Pagination/Pagination";
import { Inertia } from "@inertiajs/inertia";
import MerchantListCard from "@/Components/Admin/MerchantListCard";

export default function Index(props) {
    const { merchants } = props;
    const [selectedMerchantDetails, setSelectedMerchantDetails] =
        useState(null);

    const params = new URLSearchParams(window.location.search);
    const [search, setSearch] = useState(params.get("search") || undefined);
    const [status_id, setStatus_id] = useState(
        params.get("status_id") || undefined
    );

    const handleDetails = (merchant) => {
        return (e) => {
            e.preventDefault();
            setSelectedMerchantDetails(merchant);
        };
    };

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get(route("admin.dashboard.merchants.index"), {
            search,
            status_id,
        });
    };

    return (
        <AdminDashboard title="Merchants">
            {/* Search */}
            <form onSubmit={handleSearch}>
                <div>
                    <label htmlFor="search" className="text-sm text-gray-700">
                        Search
                    </label>
                    <input
                        className="block w-full border-gray-200 rounded-md shadow-sm px-3 py-2"
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search"
                        value={search ?? ""}
                        onChange={(e) => setSearch(e.target.value || undefined)}
                    />
                </div>
                <div className="flex items-end mt-1">
                    <div>
                        <label
                            htmlFor="status"
                            className="text-sm text-gray-700"
                        >
                            Status
                        </label>
                        <select
                            className="block border-gray-200 rounded-md shadow-sm px-3 py-2 w-40"
                            name="status_id"
                            id="status"
                            value={status_id}
                            onChange={(e) =>
                                setStatus_id(e.target.value || undefined)
                            }
                        >
                            <option value="">All</option>
                            <option value="1">Pending</option>
                            <option value="2">Active</option>
                            <option value="3">Rejected</option>
                        </select>
                    </div>
                    <div className="ml-3">
                        <button
                            type="submit"
                            className="border border-yellow-400 text-yellow-400 rounded-md px-5 py-2"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </form>

            {/* List */}
            <div className="mt-12 grid grid-cols-5 gap-7">
                <div className="col-span-3">
                    {merchants.data.map((merchant, i) => (
                        <MerchantListCard
                            handleDetails={handleDetails}
                            merchant={merchant}
                            key={i}
                        />
                    ))}
                </div>
                <div className="col-span-2">
                    {selectedMerchantDetails && (
                        <div className="px-7 py-5 border rounded-md">
                            <h1 className="text-xl font-bold mb-2">
                                {selectedMerchantDetails.name}
                            </h1>
                            <span className="text-yellow-400 font-semibold text-lg">
                                Deskripsi
                            </span>
                            <p>{selectedMerchantDetails.description}</p>
                        </div>
                    )}
                </div>
            </div>
            <Pagination
                links={merchants.links}
                from={merchants.from}
                to={merchants.to}
                total={merchants.total}
                last_page={merchants.last_page}
            />
        </AdminDashboard>
    );
}
