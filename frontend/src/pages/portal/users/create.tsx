import React from "react";

import Admin from "@/layouts/Admin";
import UserForm from "@/components/User/Form";

interface UserProps {
    layout: React.ComponentType<any>; // Define a type for the layout property
}

const User: React.FC<UserProps> = () => {
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <UserForm />
                </div>
            </div>
        </>
    );
}

(User as any).Auth = true;
(User as any).layout = Admin;

export default User;

