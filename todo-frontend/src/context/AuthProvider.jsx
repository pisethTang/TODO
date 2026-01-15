import { useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext"; // Import the "Phone Line"

// Manages the actual state (user data) and the logic (the api calls)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to check if the user has a valid HTTP-Only Cookie
    const checkAuth = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data.user);
        } catch (err) {
            console.log(err);
            setUser(null);
            // If the cookie is invalid or expired, we ensure the local state is null
        } finally {
            setLoading(false);
        }
    };

    // Run this once when the app first loads
    useEffect(() => {
        checkAuth();
    }, []);

    // NEW: Logout function to clear the cookie on the backend
    const logout = async () => {
        try {
            await api.post("/auth/logout"); // Tell backend to clear the cookie
            setUser(null); // Clear local state
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    const value = {
        user,
        setUser,
        loading,
        logout, // Pass logout function down to components
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
            {/* We don't render the app until we know if the user is logged in */}
        </AuthContext.Provider>
    );
};
