import moment from "moment/moment";
import React from "react";

export default function UserListCard({ user }) {
    return (
        <div className="mb-5 px-7 py-3 border shadow-md rounded-lg group cursor-pointer">
            <h3 className="text-lg font-semibold group-hover:underline">
                {user.name}
            </h3>
            <p className="mt-1 text-gray-800">{user.email}</p>
            <p className="mt-0.5 text-xs text-gray-500">
                {moment(user.updated_at).format("DD MMMM YYYY, HH:mm:ss")}
            </p>
        </div>
    );
}
