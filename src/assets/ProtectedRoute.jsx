import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../services/auth";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const user = auth.getCurrentUser();
    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    } else {
        return children;
    }

};

export default ProtectedRoute;
