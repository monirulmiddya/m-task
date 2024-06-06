import { useState } from "react";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const useWebConnect = () => {
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const callApi = async (end_point: string, method: HttpMethod = 'GET', bodyObject: object = {}) => {
        setLoading(true);
        setError(null);

        const url = `${process.env.API_URL}${end_point}`;

        try {
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

            const response = await fetch(url, options);
            if (!response.ok) {
                if (response.status === 401) {
                    router.push('/portal/login');
                } else if (response.status === 403) {
                    const resp = await response.json();
                    toast.error(resp?.errors[0].msg)

                }

                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const resp = await response.json();
            // if (resp.status_code === 201) {
            //     setData(resp.data);
            // } else {
            //     toast.error(resp?.message || "Something went wrong");
            // }
            return resp;
        } catch (error: any) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, callApi };
};

export { useWebConnect };
