import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // If there is no token, redirect to login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // If token exists, render the component (children)
    return children;
};

export default ProtectedRoute;