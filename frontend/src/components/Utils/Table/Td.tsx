import React, { ReactNode } from "react";

interface TdProps {
    children: ReactNode;
}

const Td: React.FC<TdProps> = ({ children }) => {
    return (
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{children}</td>
    );
};

export default Td;
