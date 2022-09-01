import React from "react";

export default function MerchantListCard({
    merchant,
    handleActive,
    handleReject,
    handleDetails,
}) {
    return (
        <div className="border px-6 py-3 rounded-md flex justify-between items-center mb-5">
            <div>
                <h5 className="font-bold text-lg">{merchant.name}</h5>
                <p className="text-sm">{merchant.description}</p>
            </div>
            <div>
                {merchant.status_id === 1 ? (
                    <>
                        {handleDetails && (
                            <button
                                className="btn border bg-blue-500 text-white px-4 py-1 rounded-md text-sm"
                                onClick={handleDetails(merchant)}
                            >
                                Detail
                            </button>
                        )}
                        <button
                            className="ml-4 btn border bg-green-500 text-white px-4 py-1 rounded-md text-sm"
                            onClick={handleActive(merchant)}
                        >
                            Accepted
                        </button>
                        <button
                            className="ml-4 btn border bg-red-500 text-white px-4 py-1 rounded-md text-sm"
                            onClick={handleReject(merchant)}
                        >
                            Reject
                        </button>
                    </>
                ) : (
                    <div className="flex items-center">
                        <span
                            className={`capitalize ${
                                merchant.status.id === 1
                                    ? "text-yellow-400"
                                    : merchant.status.id === 2
                                    ? "text-green-400"
                                    : merchant.status.id === 3
                                    ? "text-red-400"
                                    : ""
                            }`}
                        >
                            {merchant.status.status}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
