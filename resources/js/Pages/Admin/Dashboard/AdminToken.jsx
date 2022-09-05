import React from "react";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import { useForm } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination/Pagination";
import AdminTokenListCard from "@/Components/Admin/AdminTokenListCard";
import { useAlert } from "react-alert";
import { customConfirmAlert } from "@/Utils/customConfirmAlert";

export default function adminTokens(props) {
    const { adminTokens } = props;

    const { post } = useForm();
    const alert = useAlert();

    const handleGenerate = (e) => {
        e.preventDefault();
        customConfirmAlert({
            title: "Confirm to generate",
            message: `Are you sure to generate new token ?`,
        }).then(() => {
            post(route("admin.dashboard.admin-tokens.generate"), {
                onSuccess: () =>
                    alert.success(
                        "Admin token has been generated successfully"
                    ),
            });
        });
    };

    return (
        <AdminDashboard title="Admin Token">
            <form onSubmit={handleGenerate}>
                <button className="btn bg-yellow-400  text-white px-5 py-2 rounded-sm">
                    Generate Token
                </button>
            </form>

            <div className="mt-7">
                {adminTokens.data.map((token) => (
                    <AdminTokenListCard key={token.id} token={token} />
                ))}
                <Pagination
                    links={adminTokens.links}
                    from={adminTokens.from}
                    to={adminTokens.to}
                    total={adminTokens.total}
                    last_page={adminTokens.last_page}
                />
            </div>
        </AdminDashboard>
    );
}
