import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import PropTypes from "prop-types";
import Table from "@/components/Utils/Table/Table";
import Td from "@/components/Utils/Table/Td";
// import Modal from "@/components/Modal/Modal";
import { useWebConnect } from "@/context/Request";

type ProjectTableProps = {
    color?: "light" | "dark";
    project: string
};

type ProjectData = {
    ProjectName: string;
    ProjectCode: string;
    Status: string;
};

const AssignTable: React.FC<ProjectTableProps> = ({ project, color = "light" }) => {
    const [data, setData] = useState<ProjectData[]>([]);
    const [userData, setUserData] = useState<ProjectData[]>([]);
    const router = useRouter();
    const [assignUser, setAssignUser] = useState("");
    const [assignRole, setAssignRole] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { callApi } = useWebConnect();

    const fetchData = async () => {
        try {
            const resp = await callApi(`project/get_all_assign/${project}`);
            if (resp.status_code === 201) {
                setData(resp.data);
                // toast.success(resp?.message || "Successfully fetched projects");
            } else {
                toast.error(resp?.message || "Something went wrong");
            }
        } catch (error) {
            // toast.error("Error fetching projects");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const fetcUsers = async () => {
            try {
                const resp = await callApi("user/users");
                if (resp.status_code === 201) {
                    setUserData(resp.data);
                    // toast.success(resp?.message || "Successfully fetched projects");
                } else {
                    toast.error(resp?.message || "Something went wrong");
                }
            } catch (error) {
                toast.error("Error fetching projects");
            }
        };

        fetcUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            staff: assignUser,
            role: assignRole,
            project: project
        };

        try {
            const resp = await callApi("project/assign", "POST", payload);
            if (resp.status_code === 201) {
                toast.success(resp?.message || "Something went wrong");
                setAssignUser("");
                setAssignRole("");
                fetchData();
            } else {
                toast.error(resp?.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle error, e.g., show an error message
        } finally {
            setIsSubmitting(false);
        }
    }

    // useEffect(() => {

    // }, []);

    const columnNames = ["Name", "Project Name", "Role"];

    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
                }
            >


                <div className="flex-auto px-4 lg:px-10 pt-0">
                    <form onSubmit={handleSubmit}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Project Assign
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="assign-user"
                                    >
                                        User
                                    </label>
                                    <select
                                        id="assign-user"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={assignUser}
                                        onChange={(e) => setAssignUser(e.target.value)}
                                        required
                                    >
                                        <option value="">-Select-</option>
                                        {userData.map((d, index) => (
                                            <option key={index} value={d.Staff._id}>{d.Staff.Name}</option>
                                        ))}

                                    </select>
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="assign-role"
                                    >
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        id="assign-role"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={assignRole}
                                        onChange={(e) => setAssignRole(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="w-full lg:w-2/12 px-4">
                                <div className="relative w-full mb-3">
                                    <button
                                        className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Submitting..." : "Assign Project"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>


                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 flex items-center justify-between">
                            <span
                                className={
                                    "font-semibold text-lg " +
                                    (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                <i className="fa fa-users"></i> Projects
                            </span>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <Table color={color} columnNames={columnNames}>
                        <tbody>
                            {data && data.map((d, index) => (
                                <tr key={index}>
                                    <Td>{d.Staff.Name}</Td>
                                    <Td>{d.Project.ProjectName}</Td>
                                    <Td>{d.Role}</Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

AssignTable.defaultProps = {
    color: "light",
};

AssignTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};

export default AssignTable;
