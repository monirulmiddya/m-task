
import "../app/globals.css"
import "../app/styles/tailwind.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer, toast } from 'react-toastify';
import Auth from '@/middleware/Auth';

function MyApp({ Component, pageProps }: AppProps) {
    const Layout = (Component as any).layout || (({ children }: any) => <>{children}</>);

    const ComponentWithAuth = (Component as any).Auth
        ? Auth(Component)
        : Component;

    return (
        <AuthProvider>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <title>Notus NextJS by Creative Tim</title>
            </Head>
            <Layout>
                <ComponentWithAuth {...pageProps} />
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Layout>
        </AuthProvider>
    );
}

export default MyApp;
