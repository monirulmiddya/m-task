import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useWebConnect } from "@/context/Request";

const TaskForm = () => {
    const router = useRouter();
    const { query } = router;
    const project = query.project;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [label, setLabel] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');

    const { callApi } = useWebConnect();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        let payload = {
            title,
            priority,
            content,
            project,
            status
        };

        // if (label) {
        //     payload = {
        //         ...payload,
        //         label_id: label
        //     }
        // }

        // if (status) {
        //     payload = {
        //         ...payload,
        //         status_id: status
        //     }
        // }

        try {
            const resp = await callApi("task/create", "POST", payload);
            if (resp.status_code === 201) {
                toast.success(resp?.message || "Something went wrong");
                router.push(`/portal/tasks?project=${project}`);
            } else {
                toast.error(resp?.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Create Task</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Task Information
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="title"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="priority"
                                    >
                                        Priority
                                    </label>
                                    <select
                                        id="priority"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        required
                                    >
                                        <option>-Select-</option>
                                        <option value="Lowest">Lowest</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Highest">Highest</option>
                                        {/* {userData.map((d, index) => (
                                            <option key={index} value={d.Staff._id}>{d.Staff.Name}</option>
                                        ))} */}

                                    </select>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="status"
                                    >
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        required
                                    >
                                        <option value="">-Select-</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Onging">Onging</option>
                                        <option value="Completed">Completed</option>

                                    </select>
                                </div>
                            </div>

                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="content"
                                    >
                                        Content
                                    </label>
                                    <textarea
                                        id="content"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        rows="4"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
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

export default TaskForm;
