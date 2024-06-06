import React from "react";
import { useRouter } from "next/router";

import Admin from "@/layouts/Admin";
import AssignTable from "@/components/Project/AssignTable";
// import AssignForm from "@/components/Project/AssignForm";

interface UserProps {
    layout: React.ComponentType<any>; // Define a type for the layout property
}

const AssignPage: React.FC<UserProps> = () => {
    const router = useRouter();
    const { query } = router;
    const project_id = query.project_id;
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <AssignTable color="dark" project={project_id} />
                </div>
            </div>
        </>
    );
}

(AssignPage as any).Auth = true;
(AssignPage as any).layout = Admin;

export default AssignPage;

