import React from "react";
import { useRouter } from 'next/router';

import Admin from "@/layouts/Admin";
import TaskTable from "@/components/Task/Table";

interface TaskProps {
    layout: React.ComponentType<any>; // Define a type for the layout property
}

const TaskPage: React.FC<TaskProps> = () => {
    const router = useRouter();
    const { query } = router;
    const project = query.project;
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <TaskTable color="dark" project={project} />
                </div>
            </div>
        </>
    );
}

(TaskPage as any).Auth = true;
(TaskPage as any).layout = Admin;

export default TaskPage;

