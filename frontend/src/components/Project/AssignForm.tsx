import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useWebConnect } from "@/context/Request";

const AssignForm = () => {
    const router = useRouter();
    const [projectName, setProjectName] = useState("");
    const [projectCode, setProjectCode] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { callApi } = useWebConnect();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            projectName,
            projectCode,
            notes,
            status: "NotStarted"
        };

        try {
            const resp = await callApi("project/create", "POST", payload);
            if (resp.status_code === 201) {
                toast.success(resp?.message || "Something went wrong");
                router.push('/portal/projects');
            } else {
                toast.error(resp?.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle error, e.g., show an error message
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Create Project</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="project-name"
                                    >
                                        User
                                    </label>
                                    <input
                                        type="text"
                                        id="project-name"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="project-code"
                                    >
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        id="project-code"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={projectCode}
                                        onChange={(e) => setProjectCode(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <button
                                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Create Project"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AssignForm;
