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
};

type ProjectData = {
    _id: string,
    ProjectName: string;
    ProjectCode: string;
    Status: string;
};

const ProjectTable: React.FC<ProjectTableProps> = ({ color = "light" }) => {
    const [data, setData] = useState<ProjectData[]>([]);
    const router = useRouter();
    const { callApi } = useWebConnect();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await callApi("project/get_all");
                if (resp.status_code === 201) {
                    setData(resp.data);
                    // toast.success(resp?.message || "Successfully fetched projects");
                } else {
                    toast.error(resp?.message || "Something went wrong");
                }
            } catch (error) {
                toast.error("Error fetching projects");
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    const columnNames = ["Project Name", "Project Code", "Status", "Actions"];

    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
                }
            >
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
                            <a
                                className="bg-red-700 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                title="Create New"
                                href="projects/create"
                            >
                                <i className="fas fa-plus"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <Table color={color} columnNames={columnNames}>
                        <tbody>
                            {data.map((d, index) => (
                                <tr key={index}>
                                    <Td>{d.ProjectName}</Td>
                                    <Td>{d.ProjectCode}</Td>
                                    <Td>{d.Status}</Td>
                                    <Td>
                                        <a
                                            className="bg-red-700 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            title="Assign Project"
                                            href={`projects/assign?project_id=${d._id}`}
                                        >
                                            <i className="fas fa-location-arrow"></i>
                                        </a>

                                        <a
                                            className="bg-red-700 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            title="Tasks"
                                            href={`tasks?project=${d._id}`}
                                        >
                                            <i className="fas fa-location-arrow"></i>
                                        </a>

                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

ProjectTable.defaultProps = {
    color: "light",
};

ProjectTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};

export default ProjectTable;
