import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import PropTypes from "prop-types";
import Table from "@/components/Utils/Table/Table";
import Td from "@/components/Utils/Table/Td";
// import Modal from "@/components/Modal/Modal";
import { useWebConnect } from "@/context/Request";


type UserTableProps = {
    color?: "light" | "dark";
};

type UserData = {
    Staff: {
        _id: string;
        Name: string;
        UserName: string;
        Type: string;
        Email: string;
        PhoneNumber: string;
        Status: string;
    }
};


const UserTable: React.FC<UserTableProps> = ({ color = "light" }) => {
    const [data, setData] = useState<UserData[]>([]);
    const router = useRouter();
    const { callApi } = useWebConnect();

    const fetchData = async () => {
        try {
            const resp = await callApi("user/users");
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

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once after the initial render


    const handleDelete = async (id: string) => {
        if (!id) {
            toast.error("Invalid user ID");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) {
            return;
        }

        try {
            const resp = await callApi(`user/staff/${id}`, 'DELETE');
            if (resp.status_code === 201) {
                toast.success(resp?.message || 'User deleted successfully');
                // Optionally, refresh the table data or redirect
                setData(data.filter(user => user.Staff._id != id));
            } else {
                toast.error(resp?.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error deleting user');
        }
    };

    const columnNames = ["Name", "Username", "Type", "Email", "Phone", "Status", "Action"];

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
                                <i className="fa fa-users"></i> Users
                            </span>
                            <a
                                className="bg-red-700 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                title="Create New"
                                href="users/create"
                            >
                                <i className="fas fa-plus"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <Table color={color} columnNames={columnNames}>
                        <tbody>
                            {Array.isArray(data) &&
                                data.map((d: UserData, index: number) => {
                                    const staffId = d?.Staff?._id;
                                    console.log('Staff ID:', staffId); // Log the staff ID to check if it's defined

                                    return (
                                        <tr key={index}>
                                            <Td>{d?.Staff?.Name}</Td>
                                            <Td>{d?.Staff?.UserName}</Td>
                                            <Td>{d?.Staff?.Type}</Td>
                                            <Td>{d?.Staff?.Email}</Td>
                                            <Td>{d?.Staff?.PhoneNumber}</Td>
                                            <Td>{d?.Staff?.Status}</Td>
                                            <Td>
                                                <button
                                                    className="bg-red-700 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    title="Delete Staff"
                                                    onClick={() => handleDelete(staffId)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </Td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </div>
            </div >
        </>
    );
}

UserTable.defaultProps = {
    color: "light",
};

UserTable.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};

export default UserTable;
