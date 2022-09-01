import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import CopyIcon from "@/Components/Icon/CopyIcon";
import moment from "moment/moment";

export default function AdminTokenListCard({
    token,
    handleDelete,
    handleOnCopy,
}) {
    return (
        <div className="border p-3 rounded-md flex justify-between items-center mb-5">
            <div>
                <div className="border bg-white px-3 py-1 rounded-sm">
                    {token.token}
                </div>
                <span className="text-xs text-gray-400">
                    Created By {token.user.name} on{" "}
                    {moment(token.created_at).format("DD MMMM YYYY, HH:mm:ss")}
                </span>
            </div>
            <div className="flex">
                <CopyToClipboard text={token.token} onCopy={handleOnCopy}>
                    <button className="border border-gray-400 text-gray-400 px-4 py-3 rounded-md">
                        <CopyIcon />
                    </button>
                </CopyToClipboard>
                <button
                    className="ml-2 border bg-red-500 text-white px-7 py-3 rounded-md text-sm"
                    onClick={handleDelete(token.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
