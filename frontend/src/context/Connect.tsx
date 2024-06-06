import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const apiCall = async (end_point: string, method: string = "GET", bodyObject: object = {}) => {
    const router = useRouter();
    const url = `${process.env.API_URL}${end_point}`;

    const ApiKey = localStorage.getItem("token");

    const options: RequestInit = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "ApiKey": `${ApiKey}`,
        },
    };

    if (method === "POST" || method === "PUT" || method === "PATCH") {
        options.body = JSON.stringify(bodyObject);
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status === 401) {
                router.push('/portal/login');
            }

            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resp = await response.json();

        // if (resp.status_code === 201) {
        //     setData(resp.data);
        // } else {
        //     toast.success(resp?.message || "Something went wrong");
        // }
        return resp;
    } catch (error) {
        console.error('Error making API call:', error);
        throw error;
    }
};
