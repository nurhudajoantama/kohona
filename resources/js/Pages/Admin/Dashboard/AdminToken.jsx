import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function adminTokens(props) {
    const { adminTokens } = props;

    const { post, processing } = useForm();
    const submitGenerate = (e) => {
        e.preventDefault();
        post(route("dashboard.admin-tokens.generate"));
    };

    const handleDelete = (id) => {
        return (e) => {
            e.preventDefault();
            Inertia.delete(route("dashboard.admin-tokens.destroy", id));
        };
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Token
                </h2>
            }
        >
            <Head title="Admin Token" />

            <form onSubmit={submitGenerate}>
                <Button className="ml-4" processing={processing}>
                    Generate
                </Button>
            </form>

            {adminTokens.map((token, i) => (
                <div key={i}>
                    <span>
                        {token.token} - {token.user.name}
                    </span>
                    <Button className="ml-4" onClick={handleDelete(token.id)}>
                        Delete
                    </Button>
                </div>
            ))}
        </Authenticated>
    );
}
