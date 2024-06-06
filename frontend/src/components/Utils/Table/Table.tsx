import React, { ReactNode } from "react";

import Thead from "@/components/Utils/Table/Thead";

interface TableProps {
    color?: string;
    columnNames?: string[];
    children: ReactNode;
}

const Table: React.FC<TableProps> = ({ color = "light", columnNames = [], children }) => {
    return (
        <>
            <table className="items-center w-full bg-transparent border-collapse">
                {columnNames && (
                    <Thead color={color} columnNames={columnNames} ></Thead>
                )}
                {children}
            </table>
        </>
    );
}

export default Table;
