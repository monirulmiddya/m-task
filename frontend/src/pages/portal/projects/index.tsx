import React from "react";

import Admin from "@/layouts/Admin";
import ProjectTable from "@/components/Project/Table";

interface UserProps {
    layout: React.ComponentType<any>; // Define a type for the layout property
}

const ProjectPage: React.FC<UserProps> = () => {
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <ProjectTable color="dark" />
                </div>
            </div>
        </>
    );
}

(ProjectPage as any).Auth = true;
(ProjectPage as any).layout = Admin;

export default ProjectPage;

