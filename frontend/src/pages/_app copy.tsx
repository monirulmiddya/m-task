import "../app/globals.css"
import "../app/styles/tailwind.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import type { AppProps } from 'next/app';
import { ReactNode, ComponentType } from 'react';

type PageWithLayout = AppProps & {
    Component: AppProps['Component'] & { layout?: ComponentType<any> };
};

function MyApp({ Component, pageProps }: PageWithLayout) {
    const Layout = Component.layout || (({ children }: { children: ReactNode }) => <>{children}</>);

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;

