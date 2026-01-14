import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// BrowserRouter: The "context" or parent that tracks the URL.

// Routes: The container for all your paths.

// Route: The individual path definition.
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import Register from "./pages/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                {/* wrap dashboard in ProtectedRoute */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                ></Route>
                <Route path="/register" element={<Register />}></Route>
                {/* fallback for any non-matching path*/}
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
