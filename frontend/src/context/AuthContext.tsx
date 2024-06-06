import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface AuthContextProps {
    isAuthenticated: boolean;
    register: (userData: RegisterFormData) => Promise<void>;
    login: (userData: LoginFormData) => Promise<void>;
    logout: () => void;
    error: string;
    success: string;
}

interface RegisterFormData {
    name: string;
    userName: string;
    email: string;
    password: string;
}

interface LoginFormData {
    userName: string;
    password: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {  // Ensure it's running in the client
            const token = localStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
            }
            setIsLoading(false); // Set loading to false after checking the token
        }
    }, []);

    const register = async (userData: RegisterFormData) => {
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`${process.env.API_URL}user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Something went wrong");
            }

            const resp = await response.json();

            if (resp.status_code == 201) {
                setIsAuthenticated(true);
                localStorage.setItem('token', resp.data.token); // Assuming the API returns a token
                toast.success(resp.message);
                router.push('/portal/dashboard');
            } else {
                toast.success(resp?.message || "Something went wrong");
            }
        } catch (error: any) {
            // setError(error.message);
            throw new Error("Something went wrong");
        }
    };

    const login = async (userData: LoginFormData) => {
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`${process.env.API_URL}user/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Something went wrong");
            }

            const resp = await response.json();

            // debugger

            if (resp.status_code == 201) {
                setIsAuthenticated(true);
                localStorage.setItem("token", resp.data.token); // Assuming the API returns a token
                toast.success(resp.message);
                router.push('/portal/dashboard');
            } else {
                toast.success(resp?.message || "Something went wrong");
            }
        } catch (error: any) {
            // setError(error.message);
            throw new Error("Something went wrong");
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        router.push('/portal/login');
    };

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading state while checking for the token
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, register, login, logout, error, success }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
