import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // If there is no token, redirect to login
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    // If token exists, render the component (children)
    return children;
};

export default ProtectedRoute;
