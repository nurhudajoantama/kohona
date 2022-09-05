import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import CopyIcon from "@/Components/Icon/CopyIcon";
import moment from "moment/moment";
import { useAlert } from "react-alert";
import { useForm } from "@inertiajs/inertia-react";
import { customConfirmAlert } from "@/Utils/customConfirmAlert";

export default function AdminTokenListCard({ token }) {
    const alert = useAlert();
    const { delete: d } = useForm();

    const handleDelete = (e) => {
        e.preventDefault();
        customConfirmAlert({
            title: "Confirm to delete",
            message: `Are you sure to delete token ?`,
        }).then(() => {
            d(route("admin.dashboard.admin-tokens.destroy", token), {
                onSuccess: () =>
                    alert.error("Token has been deleted successfully"),
            });
        });
    };

    const handleOnCopy = () =>
        alert.info("Successfully copied admin token to clipboard.");
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
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
