import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }

    // const checkAuth = async () => {
    //     try {
    //         const res = await api.get("/auth/me");
    //         setUser(res.data.user);
    //     } catch (err) {
    //         console.log(err);
    //         setUser(null);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    return context;
};

// export const useAuth = () => useContext(AuthContext);
// ERROR: Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
// Vite is being strict: it wants to know if a file is a "Component file" or a "Data/Logic file."

// Your file exports AuthProvider (a Component).

// Your file also exports useAuth (a Hook, which is a function).

// Because you have mixed exports, Vite worries that if you change the logic in useAuth, it won't be able to "Hot Reload" the AuthProvider component safely.