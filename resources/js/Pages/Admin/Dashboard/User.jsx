import React, { useState } from "react";
import AdminDashboard from "@/Layouts/Admin/AdminDashboard";
import Pagination from "@/Components/Pagination/Pagination";
import UserListCard from "@/Components/Admin/UserListCard";
import UserDetail from "@/Components/Admin/UserDetail";

export default function User(props) {
    const { users } = props;
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);

    return (
        <AdminDashboard title="User">
            <div className="grid grid-cols-5 gap-7">
                <div className="col-span-3">
                    {users.data.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => setSelectedUserDetails(user)}
                        >
                            <UserListCard user={user} />
                        </div>
                    ))}
                </div>
                <div className="col-span-2">
                    {selectedUserDetails && (
                        <UserDetail user={selectedUserDetails} />
                    )}
                </div>
            </div>
            <Pagination
                links={users.links}
                from={users.from}
                to={users.to}
                total={users.total}
                last_page={users.last_page}
            />
        </AdminDashboard>
    );
}
