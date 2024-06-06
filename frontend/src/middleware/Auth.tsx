import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const Auth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const WithAuthComponent: React.FC<P> = (props) => {
        const { isAuthenticated } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) {
                router.replace('/portal/login');
            }
        }, [isAuthenticated, router]);

        if (!isAuthenticated) {
            return <div>Loading...</div>; // Or you can return a loader here
        }

        return <WrappedComponent {...props} />;
    };

    WithAuthComponent.displayName = `Auth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithAuthComponent;
};

export default Auth;
